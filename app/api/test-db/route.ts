import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Testing database connection without Prisma");

    // Check if DATABASE_URL exists
    const dbUrl = process.env.DATABASE_URL;
    console.log("DATABASE_URL exists:", !!dbUrl);
    console.log("DATABASE_URL preview:", dbUrl?.substring(0, 50) + "...");

    if (!dbUrl) {
      return NextResponse.json(
        {
          error: "DATABASE_URL not found",
          env: process.env,
        },
        { status: 500 },
      );
    }

    // Try direct fetch to Supabase
    try {
      // Extract connection details
      const url = new URL(dbUrl);
      const host = url.hostname;
      const port = url.port;
      const database = url.pathname.slice(1);
      const username = url.username;

      console.log("Connection details:", { host, port, database, username });

      // Test with a simple fetch (this won't work but will show connection attempt)
      const response = await fetch(`https://${host}/rest/v1/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Fetch test response:", response.status);

      return NextResponse.json({
        success: true,
        databaseUrl: !!dbUrl,
        connectionTest: "Basic fetch attempt completed",
        host: host,
        status: response.status,
      });
    } catch (fetchError: any) {
      console.error("Fetch error:", fetchError);

      return NextResponse.json(
        {
          error: "Connection test failed",
          details: fetchError.message,
          databaseUrl: !!dbUrl,
        },
        { status: 500 },
      );
    }
  } catch (error: any) {
    console.error("Test endpoint error:", error);
    return NextResponse.json(
      {
        error: "Test failed",
        message: error.message,
      },
      { status: 500 },
    );
  }
}
