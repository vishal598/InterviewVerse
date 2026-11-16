import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export class PdfExtractError extends Error {
  constructor(message) {
    super(message);
    this.name = "PdfExtractError";
    this.statusCode = 400;
  }
}

function isPdfjsFontWarning(value) {
  return typeof value === "string" && value.includes("TT: undefined function");
}

export async function extractResumeText(buffer) {
  if (!buffer || !buffer.length) {
    throw new PdfExtractError("The uploaded PDF is empty.");
  }

  const originalLog = console.log;
  const originalWarn = console.warn;
  console.log = (...args) => {
    if (isPdfjsFontWarning(args[0])) return;
    originalLog.apply(console, args);
  };
  console.warn = (...args) => {
    if (isPdfjsFontWarning(args[0])) return;
    originalWarn.apply(console, args);
  };

  let data;
  try {
    data = await pdfParse(buffer);
  } catch {
    throw new PdfExtractError("Unable to read this PDF. Please upload a valid resume PDF.");
  } finally {
    console.log = originalLog;
    console.warn = originalWarn;
  }

  const text = String(data?.text || "").replace(/\u0000/g, " ").trim();
  if (!text) {
    throw new PdfExtractError("No readable text was found in this resume.");
  }

  return text.slice(0, 20000);
}

