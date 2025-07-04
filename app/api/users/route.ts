import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, users } from "@/lib/db";
import { errorResponse } from "@/api/utils/errorResponse";
import { validateUser } from "@/api/utils/validateUser";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firebaseUid, email, name } = body;

    console.log("🔍 User POST request:", { firebaseUid, email, name });

    if (!firebaseUid || !email) {
      return errorResponse("Firebase UID and email are required", 400);
    }

    // Check if user exists
    console.log("🔍 Checking if user exists...");
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.firebaseUid, firebaseUid))
      .limit(1);

    console.log("✅ Query completed. Found users:", existingUser.length);

    if (existingUser.length > 0) {
      console.log("👤 User exists, updating...");
      // User exists, update their info
      const updatedUsers = await db
        .update(users)
        .set({
          email,
          name: name || existingUser[0].name,
          updatedAt: new Date(),
        })
        .where(eq(users.firebaseUid, firebaseUid))
        .returning();

      console.log("✅ User updated successfully");
      return NextResponse.json({
        user: updatedUsers[0],
        isNewUser: false,
      });
    }

    console.log("👤 User doesn't exist, creating new user...");
    // Create new user
    const newUsers = await db
      .insert(users)
      .values({
        firebaseUid,
        email,
        name,
        credits: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    console.log("✅ User created successfully");
    return NextResponse.json({
      user: newUsers[0],
      isNewUser: true,
    });
  } catch (error) {
    console.error("❌ Error in users POST:", error);
    console.error("❌ Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "No stack",
    });
    return errorResponse(
      `Failed to create user: ${error instanceof Error ? error.message : "Unknown error"}`,
      500,
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const firebaseUid = searchParams.get("firebaseUid");

    if (!firebaseUid) {
      return errorResponse("Firebase UID is required", 400);
    }

    try {
      const user = await validateUser(firebaseUid);
      return NextResponse.json({ user });
    } catch (validationError) {
      const message =
        validationError instanceof Error
          ? validationError.message
          : "Unknown validation error";
      return errorResponse(message, 404);
    }
  } catch (error) {
    console.error("Error in users GET:", error);
    return errorResponse("Failed to fetch user", 500);
  }
}
