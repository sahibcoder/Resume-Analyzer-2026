// app/dashboard/page.tsx

import {
  Bell,
  FileText,
  Upload,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Content */}
      <div className="p-6">
        {/* Hero Section */}
        <div className="mb-8 rounded-3xl bg-linear-to-r from-indigo-600 to-violet-600 p-8 text-white shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold">
                Improve Your Resume with AI 🚀
              </h2>

              <p className="max-w-2xl text-indigo-100">
                Upload your resume and get ATS score, keyword analysis,
                formatting suggestions, and personalized improvements instantly.
              </p>
            </div>

            <Link href="/user/upload-resume">
              <Button className="h-12 rounded-xl bg-white px-6 text-indigo-700 hover:bg-slate-100 cursor-pointer">
                <Upload className="mr-2 h-5 w-5" />
                Upload Resume
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Card className="rounded-3xl border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">ATS Score</p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-800">
                    82%
                  </h3>
                </div>

                <div className="rounded-2xl bg-indigo-100 p-3">
                  <TrendingUp className="h-6 w-6 text-indigo-600" />
                </div>
              </div>

              <Progress value={82} className="mt-4" />
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Uploaded Resumes</p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-800">12</h3>
                </div>

                <div className="rounded-2xl bg-emerald-100 p-3">
                  <FileText className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Matched Jobs</p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-800">24</h3>
                </div>

                <div className="rounded-2xl bg-orange-100 p-3">
                  <Briefcase className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Improve Suggestions</p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-800">18</h3>
                </div>

                <div className="rounded-2xl bg-pink-100 p-3">
                  <Sparkles className="h-6 w-6 text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Grid */}
        <div className="mt-8 space-y-6">
  
  {/* TOP SECTION */}
  <div className="grid gap-6 xl:grid-cols-3">

    {/* RESUME WEAKNESS */}
    <Card className="overflow-hidden rounded-[30px] border-0 bg-white shadow-lg xl:col-span-1">
      
      {/* TOP HEADER */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">
            <AlertTriangle className="h-7 w-7" />
          </div>

          <div>
            <h3 className="text-2xl font-bold">
              Resume Weakness
            </h3>

            <p className="mt-1 text-sm text-red-100">
              Areas needing improvement
            </p>
          </div>

        </div>
      </div>

      <CardContent className="space-y-5 p-6">

        <div className="rounded-3xl border border-red-100 bg-red-50 p-5 transition hover:-translate-y-1 hover:shadow-md">
          
          <div className="mb-3 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-red-500" />

            <h4 className="font-semibold text-slate-900">
              Limited Experience
            </h4>
          </div>

          <p className="text-sm leading-7 text-slate-600">
            Add internships, freelance work, or collaborative
            projects to strengthen your profile.
          </p>
        </div>

        <div className="rounded-3xl border border-orange-100 bg-orange-50 p-5 transition hover:-translate-y-1 hover:shadow-md">

          <div className="mb-3 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-orange-500" />

            <h4 className="font-semibold text-slate-900">
              Missing Impact Metrics
            </h4>
          </div>

          <p className="text-sm leading-7 text-slate-600">
            Add measurable achievements like traffic growth,
            optimization results, or performance improvements.
          </p>
        </div>

      </CardContent>
    </Card>

    {/* INTERVIEW QUESTIONS */}
    <Card className="overflow-hidden rounded-[30px] border-0 bg-white shadow-lg xl:col-span-2">

      {/* HEADER */}
      <div className="flex flex-col gap-5 border-b bg-slate-50 p-6 md:flex-row md:items-center md:justify-between">

        <div>
          <h3 className="text-3xl font-bold text-slate-900">
            Interview Preparation
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            AI generated questions based on your resume
          </p>
        </div>

        <Button className="h-12 rounded-2xl bg-indigo-600 px-6 hover:bg-indigo-700">
          Start Mock Interview
        </Button>
      </div>

      <CardContent className="p-6">

        <div className="grid gap-6 lg:grid-cols-2">

          {/* TECH QUESTIONS */}
          <div className="rounded-[28px] bg-slate-50 p-5">

            <div className="mb-5 flex items-center gap-3">
              
              <div className="rounded-2xl bg-indigo-100 p-3">
                <Sparkles className="h-5 w-5 text-indigo-600" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  Technical Questions
                </h4>

                <p className="text-sm text-slate-500">
                  Backend & frontend concepts
                </p>
              </div>

            </div>

            <div className="space-y-4">

              {[
                "What is your experience with Next.js and Node.js?",
                "How do you build scalable applications?",
                "Difference between PostgreSQL and MongoDB?",
                "How does JWT authentication work?",
              ].map((question, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-slate-100 bg-white p-4 transition hover:border-indigo-200 hover:shadow-md"
                >
                  <div className="flex gap-3">

                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-500" />

                    <p className="text-sm leading-7 text-slate-700">
                      {question}
                    </p>

                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* HR QUESTIONS */}
          <div className="rounded-[28px] bg-slate-50 p-5">

            <div className="mb-5 flex items-center gap-3">

              <div className="rounded-2xl bg-emerald-100 p-3">
                <Briefcase className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  HR Questions
                </h4>

                <p className="text-sm text-slate-500">
                  Personality & communication
                </p>
              </div>

            </div>

            <div className="space-y-4">

              {[
                "Why do you want to join our company?",
                "What are your career goals?",
                "Describe a difficult challenge you solved.",
                "How do you handle deadlines and pressure?",
              ].map((question, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-100 bg-white p-4 transition hover:border-emerald-200 hover:shadow-md"
                >
                  <div className="flex gap-3">

                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />

                    <p className="text-sm leading-7 text-slate-700">
                      {question}
                    </p>

                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>

      </CardContent>
    </Card>

  </div>
</div>
      </div>
    </div>
  );
}
