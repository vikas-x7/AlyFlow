"use client";

import Link from "next/link";
import { RegisterForm } from "@/modules/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex">
      {/* Left Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://i.pinimg.com/1200x/60/6e/3b/606e3b67b4089222e49c90df4bc066f4.jpg"
          alt="register visual"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xlpx-6 py-8 shadow-xl backdrop-blur">
            {/* Heading */}
            <div className="mb-6 text-start">
              <h2 className="text-2xl font-semibold">Create your account</h2>
              <p className="mt-1 text-sm text-gray-400">
                Use your work email to get started.
              </p>
            </div>

            {/* Social Buttons */}
            <div className="mb-6 space-y-3">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm font-medium hover:border-white/30"
              >
                <span className="text-lg">G</span>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm font-medium hover:border-white/30"
              >
                <span className="text-lg"></span>
                <span>Continue with Apple</span>
              </button>
            </div>

            {/* Divider */}
            <div className="mb-6 flex items-center gap-3 text-xs text-gray-500">
              <div className="h-px flex-1 bg-white/10" />
              <span>Or continue with email</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Form */}
            <RegisterForm showTitle={false} />

            {/* Login Link */}
            <p className="mt-4 text-center text-xs text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-white hover:underline"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
