"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import FAQ from "@/modules/marketing/components/Faq";
import { Features } from "@/modules/marketing/components/Features";
import { Footer } from "@/modules/marketing/components/Footer";
import { Hero } from "@/modules/marketing/components/Hero";
import { IntelligenceSection } from "@/modules/marketing/components/IntelligenceSection";
import Navbar from "@/modules/marketing/components/Navbar";

export default function LandingPage() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted && token) router.replace("/canvas");
  }, [mounted, token, router]);

  if (!mounted || token) return null;

  return (
    <main id="home" className="w-full min-h-screen">
      {/* <div className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-full mx-auto flex items-center justify-center border-b border-dashed border-white/20">
          <div className="w-7xl"></div>
        </div>
      </div> */}

      <div className="">
        <Hero />
        <Features />
        <IntelligenceSection />
        <FAQ />
      </div>
      <Footer />
    </main>
  );
}
