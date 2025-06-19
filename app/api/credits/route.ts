import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

const PACKAGES = {
  lite: {
    credits: 5,
    price: 10,
    name: "Lite Package",
  },
  pro: {
    credits: 100,
    price: 125,
    name: "Pro Package",
  },
};

type PackageType = keyof typeof PACKAGES;

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ packages: PACKAGES });
  } catch (error) {
    return NextResponse.json(
      { detail: "Failed to fetch packages" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { firebaseUid, packageName } = body;

    if (!firebaseUid || !packageName) {
      return NextResponse.json(
        { error: "ID and package name are required" },
        { status: 400 },
      );
    }

    // check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { firebaseUid },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // check if package exists
    const existingPackage = Object.keys(PACKAGES).includes(packageName);

    if (!existingPackage) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    // update user's credits
    const updatedUser = await prisma.user.update({
      where: { firebaseUid },
      data: {
        credits: {
          increment: PACKAGES[packageName as PackageType].credits,
        },
      },
    });

    return NextResponse.json(
      {
        user: updatedUser,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
