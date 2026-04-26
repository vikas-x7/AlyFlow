'use client';

import Link from 'next/link';
import Navbar from './Navbar';
import MarqueeSection from '@/modules/marketing/components/MarqueeSection';

export const Hero = () => {
  return (
    <>
      <section className="relative font-gothic min-h-screen flex flex-col ">
        <Navbar />

        <div className="relative z-10 flex flex-col items-center text-center text-black flex-1 justify-center px- sm:px-6 py-16 sm:py-20 md:py-24 gap-5 sm:gap-7 mt-16 sm:mt-20">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-[30px] leading-8 text-center sm:text-4xl md:text-5xl lg:text-[60px] max-w-5xl -tracking-[1px] sm:-tracking-[2px] md:-tracking-[4px] sm:leading-tight md:leading-13 text-black/90">
              Design connect and organize <br className="hidden sm:block" /> every idea in one mind
            </h1>
            <p className="text-[9px] w-[80%]  leading-3 text-center sm:text-sm md:text-[16px] sm:leading-6 text-[#171717] sm:max-w-sm md:max-w-lg">
              Architect your thinking map systems plan projects, and structure complex ideas with professional precision.
            </p>
          </div>

          <div className="flex gap-2">
            <Link href="/canvas" className="bg-[#171717] rounded-2xl text-white px-4 sm:px-5 md:px-6 py-1.5 text-xs sm:text-[15px] font-medium whitespace-nowrap transition hover:bg-black/80">
              Get started now
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('app-preview')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border border-black/20 rounded-2xl text-black px-4 sm:px-5 md:px-6 py-1.5 text-xs sm:text-[15px] font-medium whitespace-nowrap  transition hover:bg-black/10 cursor-pointer"
            >
              See demo
            </button>
          </div>

          <div className="w-full mt-6 sm:mt-10">
            <MarqueeSection />
          </div>

          <div id="app-preview" className="relative w-full max-w-7xl mx-auto mt-10 sm:mt-20 md:mt-10 border-[#C6B9FF] border-8 sm:border-16 md:border-31 rounded-[3px]">
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
