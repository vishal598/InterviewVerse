import axiosInstance from "../lib/axios";

export const resumeInterviewApi = {
  analyzeResume: async (file) => {
    const formData = new FormData();
    formData.append("resume", file);
    const response = await axiosInstance.post(
      "/resume-interview/analyze-resume",
      formData
    );
    return response.data;
  },
  generateQuestions: async (interviewId) => {
    const response = await axiosInstance.post(
      "/resume-interview/generate-questions",
      { interviewId }
    );
    return response.data;
  },
  evaluateAnswer: async ({ interviewId, questionIndex, answer }) => {
    const response = await axiosInstance.post(
      "/resume-interview/evaluate-answer",
      { interviewId, questionIndex, answer }
    );
    return response.data;
  },
  getInterviewById: async (id) => {
    const response = await axiosInstance.get(`/resume-interview/${id}`);
    return response.data;
  },
};
