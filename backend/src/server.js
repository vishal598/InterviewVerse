import express from "express";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";
import { inngest, functions } from "./lib/inngest.js";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";

import { protectRoute } from "./middleware/protectRoute.js";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
import resumeInterviewRoutes from "./routes/resumeInterviewRoutes.js";

const app = express();

app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/resume-interview", resumeInterviewRoutes);

app.get("/video-calls", protectRoute, (req, res) => {
  res.status(200).json({ msg: "this is the video endpoint" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "success from backend :)" });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`server is running at http://localhost:${ENV.PORT}`);
    });
  } catch (error) {
    console.error("Error Starting the server", error);
  }
};

startServer();