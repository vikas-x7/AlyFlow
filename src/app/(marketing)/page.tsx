import { Features } from "@/modules/marketing/components/Features";
import { Footer } from "@/modules/marketing/components/Footer";
import { Hero } from "@/modules/marketing/components/Hero";
import { IntelligenceSection } from "@/modules/marketing/components/IntelligenceSection";
import Navbar from "@/modules/marketing/components/Navbar";
import Link from "next/link";
import { GiCrossedAirFlows } from "react-icons/gi";

export default function LandingPage() {
  return (
    <main className="mx-auto ">
      <Navbar />
      <Hero />
      <IntelligenceSection />
      <Features />
      <Footer />
    </main>
  );
}
