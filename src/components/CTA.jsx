import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">

        <div className="relative overflow-hidden rounded-[32px] bg-slate-950 px-8 py-20 text-center text-white md:px-16">

          {/* Background Glow */}
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="relative z-10">

            {/* Badge */}
            <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300">
              ✨ AI-Powered Resume Optimization
            </div>

            {/* Heading */}
            <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              Ready to Land More
              <span className="text-indigo-400">
                {" "}Interviews?
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
              Analyze your resume, improve ATS compatibility,
              discover missing keywords, and increase your chances
              of getting noticed by recruiters.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

              <Button
                size="lg"
                className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700"
              >
                Start Free Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="
                  h-12
                  px-8
                  border-slate-700
                  bg-transparent
                  text-white
                  hover:bg-slate-900
                "
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>

            </div>

            {/* Trust Text */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">

              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                No Credit Card Required
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Free 3 Analyses Monthly
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Instant AI Feedback
              </div>

            </div>

            {/* Stats */}
            <div className="mt-14 grid gap-8 border-t border-slate-800 pt-10 md:grid-cols-3">

              <div>
                <div className="text-4xl font-bold text-white">
                  50K+
                </div>
                <p className="mt-2 text-slate-400">
                  Resumes Analyzed
                </p>
              </div>

              <div>
                <div className="text-4xl font-bold text-white">
                  92%
                </div>
                <p className="mt-2 text-slate-400">
                  Average ATS Score Increase
                </p>
              </div>

              <div>
                <div className="text-4xl font-bold text-white">
                  10K+
                </div>
                <p className="mt-2 text-slate-400">
                  Successful Job Seekers
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}