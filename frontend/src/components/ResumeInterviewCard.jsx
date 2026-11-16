import { DocumentTextIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router";

function ResumeInterviewCard() {
  return (
    <Link
      to="/resume-interview"
      className="card bg-base-100 border-2 border-primary/20 hover:border-primary/40 mb-6 block"
    >
      <div className="card-body flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <DocumentTextIcon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-black">AI Resume Interview</h2>
            <p className="text-sm opacity-60">
              Upload your resume and practice a technical interview based on your skills and projects.
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold">
          <span>Start</span>
          <ArrowRightIcon className="w-5 h-5" />
        </div>
      </div>
    </Link>
  );
}

export default ResumeInterviewCard;
