"use client";

import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <button
          onClick={() => router.back()}
          href="/"
          className="rounded-lg bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700 transition"
        >
          Back
        </button>
        <h1 className="mb-2 text-center text-4xl font-bold text-gray-800">
          Create Account
        </h1>

        <p className="mb-8 text-center text-gray-500">Register to continue</p>

        <form className="space-y-5">
          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

            <input
              type="text"
              placeholder="Enter username"
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-indigo-500"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

            <input
              type="email"
              placeholder="Enter email"
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-indigo-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-12 outline-none transition focus:border-indigo-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                size={20}
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 text-gray-800 placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {/* Button */}
          <Button className="w-full rounded-xl py-6 text-base">Register</Button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
