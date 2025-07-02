import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { PACKAGES } from "@/api/constants/package";
import { PackageType } from "@/api/types/types";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  console.log("=== WEBHOOK HIT ===");

  try {
    const body = await request.json();
    console.log("🔔 Raw webhook body:", JSON.stringify(body, null, 2));

    // Check event type
    if (body.event_type !== "transaction.completed") {
      console.log("❌ Not a completed transaction:", body.event_type);
      return NextResponse.json({ message: "Event type not handled" });
    }

    const transaction = body.data;
    const customData = transaction.custom_data;

    console.log("📦 Custom data:", customData);
    console.log("👤 Customer data:", transaction.customer);
    console.log("🆔 Customer ID:", transaction.customer_id);

    if (!customData?.packageName) {
      console.log("❌ No package name in custom data");
      return NextResponse.json({ error: "No package name" }, { status: 400 });
    }

    const packageName = customData.packageName as PackageType;

    // Type guard to ensure packageName is valid
    if (!packageName || typeof packageName !== "string") {
      console.log("❌ Invalid package name type:", packageName);
      return NextResponse.json(
        { error: "Invalid package name" },
        { status: 400 },
      );
    }

    // Check if packageName is a valid key
    if (!(packageName in PACKAGES)) {
      console.log("❌ Package not found:", packageName);
      return NextResponse.json({ error: "Package not found" }, { status: 400 });
    }

    const packageInfo = PACKAGES[packageName];

    // Try to find user by various methods
    let user = null;

    // Method 1: Firebase UID from custom data
    if (customData.firebaseUid) {
      user = await prisma.user.findUnique({
        where: { firebaseUid: customData.firebaseUid },
      });
      console.log("🔍 Found by Firebase UID:", user?.email);
    }

    // Method 2: Email from custom data
    if (!user && customData.userEmail) {
      user = await prisma.user.findUnique({
        where: { email: customData.userEmail },
      });
      console.log("🔍 Found by custom email:", user?.email);
    }

    // Method 3: Email from Paddle customer (rare)
    if (!user && transaction.customer?.email) {
      user = await prisma.user.findUnique({
        where: { email: transaction.customer.email },
      });
      console.log("🔍 Found by Paddle email:", user?.email);
    }

    // Method 4: Most recent user (fallback for sandbox/testing)
    if (!user) {
      user = await prisma.user.findFirst({
        orderBy: { createdAt: "desc" },
      });
      console.log("🔍 Using most recent user as fallback:", user?.email);
    }

    if (!user) {
      console.log("❌ No user found at all");
      return NextResponse.json(
        { error: "No users exist in database" },
        { status: 404 },
      );
    }

    // Add credits
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        credits: {
          increment: packageInfo.credits,
        },
      },
    });

    console.log(`✅ Added ${packageInfo.credits} credits to ${user.email}`);
    console.log(`💰 New balance: ${updatedUser.credits} credits`);

    return NextResponse.json({
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
