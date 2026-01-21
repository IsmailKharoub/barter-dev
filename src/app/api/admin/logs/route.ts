import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/admin";
import { queryLogs } from "@/lib/db/logs";

export async function GET(request: NextRequest) {
  // Verify admin session
  const session = await getAdminSession();
  if (!session?.isAdmin) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    
    const level = searchParams.get("level") as "info" | "warn" | "error" | "debug" | null;
    const context = searchParams.get("context");
    const requestId = searchParams.get("requestId");
    const limit = parseInt(searchParams.get("limit") || "100");
    const hours = parseInt(searchParams.get("hours") || "24");
    
    // Get logs from the last N hours
    const startDate = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    const logs = await queryLogs({
      level: level || undefined,
      context: context || undefined,
      requestId: requestId || undefined,
      startDate,
      limit,
    });

    return NextResponse.json({
      success: true,
      logs,
      count: logs.length,
      filters: {
        level,
        context,
        requestId,
        hours,
        limit,
      },
    });
  } catch (error) {
    console.error("[Admin] Error fetching logs:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch logs",
      },
      { status: 500 }
    );
  }
}

