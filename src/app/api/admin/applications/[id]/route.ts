import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth/admin";
import { 
  getApplicationById, 
  updateApplicationStatus,
  addApplicationNote,
  deleteApplication,
} from "@/lib/db/mongodb";

// GET single application
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const application = await getApplicationById(id);

    if (!application) {
      return NextResponse.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, application },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Admin API] Error fetching application:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH update application
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { status, note } = body;

    // Update status if provided
    if (status) {
      const updated = await updateApplicationStatus(id, status);
      if (!updated) {
        return NextResponse.json(
          { success: false, error: "Failed to update application" },
          { status: 400 }
        );
      }
    }

    // Add note if provided
    if (note) {
      await addApplicationNote(id, note);
    }

    // Get updated application
    const application = await getApplicationById(id);

    return NextResponse.json(
      { success: true, application },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Admin API] Error updating application:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE application
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const deleted = await deleteApplication(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Failed to delete application" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Application deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Admin API] Error deleting application:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

