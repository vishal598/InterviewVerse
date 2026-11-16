const ACTIVE_SESSION_KEY = "activeSessionId";
const LEFT_SESSIONS_KEY = "leftSessionIds";
const ACTIVE_RESUME_INTERVIEW_KEY = "activeResumeInterviewId";

export function getActiveSessionId() {
  return sessionStorage.getItem(ACTIVE_SESSION_KEY);
}

export function setActiveSessionId(id) {
  if (!id) return;
  sessionStorage.setItem(ACTIVE_SESSION_KEY, id);
}

export function clearActiveSessionId(id) {
  const current = sessionStorage.getItem(ACTIVE_SESSION_KEY);
  if (!id || current === id) {
    sessionStorage.removeItem(ACTIVE_SESSION_KEY);
  }
}

export function markSessionLeft(id) {
  if (!id) return;
  const left = JSON.parse(sessionStorage.getItem(LEFT_SESSIONS_KEY) || "[]");
  if (!left.includes(id)) {
    left.push(id);
    sessionStorage.setItem(LEFT_SESSIONS_KEY, JSON.stringify(left));
  }
  clearActiveSessionId(id);
}

export function hasLeftSession(id) {
  if (!id) return false;
  const left = JSON.parse(sessionStorage.getItem(LEFT_SESSIONS_KEY) || "[]");
  return left.includes(id);
}

export function getSessionCode(sessionId, problem, language) {
  if (!sessionId || !problem || !language) return null;
  return sessionStorage.getItem(`sessionCode:${sessionId}:${problem}:${language}`);
}

export function setSessionCode(sessionId, problem, language, code) {
  if (!sessionId || !problem || !language) return;
  sessionStorage.setItem(`sessionCode:${sessionId}:${problem}:${language}`, code ?? "");
}

export function getActiveResumeInterviewId() {
  return sessionStorage.getItem(ACTIVE_RESUME_INTERVIEW_KEY);
}

export function setActiveResumeInterviewId(id) {
  if (!id) return;
  sessionStorage.setItem(ACTIVE_RESUME_INTERVIEW_KEY, id);
}

export function clearActiveResumeInterviewId() {
  sessionStorage.removeItem(ACTIVE_RESUME_INTERVIEW_KEY);
}
