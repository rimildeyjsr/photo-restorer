// Create this file: app/api/webhooks/paddle/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { PACKAGES } from "@/api/constants/package";

const prisma = new PrismaClient();

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    console.log("🔔 Paddle webhook received");

    const body = await request.json();
    console.log("📨 Full webhook body:", JSON.stringify(body, null, 2));
    console.log("📨 Event type received:", body.event_type);

    // Paddle sends different event types - we want transaction.completed
    if (body.event_type !== "transaction.completed") {
      console.log(
        "❌ Not a completed transaction, ignoring. Event type:",
        body.event_type,
      );
      return NextResponse.json({ message: "Event type not handled" });
    }

    const transaction = body.data;

    // Extract custom data that we sent with the purchase
    const customData = transaction.custom_data;
    if (!customData?.packageName) {
      console.log("❌ No package name in custom data");
      return NextResponse.json(
        { error: "No package name found" },
        { status: 400 },
      );
    }

    const packageName = customData.packageName;
    const packageInfo = PACKAGES[packageName as keyof typeof PACKAGES];

    if (!packageInfo) {
      console.log("❌ Invalid package name:", packageName);
      return NextResponse.json({ error: "Invalid package" }, { status: 400 });
    }

    // Try multiple ways to find the user
    let user;
    const firebaseUid = customData.firebaseUid;
    const userEmail = customData.userEmail || transaction.customer?.email;

    if (firebaseUid) {
      // Best approach: find by Firebase UID
      user = await prisma.user.findUnique({
        where: { firebaseUid: firebaseUid },
      });
      console.log("✅ Found user by Firebase UID:", user?.email);
    } else if (userEmail) {
      // Backup: find by email
      user = await prisma.user.findUnique({
        where: { email: userEmail },
      });
      console.log("✅ Found user by email:", user?.email);
    } else {
      // Last resort: use most recent user
      user = await prisma.user.findFirst({
        orderBy: { createdAt: "desc" },
      });
      console.log("⚠️ Using most recent user as fallback:", user?.email);
    }

    if (!user) {
      console.log("❌ User not found with email:", userEmail);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Add credits to user
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        credits: {
          increment: packageInfo.credits,
        },
      },
    });

    console.log(
      `✅ Added ${packageInfo.credits} credits to user ${user.email}`,
    );
    console.log(`💰 User now has ${updatedUser.credits} total credits`);

    // Log the transaction for record keeping
    console.log("Transaction details:", {
      transactionId: transaction.id,
      amount: transaction.details?.totals?.total,
      currency: transaction.currency_code,
      packageName,
      creditsAdded: packageInfo.credits,
      userEmail: userEmail,
      newCreditBalance: updatedUser.credits,
    });

    return NextResponse.json({
      message: "Credits added successfully",
      creditsAdded: packageInfo.credits,
      newBalance: updatedUser.credits,
    });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
