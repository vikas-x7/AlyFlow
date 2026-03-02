import { Hero } from "@/modules/marketing/components/Hero";
import { Features } from "@/modules/marketing/components/Features";
import { CTA } from "@/modules/marketing/components/CTA";

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6">
      <Hero />
      <Features />
      <CTA />
    </main>
  );
}

