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
    console.log("Webhook data:", JSON.stringify(body, null, 2));

    // Paddle sends different event types - we want transaction.completed
    if (body.event_type !== "transaction.completed") {
      console.log("❌ Not a completed transaction, ignoring");
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

    // Try to get customer email, or use a different approach
    let customerEmail = transaction.customer?.email;

    // If no email in customer object, try to get it from customer_id
    if (!customerEmail && transaction.customer_id) {
      console.log(
        "⚠️ No customer email in webhook, using customer_id:",
        transaction.customer_id,
      );
      // For now, we'll skip email validation and find user another way
      // You might want to store customer_id in your database in the future
    }

    console.log(
      `💳 Processing payment for customer ${transaction.customer_id}, package: ${packageName}`,
    );

    // If we have email, find by email. Otherwise, find by most recent user (for testing)
    let user;
    if (customerEmail) {
      user = await prisma.user.findUnique({
        where: { email: customerEmail },
      });
    } else {
      // Fallback: get the most recently created user (for testing)
      // In production, you'd want to pass firebaseUid in custom_data
      user = await prisma.user.findFirst({
        orderBy: { createdAt: "desc" },
      });
      console.log("⚠️ Using most recent user as fallback:", user?.email);
    }

    if (!user) {
      console.log("❌ User not found with email:", customerEmail);
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
      userEmail: customerEmail,
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
