import { NextResponse } from "next/server";
import { generateTOTPSecret, getAuthenticatorURI } from "@/lib/auth/admin";
import QRCode from "qrcode";

/**
 * Setup endpoint for generating TOTP secret and QR code
 * Only accessible when ADMIN_TOTP_SECRET is not set
 */
export async function GET() {
  try {
    // Check if TOTP is already configured
    if (process.env.ADMIN_TOTP_SECRET) {
      return NextResponse.json(
        { 
          success: false, 
          error: "TOTP already configured. Remove ADMIN_TOTP_SECRET from environment to reconfigure." 
        },
        { status: 403 }
      );
    }

    // Generate new secret
    const secret = generateTOTPSecret();
    const uri = getAuthenticatorURI(secret);
    
    // Generate QR code as data URL
    const qrCode = await QRCode.toDataURL(uri);

    return NextResponse.json(
      {
        success: true,
        secret,
        qrCode,
        instructions: [
          "1. Install an authenticator app (Google Authenticator, Authy, etc.)",
          "2. Scan the QR code with your authenticator app",
          "3. Add this to your .env.local file:",
          `   ADMIN_TOTP_SECRET=${secret}`,
          "4. Restart your server",
          "5. Use the 6-digit code from your authenticator app to login"
        ]
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Admin Setup] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

