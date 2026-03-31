'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoGithub } from 'react-icons/io5';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white text-black flex font-gothic">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src="https://i.pinimg.com/736x/f0/0e/54/f00e544446c28b629a1defa290d7928f.jpg" alt="auth visual" className="absolute inset-0 w-full h-full object-cover " />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl px-6 py-8 backdrop-blur text-center">
            <div className="mb-6 ">
              <h2 className="text-3xl ">Welcome back</h2>
              <p className="mt-1 text-sm ">Sign in to continue to your workspace.</p>
            </div>

            <div className="mb-6 space-y-3">
              <button
                type="button"
                onClick={() => signIn('google', { callbackUrl: '/canvas' })}
                className="flex w-full items-center justify-center gap-2 rounded-[3px] bg-black text-white px-3 py-2 text-sm font-medium hover:bg-black/80 transition-colors cursor-pointer"
              >
                <span className="text-lg">
                  <FcGoogle />
                </span>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => signIn('github', { callbackUrl: '/canvas' })}
                className="flex w-full items-center justify-center gap-2 rounded-[3px] text-white bg-black px-3 py-2 text-sm font-medium hover:bg-black/80 transition-colors cursor-pointer"
              >
                <span className="text-lg">
                  <IoLogoGithub />
                </span>
                <span>Continue with Github</span>
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-black/60">By signing in, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
