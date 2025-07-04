import { eq } from "drizzle-orm";
import { db, users } from "@/lib/db";

export async function validateUser(firebaseUid: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.firebaseUid, firebaseUid))
    .limit(1);

  if (user.length === 0) {
    throw new Error("User not found");
  }

  return user[0];
}
