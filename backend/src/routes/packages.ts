import { Router, Request, Response } from "express";
import { PACKAGES } from "@/utils";
import { createError } from "@/middleware/errorHandler";

const router = Router();

// GET - Fetch all packages
router.get("/", async (req: Request, res: Response) => {
  try {
    res.json({ packages: PACKAGES });
  } catch (error) {
    throw createError("Failed to fetch packages", 500);
  }
});

export default router;
