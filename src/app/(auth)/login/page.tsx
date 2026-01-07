"use client";

import Link from "next/link";
import { LoginForm } from "@/modules/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <div className="mb-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-white">
            ← Back to home
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 shadow-xl backdrop-blur">
          {/* Heading */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold">Welcome back</h2>
            <p className="mt-1 text-sm text-gray-400">
              Please enter your details to sign in.
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
            <span>Or sign in with</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Form */}
          <LoginForm showTitle={false} />

          {/* Register */}
          <p className="mt-4 text-center text-xs text-gray-400">
            Not signed up yet?{" "}
            <Link
              href="/register"
              className="font-medium text-white hover:underline"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
