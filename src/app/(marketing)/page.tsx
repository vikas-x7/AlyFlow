import { Features } from "@/modules/marketing/components/Features";
import { Footer } from "@/modules/marketing/components/Footer";
import { Hero } from "@/modules/marketing/components/Hero";
import { IntelligenceSection } from "@/modules/marketing/components/IntelligenceSection";
import Link from "next/link";
import { GiCrossedAirFlows } from "react-icons/gi";

export default function LandingPage() {
  const logos = ["tldraw", "eraser", "draw", "exelidraw", "excalidraw"];
  return (
    <main className="mx-auto w-6xl">
      <header className="text-black w-6xl fixed  top-10  z-90  bg-[#CFCFCF] font-gothic rounded-sm">
        <div className="px-6 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <GiCrossedAirFlows />
            Aly flow
          </Link>

          <nav className="flex items-center gap-10 text-sm ">
            <div className="flex gap-5">
              <p>home </p>
              <p>About </p>
              <p>Price </p>
            </div>
            <Link
              href="/login"
              className="bg-black text-white/80 px-2  py-1 rounded-sm"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <Hero />

      {/* <section className=" py-10 border-y border-white/5 mb-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-15 opacity-60  tracking-wide text-gray-400 text-xl">
            {logos.map((logo, i) => (
              <span key={i} className="hover:opacity-100 transition">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section> */}

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
