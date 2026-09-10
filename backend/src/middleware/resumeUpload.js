import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const isPdf =
      file.mimetype === "application/pdf" ||
      file.originalname.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      cb(new Error("PDF_ONLY"));
      return;
    }
    cb(null, true);
  },
});

export function uploadResumePdf(req, res, next) {
  upload.single("resume")(req, res, (error) => {
    if (!error) return next();
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "Resume PDF must be 5MB or smaller." });
      }
      return res.status(400).json({ message: "Please upload a valid PDF resume." });
    }
    if (error.message === "PDF_ONLY") {
      return res.status(400).json({ message: "Please upload a valid PDF resume." });
    }
    return res.status(400).json({ message: "Resume upload failed." });
  });
}
