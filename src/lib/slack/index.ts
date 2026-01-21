import type { ApplicationFormData } from "@/lib/validations/application";
import {
  projectTypeLabels,
  tradeTypeLabels,
  timelineLabels,
} from "@/lib/validations/application";

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
}

/**
 * Sends a Slack message via Incoming Webhook (recommended).
 *
 * Configure:
 * - SLACK_WEBHOOK_URL: the incoming webhook URL created in Slack
 * - NEXT_PUBLIC_SITE_URL (optional): used to link to the site in the message
 */
export async function notifySlackNewApplication(
  application: ApplicationFormData,
  applicationId: number | bigint,
  meta?: {
    ip?: string;
    userAgent?: string;
    referrer?: string | null;
  }
) {
  console.log("[Slack] Starting notification process...");
  console.log("[Slack] Application ID:", applicationId);
  console.log("[Slack] Application data:", {
    name: application.name,
    email: application.email,
    projectType: application.projectType,
    tradeType: application.tradeType,
  });
  
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  console.log("[Slack] Webhook URL present:", !!webhookUrl);
  console.log("[Slack] Webhook URL (first 50 chars):", webhookUrl?.substring(0, 50));
  
  if (!webhookUrl) {
    console.warn("[Slack] No webhook URL configured, skipping notification");
    return { success: false, skipped: true as const };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://barter-dev.com";
  const id = Number(applicationId);
  const title = `New trade application #${id}`;
  
  console.log("[Slack] Building message blocks...");

  const blocks = [
    {
      type: "header",
      text: { type: "plain_text", text: title },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Name:*\n${application.name}` },
        { type: "mrkdwn", text: `*Email:*\n${application.email}` },
        {
          type: "mrkdwn",
          text: `*Project:*\n${projectTypeLabels[application.projectType]}`,
        },
        { type: "mrkdwn", text: `*Timeline:*\n${timelineLabels[application.timeline]}` },
        { type: "mrkdwn", text: `*Trade:*\n${tradeTypeLabels[application.tradeType]}` },
        {
          type: "mrkdwn",
          text: `*Value:*\n$${application.estimatedValue.toLocaleString()}`,
        },
      ],
    },
    ...(application.website
      ? [
          {
            type: "section",
            text: { type: "mrkdwn", text: `*Website:*\n${application.website}` },
          },
        ]
      : []),
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Project description:*\n${truncate(application.projectDescription, 500)}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Trade offer:*\n${truncate(application.tradeDescription, 500)}`,
      },
    },
    ...(application.additionalInfo
      ? [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Additional info:*\n${truncate(application.additionalInfo, 500)}`,
            },
          },
        ]
      : []),
    {
      type: "context",
      elements: [
        { type: "mrkdwn", text: `*Source:* ${siteUrl}` },
        ...(meta?.referrer ? [{ type: "mrkdwn", text: `*Ref:* ${meta.referrer}` }] : []),
      ],
    },
  ];

  try {
    const payload = {
      text: title,
      blocks,
    };
    
    console.log("[Slack] Payload:", JSON.stringify(payload, null, 2));
    console.log("[Slack] Sending request to Slack...");
    
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("[Slack] Response status:", res.status, res.statusText);
    
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[Slack] Error response body:", text);
      throw new Error(`Slack webhook failed: ${res.status} ${res.statusText} ${text}`.trim());
    }

    const responseText = await res.text().catch(() => "");
    console.log("[Slack] Success response:", responseText);
    console.log("[Slack] ✅ Notification sent successfully!");
    
    return { success: true as const };
  } catch (error) {
    console.error("[Slack] ❌ Failed to send Slack notification:", error);
    return { success: false as const, error };
  }
}


