"use client";

import Link from "next/link";
import Navbar from "./Navbar";

export const Hero = () => {
  return (
    <>
      <section className="relative font-gothic h-[90vh] flex flex-col">
        {/* Background Image */}
        <img
          src="https://i.pinimg.com/1200x/3c/be/07/3cbe078fbef3bfc6c143ee1b4721908a.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Bottom fade/blur gradient — image ko neeche se fde out karta hai */}
        <div className="absolute bottom-0 left-0 right-0 h-30 bg-gradient-to-t from-white via-white to-transparent backdrop-blur-0 z-10" />

        {/* Sticky Navbar */}
        <div className="sticky top-0 z-50 w-full">
          <Navbar />
        </div>

        {/* Content */}
        <div className="relative z-10 px-4 md:px-6 py-16 md:py-24 flex flex-col items-center text-center text-black flex-1 mt-10">
          <div className="flex flex-col items-center gap-8 md:gap-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] max-w-6xl md:mb-5 leading-tight md:leading-13 -tracking-[2px] md:-tracking-[3.5px]">
                Design, connect, and organize <br /> every idea in one mind
              </h1>

              <p className="mx-auto text-xs sm:text-sm md:text-[14px] leading-relaxed">
                Architect your thinking. Map systems, plan projects, and
                structure <br />
                complex ideas with professional precision.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center">
              <Link
                href="/canvas"
                className="bg-black transition hover:bg-[#E1E1E1] text-white px-4 md:px-6 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap rounded-[5px]"
              >
                Get start now
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full px-4 sm:px-8 md:px-16 pb-16 flex justify-center  relative z-20">
          <img
            src="https://i.pinimg.com/1200x/38/21/f3/3821f382506d4569835b3e7632177e07.jpg"
            alt="App preview"
            className="w-full max-w-7xl rounded-[5px] shadow-2xl"
          />
        </div>
      </section>

      {/* Product image — hero ke neeche, white bg pe */}
    </>
  );
};
