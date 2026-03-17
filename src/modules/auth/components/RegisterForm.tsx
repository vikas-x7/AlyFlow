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

    const parsed = registerSchema.safeParse({
      name: name.trim(),
      email: email.trim(),
      password,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setLoading(true);
    try {
      await register(parsed.data);
      router.push("/canvas");
    } catch (err: any) {
      setError(
        typeof err?.response?.data?.error === "string"
          ? err.response.data.error
          : "Registration failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {showTitle ? (
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white">Create account</h1>
          <p className="text-sm text-gray-400">
            Start by creating your workspace profile.
          </p>
        </div>
      ) : null}

      {error ? (
        <div className="rounded border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="space-y-2">
        <label className="block text-xs font-medium text-black text-start">
          Full name
        </label>
        <input
          type="text"
          className="w-full rounded-[3px] border border-black/50 px-3 py-2 text-sm text-black placeholder:text-gray-500 focus:outline-none"
          placeholder="Alex Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-medium text-black text-start">
          Email
        </label>
        <input
          type="email"
          className="w-full rounded-[3px] border border-black/50 px-3 py-2 text-sm text-black placeholder:text-gray-500 focus:outline-none"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs text-start font-medium text-black">
          Password
        </label>
        <input
          type="password"
          className="w-full rounded-[3px] border border-black/50 px-3 py-2 text-sm text-black placeholder:text-gray-500 focus:outline-none"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-[3px] bg-black py-2 text-sm font-medium text-white cursor-pointer disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
