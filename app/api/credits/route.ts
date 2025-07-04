import { NextRequest, NextResponse } from "next/server";
import { eq, and, gte, sql } from "drizzle-orm";
import { db, users } from "@/lib/db";
import { PACKAGES } from "@/api/constants/package";
import { PackageType } from "@/api/types/types";
import { validatePackage } from "@/api/utils/validatePackage";
import { validateUser } from "@/api/utils/validateUser";
import { errorResponse } from "@/api/utils/errorResponse";

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ packages: PACKAGES });
  } catch (error) {
    return errorResponse("Failed to fetch packages", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firebaseUid, packageName } = body;

    if (!firebaseUid || !packageName) {
      return errorResponse("Firebase UID and package name are required", 400);
    }

    try {
      await validateUser(firebaseUid);
      validatePackage(packageName);
    } catch (validationError) {
      const message =
        validationError instanceof Error
          ? validationError.message
          : "Unknown validation error";
      return errorResponse(message, 404);
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

    return NextResponse.json({ user: updatedUsers[0] }, { status: 200 });
  } catch (error) {
    return errorResponse("Failed to process request", 500);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { firebaseUid, amount } = body;

    if (!firebaseUid || typeof amount !== "number" || amount <= 0) {
      return errorResponse(
        "Firebase UID and positive amount are required",
        400,
      );
    }

    try {
      await validateUser(firebaseUid);
    } catch (validationError) {
      const message =
        validationError instanceof Error
          ? validationError.message
          : "Unknown validation error";
      return errorResponse(message, 404);
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
      return errorResponse("Insufficient credits", 400);
    }

    const updatedUser = updatedUsers[0];

    return NextResponse.json(
      {
        user: updatedUser,
        deducted: amount,
        remaining: updatedUser.credits,
      },
      { status: 200 },
    );
  } catch (error) {
    return errorResponse("Failed to process request", 500);
  }
}
