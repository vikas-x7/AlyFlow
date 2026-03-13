"use client";

import Link from "next/link";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#0D0D0D] w-full z-90 py-1 text-white font-gothic ">
      <div className="px-4 md:px-6 py-3 md:py-1 flex items-center justify-between">
        <div className="hidden md:flex gap-6 text-xs md:text-sm lg:text-[12px] font-light tracking-wider">
          <Link
            href="/#home"
            className="text-[#626262] hover:text-white transition cursor-pointer"
          >
            HOME
          </Link>
          <Link
            href="/#about"
            className="text-[#626262] hover:text-white transition cursor-pointer"
          >
            ABOUT
          </Link>
          <Link
            href="/#faq"
            className="text-[#626262] hover:text-white transition cursor-pointer"
          >
            FAQ
          </Link>
        </div>

        <Link
          href="/"
          className="flex text-[17px] items-center justify-center  md:text-xl font-bold tracking-tight hover:opacity-80 transition absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 text-[#FAFAF9]"
        >
          Alyflow
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 z-50"
          aria-label="Toggle menu"
        >
          <RxHamburgerMenu />
        </button>

        <nav className="hidden md:flex items-center gap-3 text-xs md:text-sm  tracking-wider">
          <Link
            href="/login"
            className="bg-black hover:bg-white/10 text-white/80 px-3 md:px-4 py-1.5 md:py-2  transition text-xs md:text-[11px] "
          >
            LOGIN
          </Link>
          <Link
            href="/register"
            className="bg-white hover:bg-white text-black px-2  md:px-4 py-1.5 md:py-1.5  transition text-xs md:text-[11px]  flex items-center justify-center "
          >
            SIGN UP
          </Link>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/5 px-4 py-4 flex flex-col gap-4 animate-in fade-in duration-200">
          <Link
            href="/#home"
            className="text-[10px] text-[#626262] hover:text-white/60 transition cursor-pointer"
          >
            HOME
          </Link>
          <Link
            href="/#about"
            className="text-[10px] text-[#626262] hover:text-white/60 transition cursor-pointer"
          >
            ABOUT
          </Link>
          <Link
            href="/#faq"
            className="text-[10px] text-[#626262] hover:text-white/60 transition cursor-pointer"
          >
            FAQ
          </Link>
          <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
            <Link
              href="/login"
              className="bg-white/5 hover:bg-white/10 text-white/80 px-3 py-2 rounded-xs transition text-[10px]"
            >
              LOGIN
            </Link>
            <Link
              href="/register"
              className="bg-white/5 hover:bg-white/10 text-white/80 px-3 py-2 rounded-xs transition text-[10px]"
            >
              SIGN UP
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
