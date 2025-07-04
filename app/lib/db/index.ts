import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Simple and reliable Cloudflare Workers detection
function isCloudflareEnvironment(): boolean {
  // Cloudflare Workers has these globals, Node.js doesn't
  return (
    typeof caches !== "undefined" &&
    typeof Request !== "undefined" &&
    typeof process.versions === "undefined"
  );
}

// Create database connection based on environment
function createDatabaseConnection() {
  if (isCloudflareEnvironment()) {
    console.log("🌐 Using Neon HTTP driver for Cloudflare Workers");
    // Cloudflare Workers - HTTP driver
    const { drizzle } = require("drizzle-orm/neon-http");
    const { neon } = require("@neondatabase/serverless");

    // Use direct connection (port 5432) for Neon driver
    const sql = neon(process.env.DATABASE_URL);
    return drizzle(sql, { schema });
  } else {
    console.log("💻 Using postgres-js driver for local development");
    // Local development - postgres-js driver
    const { drizzle } = require("drizzle-orm/postgres-js");
    const postgres = require("postgres");

    // Use pooled connection (port 6543) for postgres-js driver
    const client = postgres(process.env.DATABASE_URL, { prepare: false });
    return drizzle(client, { schema });
  }
}

export const db = createDatabaseConnection();
export * from "./schema";
