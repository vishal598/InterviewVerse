import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/sessions";

// Create Session
export const useCreateSession = () => {
  return useMutation({
    mutationKey: ["createSession"],
    mutationFn: (data) => sessionApi.createSession(data),
    onSuccess: () => toast.success("Session created successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to create room"),
  });
};

// Active Sessions
export const useActiveSessions = () => {
  return useQuery({
    queryKey: ["activeSessions"],
    queryFn: () => sessionApi.getActiveSessions(),
  });
};

// My Recent Sessions
export const useMyRecentSessions = () => {
  return useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: () => sessionApi.getMyRecentSessions(),
  });
};

// Session by ID
export const useSessionById = (id, options = {}) => {
  return useQuery({
    queryKey: ["Session", id],
    queryFn: () => sessionApi.getSessionById(id),
    enabled: !!id,
    refetchInterval: options.refetchInterval,
  });
};

// Join Session
export const useJoinSession = () => {
  return useMutation({
    mutationKey: ["joinSession"],
    mutationFn:sessionApi.joinSession,
    onSuccess: () => toast.success("Session joined successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "This interview session is full."),
  });
};

// Update session problem
export const useUpdateSessionProblem = () => {
  return useMutation({
    mutationKey: ["updateSessionProblem"],
    mutationFn: ({ id, data }) => sessionApi.updateSessionProblem(id, data),
    onSuccess: () => toast.success("Question updated"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to change question"),
  });
};

// End Session
export const useEndSession = () => {
  return useMutation({
    mutationKey: ["endSession"],
    mutationFn:sessionApi.endSession,
    onSuccess: () => toast.success("Session ended successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to end session"),
  });
};

// Leave Session
export const useLeaveSession = () => {
  return useMutation({
    mutationKey: ["leaveSession"],
    mutationFn: sessionApi.leaveSession,
    onSuccess: () => toast.success("Left session successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to leave session"),
  });
};