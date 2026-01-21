import { NextRequest, NextResponse } from "next/server";
import { applicationSchema } from "@/lib/validations/application";
import {
  createApplication,
  getRecentApplicationsByEmail,
  initializeIndexes
} from "@/lib/db/mongodb";
import { getPostHogClient } from "@/lib/posthog-server";

export const runtime = "nodejs";

// Rate limiting configuration
const RATE_LIMIT_HOURS = 24;
const RATE_LIMIT_MAX_APPLICATIONS = 3;

// Initialize database indexes on first request
let indexesInitialized = false;

export async function POST(request: NextRequest) {
  console.log("\n[API] ========== New application submission ==========");
  console.log("[API] Environment check:");
  console.log("[API] - SLACK_WEBHOOK_URL present:", !!process.env.SLACK_WEBHOOK_URL);
  console.log("[API] - NEXT_PUBLIC_SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL);
  
  try {
    // Initialize database indexes if not already done
    if (!indexesInitialized) {
      console.log("[API] Initializing database indexes...");
      await initializeIndexes().catch(e => console.warn("[API] Index init failed:", e));
      indexesInitialized = true;
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
      projectType: data.projectType,
      projectDescription: data.projectDescription,
      timeline: data.timeline,
      tradeType: data.tradeType,
      tradeDescription: data.tradeDescription,
      name: data.name,
      email: data.email,
      website: data.website || null,
      additionalInfo: data.additionalInfo || null,
      ipAddress: ip,
      userAgent: userAgent,
      referrer,
    });

    const appId = applicationId;
    console.log("[API] Application saved with ID:", appId);

    // Track server-side application received event
    const posthog = getPostHogClient();
    const distinctId = request.headers.get("x-posthog-distinct-id") || data.email;

    posthog.capture({
      distinctId,
      event: 'application_received',
      properties: {
        application_id: appId,
        project_type: data.projectType,
        trade_type: data.tradeType,
        timeline: data.timeline,
        source: 'api',
        ip_address: ip,
        referrer,
      },
    });

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
                text: `*New Application #${appId}*\n\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Project:* ${data.projectType}\n*Trade:* ${data.tradeType}\n\n${data.projectDescription.substring(0, 200)}...`
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
        applicationId: appId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API] ❌ Application submission error:");
    console.error("[API] Error name:", error instanceof Error ? error.name : typeof error);
    console.error("[API] Error message:", error instanceof Error ? error.message : String(error));
    console.error("[API] Error stack:", error instanceof Error ? error.stack : "no stack");
    console.error("[API] Full error:", error);
    
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

