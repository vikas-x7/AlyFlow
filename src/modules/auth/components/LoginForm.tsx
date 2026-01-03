"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema } from "../schemas/auth.schema";
import { useAuth } from "../hooks/useAuth";

export function LoginForm({ showTitle = true }: { showTitle?: boolean }) {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setLoading(true);
    try {
      await login(parsed.data);
      router.push("/canvas");
    } catch (err: any) {
      setError(typeof err?.response?.data?.error === "string" ? err.response.data.error : "Login failed");
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
        <label className="block text-xs font-medium text-gray-300">Email</label>
        <input
          type="email"
          className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-white/40 focus:outline-none"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-medium text-gray-300">Password</label>
          <button type="button" className="text-gray-400 hover:text-gray-200">
            Forgot password?
          </button>
        </div>
        <input
          type="password"
          className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-white/40 focus:outline-none"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-white py-2 text-sm font-medium text-black disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
