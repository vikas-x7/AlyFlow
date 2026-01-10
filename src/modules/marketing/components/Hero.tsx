"use client";

import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative h-screen bg-black text-white overflow-hidden font-gothic">
      <div className="absolute right-1/3 top-30  opacity-80 pointer-events-none">
        <img
          src="https://i.pinimg.com/originals/32/01/26/320126a400f1eba249fd922a119f7281.gif"
          alt="Abstract Shape"
          className="w-125 "
        />
      </div>

      <div className="z-10 px-6 py-32 mt-65 flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-6xl max-w-2xl mb-8 leading-13 -tracking-[4px]">
            Design, draw, and <br /> organize everything
            <br />
            in one flexible workspace
          </h1>

          <div className="flex gap-30">
            <p className="text-gray-400 w-40  text-[13px]">
              Map systems, plan projects, and structure complex ideas with
              complete freedom and precision.
            </p>
            <p className="text-gray-400 w-40  text-[13px]">
              Map systems, plan projects, and structure complex ideas with
              complete freedom and precision.
            </p>
          </div>
        </div>
        <div className="flex gap-20   items-center">
          <p className="leading-4.5">
            free <br /> forever
          </p>
          <p className="leading-4.5">
            free <br /> forever
          </p>
          <div>
            <Link
              href="/canvas"
              className="bg-white transition text-black px-6 py-2 text-sm font-medium"
            >
              Get start now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
