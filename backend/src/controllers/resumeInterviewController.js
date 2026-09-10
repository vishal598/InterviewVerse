import ResumeInterview from "../models/ResumeInterview.js";
import { extractResumeText, PdfExtractError } from "../lib/extractPdf.js";
import {
  analyzeResumeWithGemini,
  evaluateAnswerWithGemini,
  generateQuestionsWithGemini,
  GeminiConfigError,
  GeminiRequestError,
} from "../lib/gemini.js";

function publicInterview(interview) {
  return {
    _id: interview._id,
    fileName: interview.fileName,
    analysis: interview.analysis,
    questions: interview.questions,
    status: interview.status,
    createdAt: interview.createdAt,
    updatedAt: interview.updatedAt,
  };
}

function handleAiError(res, error) {
  if (error instanceof GeminiConfigError || error instanceof GeminiRequestError || error instanceof PdfExtractError) {
    return res.status(error.statusCode || 400).json({ message: error.message });
  }
  console.log("error in resume interview", error.message);
  return res.status(500).json({ message: "Internal Server Error" });
}

async function findOwnedInterview(req, interviewId) {
  if (!interviewId) return null;
  return ResumeInterview.findOne({ _id: interviewId, user: req.user._id });
}

export async function analyzeResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a PDF resume." });
    }

    const resumeText = await extractResumeText(req.file.buffer);
    const analysis = await analyzeResumeWithGemini(resumeText);

    const hasSkills = [
      ...analysis.programmingLanguages,
      ...analysis.frameworks,
      ...analysis.libraries,
      ...analysis.databases,
      ...analysis.technologies,
      ...analysis.technicalSkills,
    ].length;

    if (!hasSkills) {
      return res.status(400).json({
        message: "No technical skills were found in this resume. Please upload a technical resume.",
      });
    }

    const interview = await ResumeInterview.create({
      user: req.user._id,
      fileName: req.file.originalname,
      resumeText,
      analysis,
      questions: [],
      status: "analyzed",
    });

    return res.status(201).json({ interview: publicInterview(interview) });
  } catch (error) {
    return handleAiError(res, error);
  }
}

export async function generateQuestions(req, res) {
  try {
    const { interviewId } = req.body;
    const interview = await findOwnedInterview(req, interviewId);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found." });
    }

    const questions = await generateQuestionsWithGemini(
      interview.resumeText,
      interview.analysis
    );

    interview.questions = questions;
    interview.status = "in_progress";
    await interview.save();

    return res.status(200).json({ interview: publicInterview(interview) });
  } catch (error) {
    return handleAiError(res, error);
  }
}

export async function evaluateAnswer(req, res) {
  try {
    const { interviewId, questionIndex, answer } = req.body;
    const interview = await findOwnedInterview(req, interviewId);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found." });
    }

    const index = Number(questionIndex);
    if (!Number.isInteger(index) || index < 0 || index >= interview.questions.length) {
      return res.status(400).json({ message: "Invalid question." });
    }

    const candidateAnswer = String(answer || "").trim();
    if (!candidateAnswer) {
      return res.status(400).json({ message: "Please provide an answer." });
    }

    const current = interview.questions[index];
    const resumeContext = JSON.stringify({
      skill: current.skill,
      projects: interview.analysis.projects,
      experience: interview.analysis.experience,
      technicalSkills: interview.analysis.technicalSkills,
    });

    const evaluation = await evaluateAnswerWithGemini({
      question: current.question,
      answer: candidateAnswer,
      skill: current.skill,
      resumeContext,
    });

    interview.questions[index].answer = candidateAnswer;
    interview.questions[index].evaluation = evaluation;

    const allAnswered = interview.questions.every((item) => item.evaluation);
    if (allAnswered) {
      interview.status = "completed";
    }

    await interview.save();

    return res.status(200).json({
      evaluation,
      interview: publicInterview(interview),
    });
  } catch (error) {
    return handleAiError(res, error);
  }
}

export async function getInterviewById(req, res) {
  try {
    const interview = await findOwnedInterview(req, req.params.id);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found." });
    }
    return res.status(200).json({ interview: publicInterview(interview) });
  } catch (error) {
    return handleAiError(res, error);
  }
}
