"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import FAQ from "@/modules/marketing/components/Faq";
import { Features } from "@/modules/marketing/components/Features";
import { Footer } from "@/modules/marketing/components/Footer";
import { Hero } from "@/modules/marketing/components/Hero";

import Navbar from "@/modules/marketing/components/Navbar";
import TrustedSection from "@/modules/marketing/components/TrustedSection";

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
    <main id="home" className=" min-h-screen flex flex-col items-center">
      <div className="w-7xl">
        <Hero />
        <TrustedSection />
        <FAQ />
      </div>
      <Footer />
    </main>
  );
}
