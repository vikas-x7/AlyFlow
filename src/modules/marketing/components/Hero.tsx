"use client";

import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative bg-black text-white overflow-hidden font-gothic">
      <div className="absolute right-1/4 md:right-1/3 top-12 md:top-20 lg:top-30 opacity-60 md:opacity-80  pointer-events-none w-64 md:w-96 lg:w-125">
        <img
          src="https://i.pinimg.com/originals/70/65/4f/70654fd75f2991e168ec22b75fdbd6a5.gif"
          alt="Abstract Shape"
          className="w-108"
        />
      </div>

      <div className="px-4 md:px-6 py-16 md:py-24 lg:py-32 mt-8 md:mt-20 lg:mt-75 ">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 md:gap-12 lg:gap-0">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-2xl mb-6 md:mb-8 leading-tight md:leading-13 -tracking-[2px] md:-tracking-[4px]">
              Design, draw, and <br /> organize everything
              <br />
              in one flexible workspace
            </h1>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-30">
              <p className="text-gray-400 max-w-xs text-xs sm:text-sm md:text-[13px] leading-relaxed">
                Map systems, plan projects, and structure complex ideas with
                complete freedom and precision.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 lg:gap-20 lg:items-center mt-8 lg:mt-0">
            <div className="hidden sm:block leading-tight text-xs md:text-sm">
              free <br /> forever
            </div>

            <Link
              href="/canvas"
              className="bg-white transition hover:bg-gray-200 text-black px-4 md:px-6 py-2 text-xs sm:text-sm font-medium whitespace-nowrap"
            >
              Get start now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
