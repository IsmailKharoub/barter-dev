import { Resend } from "resend";
import type { ApplicationFormData } from "@/lib/validations/application";
import {
  projectTypeLabels,
  tradeTypeLabels,
  timelineLabels,
} from "@/lib/validations/application";

// Lazy initialization of Resend client to avoid build-time errors
let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

const FROM_EMAIL = process.env.FROM_EMAIL || "notifications@barter.dev";
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "hello@barter.dev";

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
                <div style="flex: 1;">
                  <span style="color: #78716C; font-size: 12px;">Estimated Value</span>
                  <p style="margin: 4px 0 0; font-weight: 600; color: #10B981;">$${application.estimatedValue.toLocaleString()}</p>
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
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `🔔 New Trade Application: ${projectTypeLabels[application.projectType]} ($${application.estimatedValue.toLocaleString()})`,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send admin notification:", error);
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
                <strong>Estimated Value:</strong> $${application.estimatedValue.toLocaleString()}<br>
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
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: application.email,
      subject: "✓ Application Received — Barter Dev",
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send applicant confirmation:", error);
    return { success: false, error };
  }
}

