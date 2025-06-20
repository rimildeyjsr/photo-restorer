import { NextRequest, NextResponse } from "next/server";
import { type Prediction } from "replicate";
import { createReplicateClient } from "@/api/utils/replicate";
import { errorResponse } from "@/api/utils/errorResponse";

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

    const { id }: RouteParams = await context.params;

    if (!id) {
      return errorResponse("Prediction ID is required", 400);
    }

    const prediction: Prediction = await replicate.predictions.get(id);

    if (prediction?.error) {
      return errorResponse(prediction.error.toString(), 500);
    }

    return NextResponse.json(prediction);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
