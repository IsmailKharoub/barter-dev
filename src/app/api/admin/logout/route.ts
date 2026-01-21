import { NextResponse } from "next/server";
import { clearAdminCookie } from "@/lib/auth/admin";

export async function POST() {
  try {
    await clearAdminCookie();
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

