import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import React from "react";
import toast from "react-hot-toast";

const HomePage = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-[#09090B] text-white relative flex flex-col">
      
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-indigo-600/20 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[150px]"></div>

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-xl border-b border-white/10 z-20">
        <div className="navbar px-8">
          <div className="flex-1">
            <a className="text-3xl font-extrabold text-emerald-400 tracking-wide">
              InterviewVerse
            </a>
          </div>

          <div className="flex-none">
            {/* Clerk Login Button */}
            <SignInButton mode="modal">
              <button className="px-7 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 transition text-white font-semibold">
                Login
              </button>
            </SignInButton>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="flex flex-col md:flex-row items-center justify-between px-12 flex-1 pt-28 relative z-10">

        {/* Left */}
        <div className="md:w-3/4 space-y-7">

          <div className="inline-block px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm">
            ⚡ AI Powered Coding Platform
          </div>

          <h1 className="text-7xl font-black leading-tight bg-gradient-to-r from-white via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
            Code Smarter,
            <br />
            Learn Faster
          </h1>

          <p className="text-gray-300 text-xl max-w-3xl">
            Practice AI-generated resume-based interviews, solve coding
            challenges together and experience real interview simulations.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5">🤖 AI Interview</div>
            <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5">💻 Live Coding</div>
            <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5">🎥 Video Calls</div>
            <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5">📄 Resume Analysis</div>
          </div>

          {/* Buttons */}
          <div className="flex gap-5 pt-4">
            {/* Start Practicing Button */}
            <SignedIn>
              <button
                onClick={() => {
                  toast.success("Redirecting to practice...");
                  window.location.href = "/practice";
                }}
                className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 transition hover:scale-105 font-semibold"
              >
                Start Practicing →
              </button>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 transition hover:scale-105 font-semibold">
                  Start Practicing →
                </button>
              </SignInButton>
            </SignedOut>

            <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-12 pt-6">
            <div>
              <h2 className="text-4xl font-bold text-emerald-400">10K+</h2>
              <p className="text-gray-500">Users</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-cyan-400">50K+</h2>
              <p className="text-gray-500">Sessions</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-violet-400">99.9%</h2>
              <p className="text-gray-500">Accuracy</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 bg-[#111114] p-6 shadow-2xl shadow-indigo-500/20 hover:scale-105 transition duration-500">
          <img
            src="/project1.png"
            alt="Coding Illustration"
            className="w-full h-[650px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
