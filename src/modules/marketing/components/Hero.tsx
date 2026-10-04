'use client';

import Link from 'next/link';
import { Infinity as InfinityIcon, Users } from 'lucide-react';
import Navbar from './Navbar';
import MarqueeSection from './MarqueeSection';

export const Hero = () => {
  return (
    <section className="relative w-full flex flex-col overflow-hidden font-gothic text-[#171717]">
      <div className="relative z-10 ">
        <MarqueeSection />
      </div>

      <div className="relative z-10 w-full flex justify-center mt-[40px] ">
        <h1 className="font-inter text-[22vw] leading-[0.5] font-bold tracking-[-0.07em] text-[#1C1A16] select-none">ALYFLOW</h1>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-6 pb-8 md:mb-5">
        <div className="flex items-center justify-center w-full mt-14 sm:mt-20">
          <button className="rounded-[7px] bg-white px-3 py-[6px] tracking-[-0.75px] text-xs sm:text-sm font-medium shadow-sm flex items-center gap-2 cursor-pointer">
            <InfinityIcon size={14} /> Unlimited canvas
          </button>

          <div className="w-8 md:w-16 h-[1px] bg-gray-200"></div>

          <button className="rounded-[7px] border border-gray-200/60 bg-white/40 px-5 py-2.5 tracking-[-0.75px] text-xs sm:text-sm font-medium flex items-center gap-2 hover:bg-white transition-colors cursor-pointer">
            Count less notes
          </button>
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-gothic leading-tight mt-5 text-center tracking-[-5px]">Every idea you have mapped in one place</h2>

        <p className="text-sm md:text-base lg:text-[17px] text-black/80 tracking-[-0.75px] max-w-[49rem] mx-auto leading-relaxed mb-8 mt-5 text-center">
          Alyflow is an infinite canvas for visual thinking. Connect nodes, route edges and shape complex systems at the speed your mind works, then share the whole flow with your team in one click.
        </p>

        <div className="flex items-center gap-2">
          <Link href="/canvas" className="bg-[#171717] text-white rounded-full px-8 py-3 text-sm md:text-base font-medium flex items-center gap-2 hover:bg-black transition-transform cursor-pointer">
            Open canvas
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </Link>

          <button
            onClick={() => document.getElementById('app-preview')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-black/20 rounded-full px-6 py-3 text-sm md:text-base font-medium transition hover:bg-black/5 cursor-pointer"
          >
            See demo
          </button>
        </div>
      </div>

      <div id="app-preview" className="relative z-10 w-full px-4 sm:px-6 lg:px-10">
        <div className="relative w-full  sm:border-8 overflow-hidden rounded-[20px]">
          <img src="https://res.cloudinary.com/dyv9kenuj/image/upload/v1774117017/Screenshot_from_2026-03-21_23-45-42_sewfdi.png" alt="App preview" className="w-full object-cover object-center " />
        </div>
      </div>
    </section>
  );
};
