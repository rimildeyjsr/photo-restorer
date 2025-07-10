import dotenv from "dotenv";
import express from "express";
dotenv.config();

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { initializeFirebaseAdmin } from "@/config/firebase";
import { errorHandler, notFoundHandler } from "@/middleware/errorHandler";

import usersRouter from "@/routes/users";
import creditsRouter from "@/routes/credits";
import packagesRouter from "@/routes/packages";
import predictionsRouter from "@/routes/predictions";
import webhooksRouter from "@/routes/webhooks";

const app = express();
const PORT = process.env.PORT || 8000;

initializeFirebaseAdmin();

app.use(helmet());
app.use(morgan("combined"));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://photo-restorer-rimildeyjsrs-projects.vercel.app",
      process.env.FRONTEND_URL,
    ].filter((url): url is string => Boolean(url)),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api/users", usersRouter);
app.use("/api/credits", creditsRouter);
app.use("/api/packages", packagesRouter);
app.use("/api/predictions", predictionsRouter);
app.use("/api/webhooks", webhooksRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});
