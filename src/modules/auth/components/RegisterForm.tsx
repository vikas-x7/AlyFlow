"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerSchema } from "../schemas/auth.schema";
import { useAuth } from "../hooks/useAuth";

export function RegisterForm({ showTitle = true }: { showTitle?: boolean }) {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = registerSchema.safeParse({ name, email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setLoading(true);
    try {
      await register(parsed.data);
      router.push("/canvas");
    } catch (err: any) {
      setError(typeof err?.response?.data?.error === "string" ? err.response.data.error : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {showTitle ? (
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white">Create account</h1>
          <p className="text-sm text-gray-400">Start by creating your workspace profile.</p>
        </div>
      ) : null}

      {error ? (
        <div className="rounded border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-300">Full name</label>
        <input
          type="text"
          className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-white/40 focus:outline-none"
          placeholder="Alex Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-300">Work email</label>
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
        <label className="block text-xs font-medium text-gray-300">Password</label>
        <input
          type="password"
          className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-white/40 focus:outline-none"
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-white py-2 text-sm font-medium text-black disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
