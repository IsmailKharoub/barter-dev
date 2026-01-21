import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    env: {
      MONGODB_URI_present: !!process.env.MONGODB_URI,
      MONGODB_URI_prefix: process.env.MONGODB_URI?.substring(0, 30) + "...",
      NODE_ENV: process.env.NODE_ENV,
    },
    test: "not_run",
  };

  try {
    // Try to import mongodb
    const { MongoClient } = await import("mongodb");
    diagnostics.mongodb_import = "success";

    // Try to connect
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      diagnostics.test = "no_uri";
      return NextResponse.json(diagnostics);
    }

    diagnostics.test = "connecting";
    const client = new MongoClient(uri);
    
    await client.connect();
    diagnostics.test = "connected";
    
    const db = client.db("barter-dev");
    diagnostics.test = "db_selected";
    
    const count = await db.collection("applications").countDocuments();
    diagnostics.test = "query_successful";
    diagnostics.document_count = count;
    
    await client.close();
    diagnostics.test = "connection_closed";
    
    return NextResponse.json({ success: true, diagnostics });
  } catch (error) {
    diagnostics.error = {
      name: error instanceof Error ? error.name : typeof error,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : "no stack",
    };
    return NextResponse.json({ success: false, diagnostics }, { status: 500 });
  }
}

