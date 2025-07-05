import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// For Railway, environment variables are injected at runtime
// So we can safely check here in production
if (!process.env.DATABASE_URL && process.env.NODE_ENV !== "development") {
  console.error("⚠️ DATABASE_URL not found in production environment");
}

// Only throw in development if we're sure dotenv should have loaded
if (!process.env.DATABASE_URL && process.env.NODE_ENV === "development") {
  throw new Error("DATABASE_URL environment variable is required");
}

console.log("💻 Using postgres-js driver for Express backend");

// Create connection with fallback for build time
const connectionString = process.env.DATABASE_URL || "postgresql://placeholder";

const client = postgres(connectionString, {
  prepare: false,
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(client, { schema });
export * from "./schema";
