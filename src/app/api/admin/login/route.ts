import { NextRequest, NextResponse } from "next/server";
import { verifyTOTP, createAdminToken, setAdminCookie } from "@/lib/auth/admin";
import { getPostHogClient } from "@/lib/posthog-server";

export async function POST(request: NextRequest) {
  const posthog = getPostHogClient();
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ||
             request.headers.get("x-real-ip") ||
             "unknown";
  const distinctId = request.headers.get("x-posthog-distinct-id") || `admin_${ip}`;

  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authentication code is required" },
        { status: 400 }
      );
    }

    // Verify TOTP code from authenticator app
    if (!verifyTOTP(token)) {
      // Track failed login attempt
      posthog.capture({
        distinctId,
        event: 'admin_login_failed',
        properties: {
          reason: 'invalid_totp_code',
          ip_address: ip,
          source: 'api',
        },
      });

      return NextResponse.json(
        { success: false, error: "Invalid authentication code" },
        { status: 401 }
      );
    }

    // Create JWT token and set cookie
    const jwtToken = await createAdminToken();
    await setAdminCookie(jwtToken);

    // Track successful login
    posthog.capture({
      distinctId: 'admin',
      event: 'admin_login_succeeded',
      properties: {
        ip_address: ip,
        source: 'api',
      },
    });

    // Identify admin user
    posthog.identify({
      distinctId: 'admin',
      properties: {
        role: 'admin',
        last_login: new Date().toISOString(),
      },
    });

    return NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Admin Login] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

