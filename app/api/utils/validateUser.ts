import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function validateUser(firebaseUid: string) {
  const user = await prisma.user.findUnique({
    where: { firebaseUid },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
