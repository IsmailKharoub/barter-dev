import { NextRequest, NextResponse } from "next/server";
import { applicationSchema } from "@/lib/validations/application";
import { createApplication, getRecentApplicationsByEmail, initDb } from "@/lib/db";

export const runtime = "nodejs";

// Rate limiting configuration
const RATE_LIMIT_HOURS = 24;
const RATE_LIMIT_MAX_APPLICATIONS = 3;

// Initialize database on first request
let dbInitialized = false;

export async function POST(request: NextRequest) {
  console.log("\n[API] ========== New application submission ==========");
  console.log("[API] Environment check:");
  console.log("[API] - SLACK_WEBHOOK_URL present:", !!process.env.SLACK_WEBHOOK_URL);
  console.log("[API] - NEXT_PUBLIC_SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL);
  
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      console.log("[API] Initializing database...");
      await initDb();
      dbInitialized = true;
    }

    // Parse request body
    const body = await request.json();
    console.log("[API] Request body received:", Object.keys(body));

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
    console.log("[API] Application saved with ID:", appId);
    
    // Send simple Slack notification
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (webhookUrl) {
      console.log("[API] Sending Slack notification...");
      try {
        const slackMessage = {
          text: `🆕 New Application #${appId}`,
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*New Application #${appId}*\n\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Project:* ${data.projectType}\n*Trade:* ${data.tradeType}\n*Value:* $${data.estimatedValue.toLocaleString()}\n\n${data.projectDescription.substring(0, 200)}...`
              }
            }
          ]
        };
        
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(slackMessage),
        });
        
        console.log("[API] Slack response:", res.status, await res.text());
      } catch (e) {
        console.error("[API] Slack failed:", e);
      }
    } else {
      console.warn("[API] No SLACK_WEBHOOK_URL configured");
    }

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

