import { Hero } from "@/modules/marketing/components/Hero";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="mx-auto bg-black">
      <header className="border-b  bg-white w-6xl absolute left-50 top-5 rounded-sm z-90">
        <div className="mx-auto  px-6 py-3 flex items-center justify-between">
          <Link href="/" className="font-semibold">
            My App
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/login" className="text-gray-700">
              Login
            </Link>
          </nav>
        </div>
      </header>
      <Hero />
    </main>
  );
}
