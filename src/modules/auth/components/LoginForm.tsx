"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema } from "../schemas/auth.schema";
import { useAuth } from "../hooks/useAuth";

import { Eye, EyeOff } from "lucide-react";

export function LoginForm({ showTitle = true }: { showTitle?: boolean }) {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = loginSchema.safeParse({ email: email.trim(), password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setLoading(true);
    try {
      await login(parsed.data);
      router.push("/canvas");
    } catch (err: any) {
      setError(
        typeof err?.response?.data?.error === "string"
          ? err.response.data.error
          : "Login failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {showTitle ? (
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white">Log in</h1>
          <p className="text-sm text-gray-400">Use your email and password.</p>
        </div>
      ) : null}

      {error ? (
        <div className="rounded border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="space-y-2">
        <label className="block text-xs font-medium text-black text-start">
          Email
        </label>
        <input
          type="email"
          className="w-full rounded-[3px] border border-black/50 px-3 py-2 text-sm text-black placeholder:text-gray-500 focus:outline-none [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_white] [&:-webkit-autofill]:[-webkit-text-fill-color:#000]"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-medium text-black">Password</label>
          <button type="button" className="text-gray-400 hover:text-gray-600">
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full rounded-[3px] border border-black/50 px-3 py-2 pr-10 text-sm text-black placeholder:text-black/70 focus:outline-none [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_white] [&:-webkit-autofill]:[-webkit-text-fill-color:#000]"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full rounded-[3px] bg-black py-2 text-sm font-medium text-white cursor-pointer disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
