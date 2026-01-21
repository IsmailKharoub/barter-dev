import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth/admin";
import { bulkUpdateApplicationStatus, Application } from "@/lib/db/mongodb";

export async function PATCH(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { ids, status } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: "IDs array is required" },
        { status: 400 }
      );
    }

    const validStatuses: Application["status"][] = ["pending", "reviewing", "accepted", "rejected"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Valid status is required" },
        { status: 400 }
      );
    }

    const modifiedCount = await bulkUpdateApplicationStatus(ids, status);

    return NextResponse.json(
      { 
        success: true, 
        message: `${modifiedCount} applications updated to ${status}`,
        modifiedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Admin API] Error bulk updating applications:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

