"use client";

import Link from "next/link";
import React, { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black fixed w-full z-90 py-1 text-white font-gothic border-b border-white/5">
      <div className="px-4 md:px-6 py-3 md:py-2 flex items-center justify-between">
        <div className="hidden md:flex gap-6 text-xs md:text-sm lg:text-[14px] font-light tracking-wider">
          <p className="hover:text-white/60 transition cursor-pointer">HOME</p>
          <p className="hover:text-white/60 transition cursor-pointer">ABOUT</p>
          <p className="hover:text-white/60 transition cursor-pointer">FAQ</p>
        </div>

        <Link
          href="/"
          className="flex items-center justify-center text-lg md:text-2xl font-bold tracking-tight hover:opacity-80 transition absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
        >
          Alyflow
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 z-50"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>

        <nav className="hidden md:flex items-center gap-3 text-xs md:text-sm font-light tracking-wider">
          <Link
            href="/login"
            className="bg-black hover:bg-white/10 text-white/80 px-3 md:px-4 py-1.5 md:py-2  transition text-xs md:text-sm"
          >
            LOGIN
          </Link>
          <Link
            href="/register"
            className="bg-[#e72a0d] hover:bg-[#e72a0d]/70 text-black px-3 md:px-4 py-1.5 md:py-1.5  transition text-xs md:text-sm"
          >
            SIGN UP
          </Link>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/5 px-4 py-4 flex flex-col gap-4 animate-in fade-in duration-200">
          <p className="text-sm hover:text-white/60 transition cursor-pointer">
            HOME
          </p>
          <p className="text-sm hover:text-white/60 transition cursor-pointer">
            ABOUT
          </p>
          <p className="text-sm hover:text-white/60 transition cursor-pointer">
            FAQ
          </p>
          <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
            <Link
              href="/login"
              className="bg-white/5 hover:bg-white/10 text-white/80 px-3 py-2 rounded-sm transition text-sm"
            >
              LOGIN
            </Link>
            <Link
              href="/signup"
              className="bg-white/5 hover:bg-white/10 text-white/80 px-3 py-2 rounded-sm transition text-sm"
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
