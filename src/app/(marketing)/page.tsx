import { Features } from "@/modules/marketing/components/Features";
import { Hero } from "@/modules/marketing/components/Hero";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="mx-auto bg-[#010102]  w-6xl">
      <header className="bg-white/80 w-6xl fixed  top-10 rounded-sm z-90">
        <div className="px-6 py-2 flex items-center justify-between">
          <Link href="/" className="font-semibold">
            Aly flow
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <p>home </p>
            <p>home </p>
            <p>home </p>
            <p>home </p>
            <Link href="/login" className="">
              Login
            </Link>
          </nav>
        </div>
      </header>
      <Hero />
      <Features />
    </main>
  );
}
