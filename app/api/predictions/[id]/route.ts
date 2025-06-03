import { NextRequest, NextResponse } from "next/server";
import Replicate, { type Prediction } from "replicate";

interface RouteParams {
  id: string;
}

interface RouteContext {
  params: Promise<RouteParams>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      console.error("REPLICATE_API_TOKEN environment variable is not set");
      return NextResponse.json(
        { detail: "REPLICATE_API_TOKEN environment variable is not set" },
        { status: 500 },
      );
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const { id }: RouteParams = await context.params;

    if (!id) {
      return NextResponse.json(
        { detail: "Prediction ID is required" },
        { status: 400 },
      );
    }

    console.log("Fetching prediction:", id);

    const prediction: Prediction = await replicate.predictions.get(id);
    console.log("Prediction fetched:", prediction);

    if (prediction?.error) {
      console.error("Prediction error:", prediction.error);
      return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }

    return NextResponse.json(prediction);
  } catch (error) {
    console.error("Unhandled error in GET /api/predictions/[id]:", error);
    return NextResponse.json(
      {
        detail:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
