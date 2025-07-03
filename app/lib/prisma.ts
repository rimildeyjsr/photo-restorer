import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  try {
    if (typeof window === "undefined" && process.env.DATABASE_URL) {
      const { PrismaNeon } = require("@prisma/adapter-neon");
      const adapter = new PrismaNeon({
        connectionString: process.env.DATABASE_URL,
      });

      return new PrismaClient({ adapter } as any);
    }
  } catch (error) {
    console.log("Adapter not available, using regular client");
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
