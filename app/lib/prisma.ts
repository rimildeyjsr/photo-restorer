import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  try {
    if (typeof window === "undefined" && process.env.DATABASE_URL) {
      // Try to use the pg adapter
      const { PrismaPg } = require("@prisma/adapter-pg");
      const { Pool } = require("pg");

      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      });

      const adapter = new PrismaPg(pool);
      return new PrismaClient({ adapter } as any);
    }
  } catch (error) {
    console.log("Adapter not available, using regular client:", error);
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
