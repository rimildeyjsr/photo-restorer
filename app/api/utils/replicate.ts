import Replicate from "replicate";

export function createReplicateClient(): Replicate {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error("REPLICATE_API_TOKEN environment variable is not set");
  }

  return new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });
}

export function getWebhookHost(): string | null {
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NGROK_HOST || null;
}
