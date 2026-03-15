"use client";

export default function GlobalError() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#101011] p-6">
      <div className="rounded border border-red-900 bg-red-950 px-4 py-3 text-sm text-red-400">
        Something went wrong
      </div>
    </div>
  );
}
