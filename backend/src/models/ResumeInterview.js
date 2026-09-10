import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema(
  {
    score: { type: Number, min: 0, max: 10 },
    correctness: { type: String, default: "" },
    strengths: { type: [String], default: [] },
    missingPoints: { type: [String], default: [] },
    feedback: { type: String, default: "" },
    idealAnswer: { type: String, default: "" },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    skill: { type: String, default: "" },
    category: { type: String, default: "Technical" },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    answer: { type: String, default: "" },
    evaluation: { type: evaluationSchema, default: null },
  },
  { _id: false }
);

const resumeInterviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    fileName: { type: String, default: "" },
    resumeText: { type: String, default: "" },
    analysis: {
      programmingLanguages: { type: [String], default: [] },
      frameworks: { type: [String], default: [] },
      libraries: { type: [String], default: [] },
      databases: { type: [String], default: [] },
      technologies: { type: [String], default: [] },
      projects: { type: [String], default: [] },
      education: { type: [String], default: [] },
      experience: { type: [String], default: [] },
      technicalSkills: { type: [String], default: [] },
    },
    questions: { type: [questionSchema], default: [] },
    status: {
      type: String,
      enum: ["analyzed", "in_progress", "completed"],
      default: "analyzed",
    },
  },
  { timestamps: true }
);

const ResumeInterview = mongoose.model("ResumeInterview", resumeInterviewSchema);

export default ResumeInterview;
