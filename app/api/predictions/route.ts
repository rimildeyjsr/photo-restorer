import { NextRequest, NextResponse } from "next/server";
import Replicate, { type Prediction } from "replicate";

interface RequestBody {
  input_image: string;
}

interface PredictionCreateOptions {
  model: string;
  input: {
    input_image: string;
  };
  webhook?: string;
  webhook_events_filter?: Array<"start" | "output" | "logs" | "completed">;
}

const WEBHOOK_HOST = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NGROK_HOST;

export async function POST(request: NextRequest): Promise<NextResponse> {
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

    let body: RequestBody;

    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return NextResponse.json(
        { detail: "Invalid JSON in request body" },
        { status: 400 },
      );
    }

    const { input_image } = body;

    if (!input_image) {
      return NextResponse.json(
        { detail: "input_image is required" },
        { status: 400 },
      );
    }

    const options: PredictionCreateOptions = {
      model: "flux-kontext-apps/restore-image",
      input: { input_image },
    };

    if (WEBHOOK_HOST) {
      options.webhook = `${WEBHOOK_HOST}/api/webhooks`;
      options.webhook_events_filter = ["start", "completed"];
    }

    console.log("Creating prediction with options:", options);

    const prediction: Prediction = await replicate.predictions.create(options);
    console.log("Prediction created:", prediction);

    if (prediction?.error) {
      console.error("Prediction error:", prediction.error);
      return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }

    return NextResponse.json(prediction, { status: 201 });
  } catch (error) {
    console.error("Unhandled error in POST /api/predictions:", error);
    return NextResponse.json(
      {
        detail:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
