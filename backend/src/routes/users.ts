import { Router, Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db, users } from "@/db";
import { createError } from "@/middleware/errorHandler";
import { authenticateToken, AuthenticatedRequest } from "@/middleware/auth";

const router = Router();

router.post(
  "/",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { firebaseUid, email, name } = req.body;

      console.log("🔍 User POST request:", { firebaseUid, email, name });

      if (!firebaseUid || !email) {
        throw createError("Firebase UID and email are required", 400);
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
        return res.json({
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
      res.json({
        user: newUsers[0],
        isNewUser: true,
      });
    } catch (error) {
      console.error("❌ Error in users POST:", error);
      console.error("❌ Error details:", {
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : "No stack",
      });

      if (error instanceof Error && "statusCode" in error) {
        throw error;
      }

      throw createError(
        `Failed to create user: ${error instanceof Error ? error.message : "Unknown error"}`,
        500,
      );
    }
  },
);

router.get(
  "/",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { firebaseUid } = req.query;

      if (!firebaseUid) {
        throw createError("Firebase UID is required", 400);
      }

      const user = await db
        .select()
        .from(users)
        .where(eq(users.firebaseUid, firebaseUid as string))
        .limit(1);

      if (user.length === 0) {
        throw createError("User not found", 404);
      }

      res.json({ user: user[0] });
    } catch (error) {
      console.error("Error in users GET:", error);

      if (error instanceof Error && "statusCode" in error) {
        throw error;
      }

      throw createError("Failed to fetch user", 500);
    }
  },
);

export default router;
