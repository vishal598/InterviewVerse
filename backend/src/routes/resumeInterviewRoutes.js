import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { uploadResumePdf } from "../middleware/resumeUpload.js";
import {
  analyzeResume,
  evaluateAnswer,
  generateQuestions,
  getInterviewById,
} from "../controllers/resumeInterviewController.js";

const router = express.Router();

router.post("/analyze-resume", protectRoute, uploadResumePdf, analyzeResume);
router.post("/generate-questions", protectRoute, generateQuestions);
router.post("/evaluate-answer", protectRoute, evaluateAnswer);
router.get("/:id", protectRoute, getInterviewById);

export default router;
