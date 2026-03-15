"use client";

import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative  overflow-hidden font-gothic">
      <div className="px-4 md:px-6 py-16 md:py-24  flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-8 md:gap-6">
          <div className="flex-1 text-[#E5E5E5]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] max-w-6xl md:mb-5 leading-tight md:leading-13 -tracking-[2px] md:-tracking-[4px]">
              Design, connect, and organize every idea <br /> in one mind
              mapping workspace.
            </h1>

            <p className="text-[#626262]  mx-auto text-xs sm:text-sm md:text-[14px] leading-relaxed">
              Architect your thinking. Map systems, plan projects, and structure
              complex ideas with professional precision.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center">
            <Link
              href="/canvas"
              className="bg-white transition hover:bg-[#E1E1E1] text-black px-4 md:px-4 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap"
            >
              Get start now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
