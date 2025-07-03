import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firebaseUid, email, name } = body;

    console.log("Simple user endpoint called:", { firebaseUid, email });

    // For now, just return a mock response to test if the endpoint works
    const mockUser = {
      id: "mock-id",
      firebaseUid,
      email,
      name,
      credits: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log("Returning mock user:", mockUser);

    return NextResponse.json({
      user: mockUser,
      isNewUser: true,
      note: "This is a mock response - bypassing database for testing",
    });
  } catch (error: any) {
    console.error("Simple user endpoint error:", error);
    return NextResponse.json(
      {
        error: "Simple endpoint failed",
        message: error.message,
      },
      { status: 500 },
    );
  }
}
