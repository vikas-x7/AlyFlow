"use client";

import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative bg-black text-white overflow-hidden font-gothic">
      {/* <div className="absolute right-1/4 md:right-[32%] top-12 md:top-20 lg:top-30 opacity-60 md:opacity-80 pointer-events-none w-64 md:w-96 lg:w-125">
        <img
          src="https://i.pinimg.com/originals/78/a5/ff/78a5ff90131c88c3e0fa328c54451c3e.gif"
          alt="Abstract Shape"
          className="w-108"
        />
      </div> */}

      <div className="px-4 md:px-6 py-16 md:py-24 lg:py-32 mt-8 md:mt-20  flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-8 md:gap-12">
          <div className="flex-1 text-[#E5E5E5]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-6xl md:mb-8 leading-tight md:leading-13 -tracking-[2px] md:-tracking-[4px]">
              Design, draw, and organize <br /> everything in one flexible
              workspace
            </h1>

            <p className="text-[#626262]  mx-auto text-xs sm:text-sm md:text-[13px] leading-relaxed">
              Map systems, plan projects, and structure complex ideas with
              complete freedom and precision.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center">
            <div className="hidden sm:block leading-3.5 text-xs md:text-sm font-volimono text-[#626262]">
              free <br /> forever
            </div>

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
