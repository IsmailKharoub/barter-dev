import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth/admin";
import { getAllApplications, getApplicationStats } from "@/lib/db/mongodb";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "100");
    const search = searchParams.get("search");

    // Get applications
    const applications = await getAllApplications(limit, status, search);
    
    // Get stats
    const stats = await getApplicationStats();

    return NextResponse.json(
      { 
        success: true, 
        applications,
        stats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Admin API] Error fetching applications:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

