import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import type { ApplicationFormData } from "@/lib/validations/application";
import {
  projectTypeLabels,
  tradeTypeLabels,
  timelineLabels,
} from "@/lib/validations/application";

// Lazy initialization of SES client to avoid build-time errors
let sesClient: SESClient | null = null;

function getSES(): SESClient {
  if (!sesClient) {
    sesClient = new SESClient({
      region: process.env.AWS_REGION || "us-east-1",
      credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
        ? {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          }
        : undefined, // Use default credential chain (IAM role, env vars, etc.)
    });
  }
  return sesClient;
}

// Helper function to send email via SES
async function sendEmail(to: string | string[], subject: string, html: string) {
  const toAddresses = Array.isArray(to) ? to : [to];
  
  const command = new SendEmailCommand({
    Source: FROM_EMAIL,
    Destination: {
      ToAddresses: toAddresses,
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: html,
          Charset: "UTF-8",
        },
      },
    },
  });

  return getSES().send(command);
}

const FROM_EMAIL = process.env.FROM_EMAIL || "hello@barter-dev.com";
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "hello@barter-dev.com";

// Send notification to admin when new application is received
export async function sendAdminNotification(
  application: ApplicationFormData,
  applicationId: number | bigint
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Trade Application</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0C0A09; color: #FAF8F5; padding: 40px 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #171412; border-radius: 16px; overflow: hidden; border: 1px solid rgba(250, 248, 245, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); padding: 24px; text-align: center;">
            <h1 style="margin: 0; color: #0C0A09; font-size: 24px; font-weight: 700;">New Trade Application</h1>
            <p style="margin: 8px 0 0; color: #0C0A09; opacity: 0.8; font-size: 14px;">Application #${applicationId}</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 32px;">
            
            <!-- Applicant Info -->
            <div style="margin-bottom: 24px;">
              <h2 style="color: #F59E0B; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Applicant</h2>
              <p style="margin: 0 0 8px; font-size: 18px; font-weight: 600;">${application.name}</p>
              <p style="margin: 0; color: #A8A29E;">
                <a href="mailto:${application.email}" style="color: #F59E0B; text-decoration: none;">${application.email}</a>
              </p>
              ${application.website ? `<p style="margin: 8px 0 0; color: #A8A29E;"><a href="${application.website}" style="color: #78716C; text-decoration: none;">${application.website}</a></p>` : ""}
            </div>
            
            <!-- Divider -->
            <div style="height: 1px; background: rgba(250, 248, 245, 0.1); margin: 24px 0;"></div>
            
            <!-- Project Details -->
            <div style="margin-bottom: 24px;">
              <h2 style="color: #F59E0B; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Project Details</h2>
              
              <div style="display: flex; gap: 16px; margin-bottom: 12px;">
                <div style="flex: 1;">
                  <span style="color: #78716C; font-size: 12px;">Type</span>
                  <p style="margin: 4px 0 0; font-weight: 500;">${projectTypeLabels[application.projectType]}</p>
                </div>
                <div style="flex: 1;">
                  <span style="color: #78716C; font-size: 12px;">Timeline</span>
                  <p style="margin: 4px 0 0; font-weight: 500;">${timelineLabels[application.timeline]}</p>
                </div>
              </div>
              
              <div style="background-color: #211C18; padding: 16px; border-radius: 8px; margin-top: 12px;">
                <p style="margin: 0; color: #A8A29E; line-height: 1.6; font-size: 14px;">${application.projectDescription}</p>
              </div>
            </div>
            
            <!-- Divider -->
            <div style="height: 1px; background: rgba(250, 248, 245, 0.1); margin: 24px 0;"></div>
            
            <!-- Trade Offer -->
            <div style="margin-bottom: 24px;">
              <h2 style="color: #F59E0B; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Trade Offer</h2>
              
              <div style="display: flex; gap: 16px; margin-bottom: 12px;">
                <div style="flex: 1;">
                  <span style="color: #78716C; font-size: 12px;">Type</span>
                  <p style="margin: 4px 0 0; font-weight: 500;">${tradeTypeLabels[application.tradeType]}</p>
                </div>
              </div>
              
              <div style="background-color: #211C18; padding: 16px; border-radius: 8px; margin-top: 12px;">
                <p style="margin: 0; color: #A8A29E; line-height: 1.6; font-size: 14px;">${application.tradeDescription}</p>
              </div>
            </div>
            
            ${application.additionalInfo ? `
            <!-- Additional Info -->
            <div style="margin-bottom: 24px;">
              <h2 style="color: #F59E0B; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Additional Information</h2>
              <div style="background-color: #211C18; padding: 16px; border-radius: 8px;">
                <p style="margin: 0; color: #A8A29E; line-height: 1.6; font-size: 14px;">${application.additionalInfo}</p>
              </div>
            </div>
            ` : ""}
            
          </div>
          
          <!-- Footer -->
          <div style="padding: 24px; background-color: #211C18; text-align: center; border-top: 1px solid rgba(250, 248, 245, 0.1);">
            <p style="margin: 0; color: #78716C; font-size: 12px;">
              Barter Dev — Dev Work. No Cash Required.
            </p>
          </div>
          
        </div>
      </body>
    </html>
  `;

  try {
    await sendEmail(
      NOTIFICATION_EMAIL,
      `🔔 New Trade Application: ${projectTypeLabels[application.projectType]}`,
      html
    );
    return { success: true };
  } catch (error) {
    console.error("Failed to send admin notification:", error);
    return { success: false, error };
  }
}

// Email template types
export type EmailTemplate = "accepted" | "rejected" | "more-info" | "follow-up" | "custom";

export interface EmailTemplateData {
  subject: string;
  body: string;
}

// Get email template content
export function getEmailTemplate(
  template: EmailTemplate,
  application: { name: string; email: string; projectType: string },
  customMessage?: string
): EmailTemplateData {
  const firstName = application.name.split(" ")[0];
  const projectType = projectTypeLabels[application.projectType as keyof typeof projectTypeLabels] || application.projectType;

  switch (template) {
    case "accepted":
      return {
        subject: "Great news! Let's build something together — Barter Dev",
        body: `Hey ${firstName},

I've reviewed your application for a ${projectType.toLowerCase()} project and I'm excited to move forward!

Your trade offer looks like a great fit. Here's what happens next:

1. I'll send over a brief scope document outlining deliverables
2. We'll hop on a quick call to align on expectations
3. Once we're both on the same page, we start building

I'll be in touch within the next few days to set up a call. In the meantime, feel free to reply with any questions.

Looking forward to working together!

— Ismail
Barter Dev`,
      };
    case "rejected":
      return {
        subject: "Update on your Barter Dev application",
        body: `Hey ${firstName},

Thanks for taking the time to submit your application for a ${projectType.toLowerCase()} project.

After reviewing it, I don't think I'm the right fit for this particular project at this time. This could be due to:
- Current capacity constraints
- The project scope not aligning with my expertise
- The trade offer not being a good match for my needs right now

This isn't a reflection on your project's potential — it's simply about fit and timing.

I genuinely appreciate your interest, and I'd encourage you to apply again in the future if circumstances change.

Best of luck with your project!

— Ismail
Barter Dev`,
      };
    case "more-info":
      return {
        subject: "Quick question about your application — Barter Dev",
        body: `Hey ${firstName},

Thanks for your application! I'm interested in your ${projectType.toLowerCase()} project, but I need a bit more information before I can make a decision.

${customMessage || "Could you please provide more details about:\n\n1. [Your question here]\n2. [Another question]\n\n"}

Just reply to this email with the details and I'll get back to you soon.

— Ismail
Barter Dev`,
      };
    case "follow-up":
      return {
        subject: "Following up on your application — Barter Dev",
        body: `Hey ${firstName},

Just wanted to check in on your ${projectType.toLowerCase()} project application.

Are you still interested in moving forward? If so, let me know and we can pick up where we left off.

If your plans have changed, no worries at all — just let me know either way.

— Ismail
Barter Dev`,
      };
    case "custom":
    default:
      return {
        subject: "",
        body: `Hey ${firstName},

${customMessage || ""}

— Ismail
Barter Dev`,
      };
  }
}

// Send a custom email to applicant
export async function sendCustomEmail(
  to: string,
  subject: string,
  body: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0C0A09; color: #FAF8F5; padding: 40px 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #171412; border-radius: 16px; overflow: hidden; border: 1px solid rgba(250, 248, 245, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); padding: 24px; text-align: center;">
            <h1 style="margin: 0; color: #0C0A09; font-size: 20px; font-weight: 700;">Barter Dev</h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 32px;">
            <div style="white-space: pre-wrap; line-height: 1.7; color: #E7E5E4; font-size: 15px;">${body.replace(/\n/g, '<br>')}</div>
          </div>
          
          <!-- Footer -->
          <div style="padding: 24px; background-color: #211C18; text-align: center; border-top: 1px solid rgba(250, 248, 245, 0.1);">
            <p style="margin: 0; color: #78716C; font-size: 12px;">
              Barter Dev — Dev Work. No Cash Required.
            </p>
          </div>
          
        </div>
      </body>
    </html>
  `;

  try {
    await sendEmail(to, subject, html);
    return { success: true };
  } catch (error) {
    console.error("Failed to send custom email:", error);
    return { success: false, error };
  }
}

// Send confirmation email to applicant
export async function sendApplicantConfirmation(
  application: ApplicationFormData,
  applicationId: number | bigint
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Application Received</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0C0A09; color: #FAF8F5; padding: 40px 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #171412; border-radius: 16px; overflow: hidden; border: 1px solid rgba(250, 248, 245, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); padding: 32px; text-align: center;">
            <div style="width: 60px; height: 60px; background-color: #0C0A09; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 28px;">✓</span>
            </div>
            <h1 style="margin: 0; color: #0C0A09; font-size: 24px; font-weight: 700;">Application Received!</h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 32px;">
            <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #A8A29E;">
              Hey ${application.name.split(" ")[0]},
            </p>
            
            <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #A8A29E;">
              Thanks for applying to trade! I've received your application for a <strong style="color: #FAF8F5;">${projectTypeLabels[application.projectType].toLowerCase()}</strong> project.
            </p>
            
            <div style="background-color: #211C18; padding: 20px; border-radius: 12px; margin-bottom: 24px; border-left: 3px solid #F59E0B;">
              <p style="margin: 0; color: #FAF8F5; font-size: 14px;">
                <strong>Application ID:</strong> #${applicationId}<br>
                <strong>Timeline:</strong> ${timelineLabels[application.timeline]}
              </p>
            </div>
            
            <h2 style="color: #F59E0B; font-size: 16px; margin: 24px 0 12px;">What happens next?</h2>
            
            <ol style="margin: 0; padding-left: 20px; color: #A8A29E; line-height: 1.8;">
              <li>I'll review your application within <strong style="color: #FAF8F5;">48 hours</strong></li>
              <li>If there's potential fit, I'll reach out to discuss scope</li>
              <li>We'll agree on deliverables and terms</li>
              <li>Then we build something great together</li>
            </ol>
            
            <p style="margin: 24px 0 0; font-size: 16px; line-height: 1.6; color: #A8A29E;">
              No response doesn't mean no interest — I may just be heads-down on a current project. Feel free to follow up if you haven't heard back in a week.
            </p>
            
          </div>
          
          <!-- Footer -->
          <div style="padding: 24px; background-color: #211C18; text-align: center; border-top: 1px solid rgba(250, 248, 245, 0.1);">
            <p style="margin: 0 0 8px; color: #FAF8F5; font-size: 14px; font-weight: 500;">
              Barter Dev
            </p>
            <p style="margin: 0; color: #78716C; font-size: 12px;">
              Dev Work. No Cash Required.
            </p>
          </div>
          
        </div>
      </body>
    </html>
  `;

  try {
    await sendEmail(
      application.email,
      "✓ Application Received — Barter Dev",
      html
    );
    return { success: true };
  } catch (error) {
    console.error("Failed to send applicant confirmation:", error);
    return { success: false, error };
  }
}

