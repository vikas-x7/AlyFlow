"use client";

import Link from "next/link";
import { RegisterForm } from "@/modules/auth/components/RegisterForm";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io5";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white text-black flex font-gothic">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://i.pinimg.com/736x/f0/0e/54/f00e544446c28b629a1defa290d7928f.jpg"
          alt="auth visual"
          className="absolute inset-0 w-full h-full object-cover"
        />

        

     
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl px-6 py-8 backdrop-blur text-center">
            <div className="mb-6">
              <h2 className="text-3xl ">Create your account</h2>
              <p className="mt-1 text-sm">
                Use your work email to get started.
              </p>
            </div>

            <div className="mb-6 space-y-3">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-[3px] bg-black text-white px-3 py-2 text-sm font-medium hover:border-white/30"
              >
                <span className="text-lg">
                  <FcGoogle />
                </span>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-[3px] text-white bg-black px-3 py-2 text-sm font-medium hover:border-white/30"
              >
                <span className="text-lg">
                  <IoLogoGithub />
                </span>
                <span>Continue with Github</span>
              </button>
            </div>

            <div className="mb-6 flex items-center gap-3 text-xs text-gray-500">
              <div className="h-px flex-1 bg-white/10" />
              <span>Or continue with email</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <RegisterForm showTitle={false} />

            <p className="mt-4 text-center text-xs text-black">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:underline"
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
