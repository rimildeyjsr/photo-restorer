import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firebaseUid, email, name } = body;

    if (!firebaseUid || !email) {
      return NextResponse.json(
        { error: "Firebase UID and email are required" },
        { status: 400 },
      );
    }

    // check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { firebaseUid },
    });

    if (existingUser) {
      // User exists, optionally update their info
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

    // create new user
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
    return NextResponse.json(
      { detail: "Failed to create user" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const firebaseUid = searchParams.get("firebaseUid");

    if (!firebaseUid) {
      return NextResponse.json(
        { error: "Firebase UID is required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { firebaseUid },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
}
