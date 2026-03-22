"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import MarqueeSection from "@/modules/marketing/components/MarqueeSection";

export const Hero = () => {
  return (
    <>
      <section className="relative font-gothic min-h-screen flex flex-col ">
        <Navbar />

        <div className="relative z-10 flex flex-col items-center text-center text-black flex-1 justify-center px-4 md:px-6 py-24 gap-7 mt-15">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] max-w-5xl -tracking-[1px] sm:-tracking-[2px] md:-tracking-[4px] leading-tight md:leading-18 font-instrument font-medium">
              Design, connect, and organize <br className="hidden sm:block" />{" "}
              every idea in one mind
            </h1>
            <p className="mx-auto text-xs sm:text-sm md:text-[19px] leading-6 text-[#171717] max-w-xs sm:max-w-sm md:max-w-lg">
              Architect your thinking map systems plan projects, and structure
              complex ideas with professional precision.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/canvas"
              className="bg-[#171717] text-white px-4 sm:px-5 md:px-6 py-2 text-xs sm:text-[15px] font-medium whitespace-nowrap rounded-[33px] transition hover:bg-black/80"
            >
              Get started now
            </Link>
            <Link
              href="/canvas"
              className="bg-[#dfdfdf] text-black px-4 sm:px-5 md:px-6 py-2 text-xs sm:text-[15px] font-medium whitespace-nowrap rounded-[33px] transition hover:bg-black/10"
            >
              See demo
            </Link>
          </div>

          <div className="w-full mt-6 sm:mt-10">
            <MarqueeSection />
          </div>

          <div className="relative w-full max-w-7xl mx-auto mt-10 sm:mt-20 md:mt-40 px-2 sm:px-4 md:px-6">
            <img
              src="https://res.cloudinary.com/dyv9kenuj/image/upload/v1774117017/Screenshot_from_2026-03-21_23-45-42_sewfdi.png"
              alt="App preview"
              className="w-full object-cover object-center rounded-xs shadow-2xl shadow-black"
            />
          </div>
        </div>
      </section>
    </>
  );
};
