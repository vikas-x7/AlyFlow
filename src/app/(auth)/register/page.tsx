"use client";

import Link from "next/link";
import { RegisterForm } from "@/modules/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#050509] text-white">
      <div className="mx-auto flex h-full max-w-6xl flex-col px-6 py-6">
        <header className="mb-10 flex items-center justify-between text-sm text-gray-400">
          <Link href="/" className="flex items-center gap-2 hover:text-white">
            <span className="text-lg">←</span>
            <span>Back to home</span>
          </Link>
        </header>

        <main className="flex flex-1 flex-col gap-12 lg:flex-row">
          <section className="hidden flex-1 flex-col justify-between lg:flex">
            <div />
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Squadra-style HR workspace</span>
              </div>
              <h1 className="mb-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
                Create your workspace account in a few clicks.
              </h1>
              <p className="max-w-md text-sm text-gray-400">
                Invite your team, centralize people ops, and move faster on hiring, onboarding, and payroll.
              </p>
            </div>
            <div className="mb-4 text-xs text-gray-500">
              Secure by default. No credit card required to get started.
            </div>
          </section>

          <section className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border border-white/5 bg-white/5 px-6 py-7 shadow-xl backdrop-blur">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-white">Create your account</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Use your work email so your team can find you and join the same workspace.
                </p>
              </div>

              <div className="mb-6 space-y-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm font-medium text-white hover:border-white/30"
                >
                  <span className="text-lg">G</span>
                  <span>Continue with Google</span>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm font-medium text-white hover:border-white/30"
                >
                  <span className="text-lg"></span>
                  <span>Continue with Apple</span>
                </button>
              </div>

              <div className="mb-6 flex items-center gap-3 text-xs text-gray-500">
                <div className="h-px flex-1 bg-white/10" />
                <span>Or continue with email</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <RegisterForm showTitle={false} />

              <p className="mt-4 text-center text-xs text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-gray-100 hover:underline">
                  Sign in instead
                </Link>
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

