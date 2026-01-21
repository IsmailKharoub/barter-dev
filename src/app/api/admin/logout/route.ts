import { NextResponse } from "next/server";
import { clearAdminCookie } from "@/lib/auth/admin";
import { getPostHogClient } from "@/lib/posthog-server";

export async function POST() {
  const posthog = getPostHogClient();

  try {
    await clearAdminCookie();

    // Track admin logout
    posthog.capture({
      distinctId: 'admin',
      event: 'admin_logged_out',
      properties: {
        source: 'api',
      },
    });

    return NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Admin Logout] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

