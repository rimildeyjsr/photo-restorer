import { NextRequest, NextResponse } from "next/server";
import { type Prediction } from "replicate";
import { createReplicateClient, getWebhookHost } from "@/api/utils/replicate";
import { errorResponse } from "@/api/utils/errorResponse";

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

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    let replicate;
    try {
      replicate = createReplicateClient();
    } catch (configError) {
      const message =
        configError instanceof Error
          ? configError.message
          : "Replicate configuration error";
      return errorResponse(message, 500);
    }

    let body: RequestBody;
    try {
      body = await request.json();
    } catch (parseError) {
      return errorResponse("Invalid JSON in request body", 400);
    }

    const { input_image } = body;

    if (!input_image) {
      return errorResponse("input_image is required", 400);
    }

    const options: PredictionCreateOptions = {
      model: "flux-kontext-apps/restore-image",
      input: { input_image },
    };

    const webhookHost = getWebhookHost();
    if (webhookHost) {
      options.webhook = `${webhookHost}/api/webhooks`;
      options.webhook_events_filter = ["start", "completed"];
    }

    const prediction: Prediction = await replicate.predictions.create(options);

    if (prediction?.error) {
      return errorResponse(prediction.error.toString(), 500);
    }

    return NextResponse.json(prediction, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
