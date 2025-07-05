import { Router, Response } from "express";
import { type Prediction } from "replicate";
import Replicate from "replicate";
import { createError } from "@/middleware/errorHandler";
import { authenticateToken, AuthenticatedRequest } from "@/middleware/auth";
import { getWebhookHost } from "@/utils";

const router = Router();

const createReplicateClient = (): Replicate => {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error("REPLICATE_API_TOKEN environment variable is not set");
  }

  return new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });
};

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

// POST - Create prediction
router.post("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    let replicate;
    try {
      replicate = createReplicateClient();
    } catch (configError) {
      const message =
        configError instanceof Error
          ? configError.message
          : "Replicate configuration error";
      throw createError(message, 500);
    }

    let body: RequestBody;
    try {
      body = req.body;
    } catch (parseError) {
      throw createError("Invalid JSON in request body", 400);
    }

    const { input_image } = body;

    if (!input_image) {
      throw createError("input_image is required", 400);
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
      throw createError(prediction.error.toString(), 500);
    }

    res.status(201).json(prediction);
  } catch (error) {
    if (error instanceof Error && "statusCode" in error) {
      throw error;
    }
    const message =
      error instanceof Error ? error.message : "Internal server error";
    throw createError(message, 500);
  }
});

// GET - Get prediction by ID
router.get("/:id", async (req: AuthenticatedRequest, res: Response) => {
  try {
    let replicate;
    try {
      replicate = createReplicateClient();
    } catch (configError) {
      const message =
        configError instanceof Error
          ? configError.message
          : "Replicate configuration error";
      throw createError(message, 500);
    }

    const { id } = req.params;

    if (!id) {
      throw createError("Prediction ID is required", 400);
    }

    const prediction: Prediction = await replicate.predictions.get(id);

    if (prediction?.error) {
      throw createError(prediction.error.toString(), 500);
    }

    res.json(prediction);
  } catch (error) {
    if (error instanceof Error && "statusCode" in error) {
      throw error;
    }
    const message =
      error instanceof Error ? error.message : "Internal server error";
    throw createError(message, 500);
  }
});

export default router;
