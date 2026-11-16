import React from "react";
import NavBar from "../components/NavBar";
import { PROBLEMS } from "../data/problems";
import { Link } from "react-router";
import { CodeBracketIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import gDB from "../lib/util";

const ProblemPage = () => {
  const problems = Object.values(PROBLEMS);

  const easyprob = problems.filter((p) => p.difficulty === "Easy").length;
  const medprob = problems.filter((p) => p.difficulty === "Medium").length;
  const hardprob = problems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="min-h-screen bg-[#09090B] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-indigo-600/20 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[150px]"></div>

      <NavBar />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-black bg-gradient-to-r from-white via-emerald-300 to-cyan-400 bg-clip-text text-transparent mb-3">
            Practice Problems
          </h1>

          <p className="text-gray-400 text-lg">
            Sharpen your coding skills with curated DSA problems and improve
            your interview preparation.
          </p>
        </div>

        {/* Problems */}
        <div className="space-y-6">
          {problems.map((prob) => (
            <Link
              key={prob.id}
              to={`/problem/${prob.id}`}
              className="group block rounded-3xl bg-[#111114]/90 border border-white/10 hover:border-emerald-400 hover:scale-[1.02] transition-all duration-300 shadow-xl"
            >
              <div className="p-7">
                <div className="flex items-center justify-between gap-6">
                  {/* Left */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="size-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CodeBracketIcon className="size-8" />
                      </div>

                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-bold group-hover:text-emerald-400 transition">
                            {prob.title}
                          </h2>

                          <span className={`badge ${gDB(prob.difficulty)}`}>
                            {prob.difficulty}
                          </span>
                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                          {prob.category}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-400 leading-7">
                      {prob.description.text}
                    </p>
                  </div>

                  {/* Right */}
                  <div className="hidden md:flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-500 text-white font-semibold group-hover:bg-emerald-400 transition">
                    <span>Solve</span>
                    <ChevronRightIcon className="size-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-14 rounded-3xl bg-[#111114]/90 border border-white/10 shadow-2xl">
          <div className="p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-2xl bg-black/20 border border-white/10 p-6 text-center hover:border-emerald-400 transition">
                <div className="text-gray-500 text-sm uppercase tracking-wider">
                  Total Problems
                </div>

                <div className="text-4xl font-bold text-emerald-400 mt-2">
                  {problems.length}
                </div>
              </div>

              <div className="rounded-2xl bg-black/20 border border-white/10 p-6 text-center hover:border-green-400 transition">
                <div className="text-gray-500 text-sm uppercase tracking-wider">
                  Easy
                </div>

                <div className="text-4xl font-bold text-green-400 mt-2">
                  {easyprob}
                </div>
              </div>

              <div className="rounded-2xl bg-black/20 border border-white/10 p-6 text-center hover:border-yellow-400 transition">
                <div className="text-gray-500 text-sm uppercase tracking-wider">
                  Medium
                </div>

                <div className="text-4xl font-bold text-yellow-400 mt-2">
                  {medprob}
                </div>
              </div>

              <div className="rounded-2xl bg-black/20 border border-white/10 p-6 text-center hover:border-red-400 transition">
                <div className="text-gray-500 text-sm uppercase tracking-wider">
                  Hard
                </div>

                <div className="text-4xl font-bold text-red-400 mt-2">
                  {hardprob}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;