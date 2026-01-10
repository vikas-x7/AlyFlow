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
      <section className=" text-white  font-gothic">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 ">
          {/* Left Side */}
          <div>
            <h2 className="text-4xl md:text-5xl mb-2 leading-tight">
              Breakthrough <br /> naturalness
            </h2>

            <p className="text-gray-400 max-w-md leading-relaxed">
              So natural, it laughs. It sounds palpably excited. Sometimes
              devastatingly sad. It speaks in 42 languages and sounds just like
              you might.
            </p>
          </div>

          {/* Right Side */}
          <div className="relative w-full h-125  overflow-hidden mb-90">
            <img
              src="https://i.pinimg.com/1200x/e2/74/d7/e274d78176dad801c50d008fcf775e6b.jpg"
              alt="preview"
              className="absolute inset-0 w-full h-full object-cover opacity-40 "
            />
          </div>
        </div>
        <Footer />
      </section>
    </main>
  );
}
