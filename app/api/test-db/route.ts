import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/postgres";

export async function GET(request: NextRequest) {
  let client;

  try {
    console.log("🔍 Testing Vercel Postgres connection");

    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL not found");
    }

    // Create a client with explicit connection string
    client = createClient({
      connectionString: process.env.DATABASE_URL,
    });

    await client.connect();

    // Test connection with a simple query
    const result = await client.sql`SELECT 1 as test`;
    console.log("✅ Basic connection works");

    // Check what tables exist
    const tables = await client.sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;

    console.log("📋 Tables found:", tables.rows);

    // Check if users table exists
    let usersTableInfo = null;
    try {
      const userTableCheck = await client.sql`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'users' AND table_schema = 'public'
      `;
      usersTableInfo = userTableCheck.rows;
      console.log("👤 Users table structure:", usersTableInfo);
    } catch (e) {
      console.log("❌ Users table doesn't exist or has issues");
    }

    return NextResponse.json({
      success: true,
      message: "Database connection working - migration ready!",
      tablesCount: tables.rows.length,
      tables: tables.rows,
      usersTableInfo: usersTableInfo,
      testTime: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("❌ Database test failed:", error);

    return NextResponse.json(
      {
        error: "Database connection failed",
        message: error.message,
        details: error.toString(),
      },
      { status: 500 },
    );
  } finally {
    // Always close the connection
    if (client) {
      try {
        await client.end();
        console.log("🔌 Connection closed");
      } catch (closeError) {
        console.log("⚠️ Error closing connection:", closeError);
      }
    }
  }
}
