import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("=== WEBHOOK HIT ===");

  try {
    const body = await request.json();
    console.log("Raw webhook body:", body);

    // Just return success for now
    return NextResponse.json({
      success: true,
      message: "Webhook received",
      eventType: body.event_type,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Webhook endpoint is alive" });
}
