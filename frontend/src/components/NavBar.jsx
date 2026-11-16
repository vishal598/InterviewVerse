import React from "react";
import { Link, useLocation } from "react-router";
import { BookOpenIcon, DocumentTextIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { UserButton } from "@clerk/clerk-react";

const NavBar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
    <Link to="/" className="group flex">
<span className="text-3xl font-black tracking-wide text-white drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]">
  Interview<span className="text-emerald-400">Verse</span>
</span>
    </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">

          <Link
            to="/resume-interview"
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
              isActive("/resume-interview")
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-emerald-400"
            }`}
          >
            <DocumentTextIcon className="size-5" />
            <span className="hidden sm:block">AI Resume Interview</span>
          </Link>

          <Link
            to="/problems"
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
              isActive("/problems")
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-emerald-400"
            }`}
          >
            <BookOpenIcon className="size-5" />
            <span className="hidden sm:block">Problems</span>
          </Link>

          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
              isActive("/dashboard")
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-emerald-400"
            }`}
          >
            <Squares2X2Icon className="size-5" />
            <span className="hidden sm:block">Dashboard</span>
          </Link>

          <div className="ml-3 border border-white/10 rounded-full p-1 bg-white/5">
            <UserButton />
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;