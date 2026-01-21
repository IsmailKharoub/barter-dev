import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { authenticator } from "@otplib/preset-default";

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "your-secret-key-change-in-production"
);

// TOTP secret for authenticator app (Google Authenticator, Authy, etc.)
const TOTP_SECRET = process.env.ADMIN_TOTP_SECRET || "";

export interface AdminSession {
  isAdmin: boolean;
  loginTime: number;
}

/**
 * Verify TOTP code from authenticator app
 */
export function verifyTOTP(token: string): boolean {
  if (!TOTP_SECRET) {
    console.error("ADMIN_TOTP_SECRET not configured");
    return false;
  }

  try {
    return authenticator.verify({ token, secret: TOTP_SECRET });
  } catch (error) {
    console.error("TOTP verification error:", error);
    return false;
  }
}

/**
 * Generate TOTP secret for initial setup
 */
export function generateTOTPSecret(): string {
  return authenticator.generateSecret();
}

/**
 * Get authenticator URI for QR code
 */
export function getAuthenticatorURI(secret: string, label: string = "Barter Admin"): string {
  return authenticator.keyuri(label, "barter-dev.com", secret);
}

/**
 * Create admin session token
 */
export async function createAdminToken(): Promise<string> {
  const token = await new SignJWT({ isAdmin: true, loginTime: Date.now() })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET_KEY);

  return token;
}

/**
 * Verify admin token
 */
export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as AdminSession;
  } catch (error) {
    return null;
  }
}

/**
 * Get admin session from cookies
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;

  if (!token) {
    return null;
  }

  return verifyAdminToken(token);
}

/**
 * Check if user is authenticated admin
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getAdminSession();
  return session?.isAdmin === true;
}

/**
 * Set admin session cookie
 */
export async function setAdminCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("admin-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

/**
 * Clear admin session cookie
 */
export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-token");
}

