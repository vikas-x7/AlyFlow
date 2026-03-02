import type { ReactNode } from "react";
import Link from "next/link";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-6 py-3 flex items-center justify-between">
          <Link href="/" className="font-semibold">
            My App
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/login" className="text-gray-700">
              Login
            </Link>
            <Link
              href="/dashboard"
              className="rounded bg-black text-white px-3 py-1.5 text-sm font-medium"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4 text-xs text-gray-600">
          © {new Date().getFullYear()} My App
        </div>
      </footer>
    </div>
  );
}

