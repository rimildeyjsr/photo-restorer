import { Router, Response } from "express";
import { eq, and, gte, sql } from "drizzle-orm";
import { db, users } from "@/db";
import { PACKAGES } from "@/utils";
import { PackageType, validatePackage } from "@/utils";
import { createError } from "@/middleware/errorHandler";
import { AuthenticatedRequest } from "@/middleware/auth";

const router = Router();

const validateUser = async (firebaseUid: string) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.firebaseUid, firebaseUid))
    .limit(1);

  if (user.length === 0) {
    throw createError("User not found", 404);
  }

  return user[0];
};

// POST - Add credits (purchase package)
router.post("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { firebaseUid, packageName } = req.body;

    if (!firebaseUid || !packageName) {
      throw createError("Firebase UID and package name are required", 400);
    }

    try {
      await validateUser(firebaseUid);
      validatePackage(packageName);
    } catch (validationError) {
      const message =
        validationError instanceof Error
          ? validationError.message
          : "Unknown validation error";
      throw createError(message, 404);
    }

    const packageInfo = PACKAGES[packageName as PackageType];

    const updatedUsers = await db
      .update(users)
      .set({
        credits: sql`${users.credits} + ${packageInfo.credits}`,
        updatedAt: new Date(),
      })
      .where(eq(users.firebaseUid, firebaseUid))
      .returning();

    res.json({ user: updatedUsers[0] });
  } catch (error) {
    if (error instanceof Error && "statusCode" in error) {
      throw error;
    }
    throw createError("Failed to process request", 500);
  }
});

// PATCH - Deduct credits
router.patch("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { firebaseUid, amount } = req.body;

    if (!firebaseUid || typeof amount !== "number" || amount <= 0) {
      throw createError("Firebase UID and positive amount are required", 400);
    }

    try {
      await validateUser(firebaseUid);
    } catch (validationError) {
      const message =
        validationError instanceof Error
          ? validationError.message
          : "Unknown validation error";
      throw createError(message, 404);
    }

    // Check if user has enough credits and deduct
    const updatedUsers = await db
      .update(users)
      .set({
        credits: sql`${users.credits} - ${amount}`,
        updatedAt: new Date(),
      })
      .where(
        and(eq(users.firebaseUid, firebaseUid), gte(users.credits, amount)),
      )
      .returning();

    if (updatedUsers.length === 0) {
      throw createError("Insufficient credits", 400);
    }

    const updatedUser = updatedUsers[0];

    res.json({
      user: updatedUser,
      deducted: amount,
      remaining: updatedUser.credits,
    });
  } catch (error) {
    if (error instanceof Error && "statusCode" in error) {
      throw error;
    }
    throw createError("Failed to process request", 500);
  }
});

export default router;
