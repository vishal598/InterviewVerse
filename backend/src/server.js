import express from "express";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";
import { inngest, functions } from "./lib/inngest.js";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";//

import { protectRoute } from "./middleware/protectRoute.js";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
import resumeInterviewRoutes from "./routes/resumeInterviewRoutes.js";

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Allow cookies + CORS for React dev server (5173)
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(clerkMiddleware()); // middleware ko use karo

// API routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/resume-interview", resumeInterviewRoutes);

// Protected route example
app.get("/video-calls", protectRoute, (req, res) => {
  res.status(200).json({ msg: "this is the video endpoint" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "success from backend :)" });
});
// Serve React build in production
if (ENV.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});
}

// Start server after DB connection
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
