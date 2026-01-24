"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { LoginForm } from "@/modules/auth/components/LoginForm";
import { FaSquareGithub } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io5";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white flex font-gothic">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://i.pinimg.com/736x/7c/8f/69/7c8f69693516d50499cb56fa0d2b41e0.jpg"
          alt="auth visual"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute left-6 top-6 text-white">
          <p className="text-sm text-white/70">Alyflow</p>
        </div>

        <div className="absolute left-6 bottom-8 max-w-xs text-white">
          <h3 className="text-2xl  leading-tight">
            A simple Excel-style canvas to quickly draw and organize workflows.
          </h3>
          <p className="mt-2 text-sm text-white/70">
            Sketch processes, connect nodes, and iterate fast sign in to
            continue.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl   px-6 py-8  backdrop-blur text-start">
            <div className="mb-6 ">
              <h2 className="text-2xl font-semibold">Welcome back</h2>
              <p className="mt-1 text-sm text-gray-400">
                Please enter your details to sign in.
              </p>
            </div>

            <div className="mb-6 space-y-3">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm font-medium hover:border-white/30"
              >
                <span className="text-lg">
                  <FcGoogle />
                </span>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm font-medium hover:border-white/30"
              >
                <span className="text-lg">
                  <IoLogoGithub />
                </span>
                <span>Continue with Github</span>
              </button>
            </div>

            <div className="mb-6 flex items-center gap-3 text-xs text-gray-500">
              <div className="h-px flex-1 bg-white/10" />
              <span>Or sign in with</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <LoginForm showTitle={false} />

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
    </div>
  );
}
