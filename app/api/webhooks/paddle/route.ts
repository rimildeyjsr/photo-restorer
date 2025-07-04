import { NextRequest, NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { db, users } from "@/lib/db";
import { PACKAGES } from "@/api/constants/package";
import { PackageType } from "@/api/types/types";

export async function POST(request: NextRequest) {
  try {
    console.log("🔔 Paddle webhook received");

    const body = await request.json();
    console.log("📨 Webhook data:", JSON.stringify(body, null, 2));

    // Check event type
    if (body.event_type !== "transaction.completed") {
      console.log("❌ Not completed transaction:", body.event_type);
      return NextResponse.json({ message: "Event type not handled" });
    }

    const transaction = body.data;
    const customData = transaction.custom_data;

    console.log("📦 Custom data received:", customData);

    // Validate required data
    if (!customData?.packageName) {
      console.log("❌ No package name in webhook");
      return NextResponse.json({ error: "No package name" }, { status: 400 });
    }

    if (!customData?.firebaseUid) {
      console.log("❌ No Firebase UID in webhook");
      return NextResponse.json({ error: "No Firebase UID" }, { status: 400 });
    }

    const packageName = customData.packageName as PackageType;
    const firebaseUid = customData.firebaseUid;
    const userEmail = customData.userEmail;

    // Get package info
    const packageInfo = PACKAGES[packageName];
    if (!packageInfo) {
      console.log("❌ Invalid package:", packageName);
      return NextResponse.json({ error: "Invalid package" }, { status: 400 });
    }

    console.log(
      `💳 Processing ${packageName} for user ${firebaseUid} (${userEmail})`,
    );

    // Find user by Firebase UID
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.firebaseUid, firebaseUid))
      .limit(1);

    if (userResult.length === 0) {
      console.log("❌ User not found with UID:", firebaseUid);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = userResult[0];
    console.log("✅ Found user:", user.email);

    // Add credits
    const updatedUsers = await db
      .update(users)
      .set({
        credits: sql`${users.credits} + ${packageInfo.credits}`,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id))
      .returning();

    const updatedUser = updatedUsers[0];

    console.log(
      `✅ SUCCESS: Added ${packageInfo.credits} credits to ${user.email}`,
    );
    console.log(`💰 New balance: ${updatedUser.credits} credits`);

    return NextResponse.json({
      success: true,
      message: "Credits added successfully",
      creditsAdded: packageInfo.credits,
      newBalance: updatedUser.credits,
      userEmail: user.email,
    });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Webhook endpoint is alive" });
}
