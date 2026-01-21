import { NextRequest, NextResponse } from "next/server";
import { applicationSchema } from "@/lib/validations/application";
import {
  createApplication,
  getRecentApplicationsByEmail,
  initializeIndexes
} from "@/lib/db/mongodb";
import { getPostHogClient } from "@/lib/posthog-server";
import { apiLogger } from "@/lib/logger";

export const runtime = "nodejs";

// Rate limiting configuration
const RATE_LIMIT_HOURS = 24;
const RATE_LIMIT_MAX_APPLICATIONS = 3;

// Initialize database indexes on first request
let indexesInitialized = false;

export async function POST(request: NextRequest) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const referer = request.headers.get('referer');
  
  apiLogger.info("New application submission started", {
    requestId,
    userAgent,
    referer,
    ipAddress: ip,
  });
  
  console.log("\n[API] ========== New application submission ==========");
  console.log("[API] Request ID:", requestId);
  console.log("[API] Environment check:");
  console.log("[API] - SLACK_WEBHOOK_URL present:", !!process.env.SLACK_WEBHOOK_URL);
  console.log("[API] - NEXT_PUBLIC_SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL);
  
  try {
    // Initialize database indexes if not already done
    if (!indexesInitialized) {
      console.log("[API] Initializing database indexes...");
      await initializeIndexes().catch(e => console.warn("[API] Index init failed:", e));
      
      // Also initialize log indexes
      const { initializeLogIndexes } = await import("@/lib/db/logs");
      await initializeLogIndexes().catch(e => console.warn("[API] Log index init failed:", e));
      
      indexesInitialized = true;
    }

    // Parse request body
    const body = await request.json();
    console.log("[API] Request body received:", Object.keys(body));

    // Validate with Zod
    const validationResult = applicationSchema.safeParse(body);
    
    if (!validationResult.success) {
      apiLogger.error("Validation failed", validationResult.error, {
        requestId,
        body: body,
        fieldErrors: validationResult.error.flatten().fieldErrors,
      });
      
      console.error("[API] ❌ Validation failed:");
      console.error("[API] Body received:", JSON.stringify(body, null, 2));
      console.error("[API] Validation errors:", JSON.stringify(validationResult.error.flatten().fieldErrors, null, 2));
      
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

    // Slack notifications removed - use email notifications instead
    console.log("[API] Application created successfully, ID:", appId);

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        applicationId: appId,
      },
      { status: 201 }
    );
  } catch (error) {
    apiLogger.error("Application submission failed", error, {
      requestId,
      errorType: error instanceof Error ? error.name : typeof error,
      errorMessage: error instanceof Error ? error.message : String(error),
    });
    
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
        requestId, // Include request ID for debugging
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

