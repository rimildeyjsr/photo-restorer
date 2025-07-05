import { Router, Request, Response } from "express";
import { eq, sql } from "drizzle-orm";
import { db, users } from "@/db";
import { PACKAGES, PackageType } from "@/utils";

const router = Router();

// POST - Paddle webhook handler
router.post("/", async (req: Request, res: Response) => {
  try {
    console.log("🔔 Paddle webhook received");

    const body = req.body;
    console.log("📨 Webhook data:", JSON.stringify(body, null, 2));

    // Check event type
    if (body.event_type !== "transaction.completed") {
      console.log("❌ Not completed transaction:", body.event_type);
      return res.json({ message: "Event type not handled" });
    }

    const transaction = body.data;
    const customData = transaction.custom_data;

    console.log("📦 Custom data received:", customData);

    // Validate required data
    if (!customData?.packageName) {
      console.log("❌ No package name in webhook");
      return res.status(400).json({ error: "No package name" });
    }

    if (!customData?.firebaseUid) {
      console.log("❌ No Firebase UID in webhook");
      return res.status(400).json({ error: "No Firebase UID" });
    }

    const packageName = customData.packageName as PackageType;
    const firebaseUid = customData.firebaseUid;
    const userEmail = customData.userEmail;

    // Get package info
    const packageInfo = PACKAGES[packageName];
    if (!packageInfo) {
      console.log("❌ Invalid package:", packageName);
      return res.status(400).json({ error: "Invalid package" });
    }

    console.log(
      `💳 Processing ${packageName} for user ${firebaseUid} (${userEmail})`,
    );

    // Find user by Firebase UID with better error handling
    let userResult;
    try {
      userResult = await db
        .select()
        .from(users)
        .where(eq(users.firebaseUid, firebaseUid))
        .limit(1);
    } catch (dbError) {
      console.error("❌ Database connection error:", dbError);
      return res.status(500).json({
        error: "Database connection failed",
        details: dbError instanceof Error ? dbError.message : "Unknown error",
      });
    }

    if (userResult.length === 0) {
      console.log("❌ User not found with UID:", firebaseUid);
      return res.status(404).json({ error: "User not found" });
    }

    const user = userResult[0];
    console.log("✅ Found user:", user.email);

    // Add credits with better error handling
    let updatedUsers;
    try {
      updatedUsers = await db
        .update(users)
        .set({
          credits: sql`${users.credits} + ${packageInfo.credits}`,
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id))
        .returning();
    } catch (dbError) {
      console.error("❌ Database update error:", dbError);
      return res.status(500).json({
        error: "Failed to update credits",
        details: dbError instanceof Error ? dbError.message : "Unknown error",
      });
    }

    const updatedUser = updatedUsers[0];

    console.log(
      `✅ SUCCESS: Added ${packageInfo.credits} credits to ${user.email}`,
    );
    console.log(`💰 New balance: ${updatedUser.credits} credits`);

    res.json({
      success: true,
      message: "Credits added successfully",
      creditsAdded: packageInfo.credits,
      newBalance: updatedUser.credits,
      userEmail: user.email,
    });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    res.status(500).json({
      error: "Webhook failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// GET - Health check for webhook
router.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Webhook endpoint is alive" });
});

export default router;
