import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { errorResponse } from "@/api/utils/errorResponse";
import { validateUser } from "@/api/utils/validateUser";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firebaseUid, email, name } = body;

    if (!firebaseUid || !email) {
      return errorResponse("Firebase UID and email are required", 400);
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { firebaseUid },
    });

    if (existingUser) {
      // User exists, update their info
      const updatedUser = await prisma.user.update({
        where: { firebaseUid },
        data: {
          email,
          name: name || existingUser.name,
        },
      });

      return NextResponse.json({
        user: updatedUser,
        isNewUser: false,
      });
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        firebaseUid,
        email,
        name,
      },
    });

    return NextResponse.json({
      user: newUser,
      isNewUser: true,
    });
  } catch (error) {
    return errorResponse("Failed to create user", 500);
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
    return errorResponse("Failed to fetch user", 500);
  }
}
