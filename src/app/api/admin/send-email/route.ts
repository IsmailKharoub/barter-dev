import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth/admin";
import { getApplicationById, logEmailSent } from "@/lib/db/mongodb";
import { sendCustomEmail, getEmailTemplate, EmailTemplate } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { applicationId, template, subject, body: emailBody } = body;

    if (!applicationId) {
      return NextResponse.json(
        { success: false, error: "Application ID is required" },
        { status: 400 }
      );
    }

    if (!subject || !emailBody) {
      return NextResponse.json(
        { success: false, error: "Subject and body are required" },
        { status: 400 }
      );
    }

    // Get application
    const application = await getApplicationById(applicationId);
    if (!application) {
      return NextResponse.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      );
    }

    // Send email
    const result = await sendCustomEmail(application.email, subject, emailBody);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Log the sent email
    await logEmailSent(applicationId, subject, template as EmailTemplate);

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Admin API] Error sending email:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch email template content
export async function GET(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get("applicationId");
    const template = searchParams.get("template") as EmailTemplate;

    if (!applicationId || !template) {
      return NextResponse.json(
        { success: false, error: "Application ID and template are required" },
        { status: 400 }
      );
    }

    // Get application
    const application = await getApplicationById(applicationId);
    if (!application) {
      return NextResponse.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      );
    }

    // Get template content
    const templateData = getEmailTemplate(template, {
      name: application.name,
      email: application.email,
      projectType: application.projectType,
    });

    return NextResponse.json(
      { success: true, template: templateData },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Admin API] Error fetching template:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

