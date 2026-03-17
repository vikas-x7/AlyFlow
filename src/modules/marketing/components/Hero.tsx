"use client";

import Link from "next/link";
import Navbar from "./Navbar";

export const Hero = () => {
  return (
    <>
      <section className="relative font-gothic min-h-screen flex flex-col">
        <Navbar />

        <img
          src="https://i.pinimg.com/736x/50/1b/78/501b78d08205f8496cc1e0ad280a3552.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        />

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-white via-white/80 to-transparent z-10" />

        <div className="relative z-10 flex flex-col items-center text-center text-black flex-1 justify-center px-4 md:px-6 py-24 gap-7 mt-10">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[53px] max-w-4xl leading-tight md:leading-[0.9] -tracking-[2px] md:-tracking-[3.5px]">
              Design, connect, and organize <br /> every idea in one mind
            </h1>
            <p className="mx-auto text-xs sm:text-sm md:text-[14px] leading-relaxed text-black/70 max-w-lg">
              Architect your thinking. Map systems, plan projects, and structure
              complex ideas with professional precision.
            </p>
          </div>

          <Link
            href="/canvas"
            className="bg-black text-white px-5 md:px-6 py-2 text-xs sm:text-sm font-medium whitespace-nowrap rounded-[3px] transition hover:bg-black/80"
          >
            Get started now
          </Link>

          <div className="relative w-full max-w-7xl mx-auto mt-20 px-6 ">
            <img
              src="https://res.cloudinary.com/dyv9kenuj/image/upload/v1773709954/Screenshot_from_2026-03-17_06-41-32_ps7q8m.png"
              alt="App preview"
              className="w-full object-cover object-center rounded-[5px] shadow-2xl shadow-black "
            />
          </div>
        </div>
      </section>
    </>
  );
};
