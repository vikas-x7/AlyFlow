"use client";

export function LoginForm() {
  return (
    <form className="w-full max-w-sm space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded bg-black text-white py-2 text-sm font-medium"
      >
        Log in
      </button>
    </form>
  );
}

