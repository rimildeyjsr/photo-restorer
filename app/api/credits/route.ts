import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { PACKAGES } from "@/api/constants/package";
import { PackageType } from "@/api/types/types";
import { validatePackage } from "@/api/utils/validatePackage";
import { validateUser } from "@/api/utils/validateUser";
import { errorResponse } from "@/api/utils/errorResponse";

const prisma = new PrismaClient();

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
      // These will throw if validation fails
      await validateUser(firebaseUid);
      validatePackage(packageName);
    } catch (validationError) {
      const message =
        validationError instanceof Error
          ? validationError.message
          : "Unknown validation error";
      return errorResponse(message, 404);
    }

    const updatedUser = await prisma.user.update({
      where: { firebaseUid },
      data: {
        credits: {
          increment: PACKAGES[packageName as PackageType].credits,
        },
      },
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
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

    const updatedResult = await prisma.user.updateMany({
      where: {
        firebaseUid,
        credits: { gte: amount },
      },
      data: {
        credits: { decrement: amount },
      },
    });

    if (updatedResult.count === 0) {
      return errorResponse("Insufficient credits", 400);
    }

    // Fetch the updated user to return current state
    const updatedUser = await prisma.user.findUnique({
      where: { firebaseUid },
    });

    return NextResponse.json(
      {
        user: updatedUser,
        deducted: amount,
        remaining: updatedUser!.credits,
      },
      { status: 200 },
    );
  } catch (error) {
    return errorResponse("Failed to process request", 500);
  }
}
