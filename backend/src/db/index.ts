import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Lazy initialization - only create connection when first accessed
let dbInstance: any = null;

function createDatabaseConnection() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is required");
  }

  console.log("💻 Using postgres-js driver for Express backend");

  const client = postgres(process.env.DATABASE_URL, {
    prepare: false,
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });

  return drizzle(client, { schema });
}

export const db = new Proxy(
  {},
  {
    get(target, prop) {
      if (!dbInstance) {
        dbInstance = createDatabaseConnection();
      }
      return dbInstance[prop];
    },
  },
);

export * from "./schema";
