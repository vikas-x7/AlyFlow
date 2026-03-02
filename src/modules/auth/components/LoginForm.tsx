"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema } from "../schemas/auth.schema";
import { useAuth } from "../hooks/useAuth";

export function LoginForm() {
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
      router.push("/dashboard");
    } catch (err: any) {
      setError(typeof err?.response?.data?.error === "string" ? err.response.data.error : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="w-full max-w-sm space-y-4" onSubmit={onSubmit}>
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Log in</h1>
        <p className="text-sm text-gray-600">Use your email and password.</p>
      </div>

      {error ? (
        <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded bg-black text-white py-2 text-sm font-medium disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}

