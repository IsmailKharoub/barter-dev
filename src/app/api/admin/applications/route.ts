import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth/admin";
import { getAllApplications, getApplicationStats, SortField, SortOrder } from "@/lib/db/mongodb";

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
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");
    const sortBy = (searchParams.get("sortBy") || "createdAt") as SortField;
    const sortOrder = (searchParams.get("sortOrder") || "desc") as SortOrder;

    // Validate sort field
    const validSortFields: SortField[] = ["createdAt", "name", "email", "status"];
    const validatedSortBy = validSortFields.includes(sortBy) ? sortBy : "createdAt";

    // Validate sort order
    const validatedSortOrder: SortOrder = sortOrder === "asc" ? "asc" : "desc";

    // Get applications with pagination
    const result = await getAllApplications({
      page,
      pageSize,
      status,
      search,
      sortBy: validatedSortBy,
      sortOrder: validatedSortOrder,
    });
    
    // Get stats
    const stats = await getApplicationStats();

    return NextResponse.json(
      { 
        success: true, 
        applications: result.applications,
        stats,
        pagination: {
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          totalCount: result.totalCount,
          pageSize,
        },
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

