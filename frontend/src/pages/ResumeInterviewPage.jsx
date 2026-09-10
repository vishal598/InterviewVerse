import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowPathIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/24/solid";
import NavBar from "../components/NavBar";
import gDB from "../lib/util";
import {
  useAnalyzeResume,
  useEvaluateAnswer,
  useGenerateQuestions,
  useResumeInterviewById,
} from "../hooks/useResumeInterview";
import {
  clearActiveResumeInterviewId,
  getActiveResumeInterviewId,
  setActiveResumeInterviewId,
} from "../lib/activeInterview";

const ResumeInterviewPage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [interview, setInterview] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const savedInterviewId = getActiveResumeInterviewId();

  const analyzeMutation = useAnalyzeResume();
  const generateMutation = useGenerateQuestions();
  const evaluateMutation = useEvaluateAnswer();
  const { data: savedInterviewData, isLoading: loadingSavedInterview } = useResumeInterviewById(
    interview ? null : savedInterviewId
  );

  const questions = interview?.questions || [];
  const currentQuestion = questions[questionIndex];
  const evaluation = currentQuestion?.evaluation;
  const isComplete =
    questions.length > 0 && questions.every((item) => item.evaluation);

  useEffect(() => {
    const restored = savedInterviewData?.interview;
    if (!restored || interview) return;
    setInterview(restored);
    const restoredQuestions = restored.questions || [];
    const nextUnanswered = restoredQuestions.findIndex((item) => !item.evaluation);
    const index =
      nextUnanswered === -1
        ? Math.max(0, restoredQuestions.length - 1)
        : nextUnanswered;
    setQuestionIndex(index);
    setAnswer(restoredQuestions[index]?.answer || "");
  }, [savedInterviewData, interview]);

  const averageScore = useMemo(() => {
    const scored = questions.filter((item) => item.evaluation);
    if (!scored.length) return null;
    const total = scored.reduce((sum, item) => sum + Number(item.evaluation.score || 0), 0);
    return (total / scored.length).toFixed(1);
  }, [questions]);

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setInterview(null);
    setQuestionIndex(0);
    setAnswer("");
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    analyzeMutation.mutate(selectedFile, {
      onSuccess: (data) => {
        setActiveResumeInterviewId(data.interview._id);
        setInterview(data.interview);
        setQuestionIndex(0);
        setAnswer("");
      },
    });
  };

  const handleGenerate = () => {
    if (!interview?._id) return;
    generateMutation.mutate(interview._id, {
      onSuccess: (data) => {
        setActiveResumeInterviewId(data.interview._id);
        setInterview(data.interview);
        setQuestionIndex(0);
        setAnswer("");
      },
    });
  };

  const handleSubmitAnswer = () => {
    if (!interview?._id || !answer.trim()) return;
    evaluateMutation.mutate(
      {
        interviewId: interview._id,
        questionIndex,
        answer,
      },
      {
        onSuccess: (data) => {
          setInterview(data.interview);
        },
      }
    );
  };

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((index) => index + 1);
      setAnswer(questions[questionIndex + 1]?.answer || "");
    }
  };

  const handleLeaveInterview = () => {
    if (!confirm("Are you sure you want to leave the interview?")) return;
    clearActiveResumeInterviewId();
    navigate("/dashboard");
  };

  const analysisEntries = interview
    ? [
        ["Programming languages", interview.analysis.programmingLanguages],
        ["Frameworks", interview.analysis.frameworks],
        ["Libraries", interview.analysis.libraries],
        ["Databases", interview.analysis.databases],
        ["Technologies", interview.analysis.technologies],
        ["Projects", interview.analysis.projects],
        ["Education", interview.analysis.education],
        ["Experience", interview.analysis.experience],
        ["Technical skills", interview.analysis.technicalSkills],
      ]
    : [];

  const busy =
    analyzeMutation.isPending ||
    generateMutation.isPending ||
    evaluateMutation.isPending;

  return (
    <div className="min-h-screen bg-base-300">
      <NavBar />
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-3">
            AI Resume Interview
          </h1>
          <p className="text-xl text-base-content/60">
            Upload your resume, practice questions based on your skills, and get Gemini feedback.
          </p>
        </div>

        {loadingSavedInterview && (
          <div className="flex items-center gap-2 mb-6 text-primary">
            <ArrowPathIcon className="size-5 animate-spin" />
            Restoring your interview...
          </div>
        )}

        {interview && (
          <button
            className="btn btn-warning mb-6 w-fit"
            onClick={handleLeaveInterview}
          >
            Leave Interview
          </button>
        )}

        <div className="card bg-base-100 border-2 border-primary/20 mb-6">
          <div className="card-body">
            <h2 className="text-2xl font-black mb-2">Upload Resume</h2>
            <p className="opacity-60 mb-4">PDF only, up to 5MB.</p>
            <input
              type="file"
              accept="application/pdf"
              className="file-input file-input-bordered w-full max-w-xl"
              onChange={handleUpload}
              disabled={busy}
            />
            {selectedFile && (
              <p className="mt-3 text-sm opacity-70">{selectedFile.name}</p>
            )}
            <button
              className="btn btn-primary mt-4 w-fit gap-2"
              onClick={handleAnalyze}
              disabled={!selectedFile || busy}
            >
              {analyzeMutation.isPending ? (
                <ArrowPathIcon className="size-5 animate-spin" />
              ) : (
                <DocumentArrowUpIcon className="size-5" />
              )}
              {analyzeMutation.isPending ? "Analyzing..." : "Analyze Resume"}
            </button>
            {analyzeMutation.isError && (
              <div className="alert alert-error mt-4">
                {analyzeMutation.error.response?.data?.message || "Failed to analyze resume"}
              </div>
            )}
          </div>
        </div>

        {interview && (
          <div className="card bg-base-100 border-2 border-secondary/20 mb-6">
            <div className="card-body">
              <h2 className="text-2xl font-black mb-4">Resume Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysisEntries.map(([label, values]) => (
                  <div key={label} className="rounded-2xl bg-base-200 p-4">
                    <div className="font-semibold mb-2">{label}</div>
                    {values?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {values.map((item) => (
                          <span key={`${label}-${item}`} className="badge badge-outline">
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm opacity-50">Not found</p>
                    )}
                  </div>
                ))}
              </div>
              <button
                className="btn btn-secondary mt-6 w-fit gap-2"
                onClick={handleGenerate}
                disabled={busy}
              >
                {generateMutation.isPending ? (
                  <ArrowPathIcon className="size-5 animate-spin" />
                ) : (
                  <ArrowRightIcon className="size-5" />
                )}
                {generateMutation.isPending ? "Generating..." : "Generate Questions"}
              </button>
              {generateMutation.isError && (
                <div className="alert alert-error mt-4">
                  {generateMutation.error.response?.data?.message || "Failed to generate questions"}
                </div>
              )}
            </div>
          </div>
        )}

        {currentQuestion && (
          <div className="card bg-base-100 border-2 border-primary/20 mb-6">
            <div className="card-body">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="badge badge-primary">
                  Question {questionIndex + 1} / {questions.length}
                </span>
                <span className="badge badge-outline">{currentQuestion.skill}</span>
                <span className={`badge ${gDB(currentQuestion.difficulty)}`}>
                  {currentQuestion.difficulty}
                </span>
                <span className="badge badge-ghost">{currentQuestion.category}</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">{currentQuestion.question}</h2>
              <textarea
                className="textarea textarea-bordered w-full min-h-40"
                placeholder="Type your answer..."
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                disabled={busy || Boolean(evaluation)}
              />
              {!evaluation && (
                <button
                  className="btn btn-primary mt-4 w-fit gap-2"
                  onClick={handleSubmitAnswer}
                  disabled={!answer.trim() || busy}
                >
                  {evaluateMutation.isPending ? (
                    <ArrowPathIcon className="size-5 animate-spin" />
                  ) : (
                    <CheckCircleIcon className="size-5" />
                  )}
                  {evaluateMutation.isPending ? "Evaluating..." : "Submit Answer"}
                </button>
              )}

              {evaluateMutation.isError && (
                <div className="alert alert-error mt-4">
                  {evaluateMutation.error.response?.data?.message || "Failed to evaluate answer"}
                </div>
              )}

              {evaluateMutation.isPending && (
                <div className="flex items-center gap-2 mt-4 text-primary">
                  <ArrowPathIcon className="size-5 animate-spin" />
                  Gemini is evaluating your answer...
                </div>
              )}

              {evaluation && (
                <div className="mt-6 space-y-4">
                  <div className="alert">
                    <span className="font-black text-2xl">Score: {evaluation.score}/10</span>
                    <span className="badge badge-lg">{evaluation.correctness}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-base-200 p-4">
                      <h3 className="font-bold mb-2">Strengths</h3>
                      {evaluation.strengths?.length ? (
                        <ul className="list-disc ml-5 space-y-1">
                          {evaluation.strengths.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="opacity-60">None listed</p>
                      )}
                    </div>
                    <div className="rounded-2xl bg-base-200 p-4">
                      <h3 className="font-bold mb-2">Missing points</h3>
                      {evaluation.missingPoints?.length ? (
                        <ul className="list-disc ml-5 space-y-1">
                          {evaluation.missingPoints.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="opacity-60">None listed</p>
                      )}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-base-200 p-4">
                    <h3 className="font-bold mb-2">Feedback</h3>
                    <p>{evaluation.feedback}</p>
                  </div>
                  <div className="rounded-2xl bg-base-200 p-4">
                    <h3 className="font-bold mb-2">Ideal answer</h3>
                    <p>{evaluation.idealAnswer}</p>
                  </div>
                  {questionIndex < questions.length - 1 ? (
                    <button className="btn btn-secondary w-fit gap-2" onClick={handleNext}>
                      Next Question
                      <ArrowRightIcon className="size-5" />
                    </button>
                  ) : (
                    <div className="alert alert-success">
                      <span>Interview complete. Average score: {averageScore}/10</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {isComplete && questionIndex === questions.length - 1 && evaluation && (
          <div className="card bg-base-100 border-2 border-success/30">
            <div className="card-body">
              <h2 className="text-2xl font-black">Interview summary</h2>
              <p className="opacity-70">Average score: {averageScore}/10</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeInterviewPage;
