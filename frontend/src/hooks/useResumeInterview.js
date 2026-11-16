import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { resumeInterviewApi } from "../api/resumeInterview";

export const useAnalyzeResume = () => {
  return useMutation({
    mutationKey: ["analyzeResume"],
    mutationFn: (file) => resumeInterviewApi.analyzeResume(file),
    onSuccess: () => toast.success("Resume analyzed successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to analyze resume"),
  });
};

export const useGenerateQuestions = () => {
  return useMutation({
    mutationKey: ["generateResumeQuestions"],
    mutationFn: (interviewId) => resumeInterviewApi.generateQuestions(interviewId),
    onSuccess: () => toast.success("Interview questions generated!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to generate questions"),
  });
};

export const useEvaluateAnswer = () => {
  return useMutation({
    mutationKey: ["evaluateResumeAnswer"],
    mutationFn: resumeInterviewApi.evaluateAnswer,
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to evaluate answer"),
  });
};

export const useResumeInterviewById = (id) => {
  return useQuery({
    queryKey: ["resumeInterview", id],
    queryFn: () => resumeInterviewApi.getInterviewById(id),
    enabled: !!id,
  });
};
