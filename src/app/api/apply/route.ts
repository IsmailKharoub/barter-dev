import { NextRequest, NextResponse } from "next/server";
import { applicationSchema } from "@/lib/validations/application";
import { createApplication, getRecentApplicationsByEmail, initDb } from "@/lib/db";
import { sendAdminNotification, sendApplicantConfirmation } from "@/lib/email";
import { notifySlackNewApplication } from "@/lib/slack";

export const runtime = "nodejs";

// Rate limiting configuration
const RATE_LIMIT_HOURS = 24;
const RATE_LIMIT_MAX_APPLICATIONS = 3;

// Initialize database on first request
let dbInitialized = false;

export async function POST(request: NextRequest) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      await initDb();
      dbInitialized = true;
    }

    // Parse request body
    const body = await request.json();

    // Validate with Zod
    const validationResult = applicationSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Rate limiting check
    const recentApplications = await getRecentApplicationsByEmail(
      data.email,
      RATE_LIMIT_HOURS
    );

    if (recentApplications >= RATE_LIMIT_MAX_APPLICATIONS) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded",
          message: `You've submitted ${RATE_LIMIT_MAX_APPLICATIONS} applications in the last ${RATE_LIMIT_HOURS} hours. Please try again later.`,
        },
        { status: 429 }
      );
    }

    // Get request metadata
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || 
               request.headers.get("x-real-ip") || 
               "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    const referrer = request.headers.get("referer") || null;

    // Save to database
    const applicationId = await createApplication({
      project_type: data.projectType,
      project_description: data.projectDescription,
      timeline: data.timeline,
      trade_type: data.tradeType,
      trade_description: data.tradeDescription,
      estimated_value: data.estimatedValue,
      name: data.name,
      email: data.email,
      website: data.website || null,
      additional_info: data.additionalInfo || null,
      ip_address: ip,
      user_agent: userAgent,
      referrer,
    });

    const appId = applicationId ?? 0;
    // Slack must be awaited in serverless environments; otherwise execution may end before it runs.
    const slackResult = await notifySlackNewApplication(data, appId, { ip, userAgent, referrer });
    if (!slackResult.success) {
      if ("skipped" in slackResult && slackResult.skipped) {
        console.warn("Slack notification skipped (missing SLACK_WEBHOOK_URL).");
      } else {
        console.error("Slack notification failed:", slackResult);
      }
    }

    // Email can remain best-effort, but we still await so failures show up in logs reliably.
    await Promise.allSettled([
      sendAdminNotification(data, appId),
      sendApplicantConfirmation(data, appId),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        applicationId: Number(appId),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application submission error:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "/api/apply",
    methods: ["POST"],
    description: "Submit a trade application",
  });
}

