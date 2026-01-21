import { NextRequest, NextResponse } from "next/server";
import { verifyTOTP, createAdminToken, setAdminCookie } from "@/lib/auth/admin";

export async function POST(request: NextRequest) {
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
      return NextResponse.json(
        { success: false, error: "Invalid authentication code" },
        { status: 401 }
      );
    }

    // Create JWT token and set cookie
    const jwtToken = await createAdminToken();
    await setAdminCookie(jwtToken);

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

