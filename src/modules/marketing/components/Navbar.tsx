"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full py-1 text-black font-gothic flex justify-center transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="px-4 md:px-6 py-3 md:py-1 flex items-center justify-between w-7xl">
        <Link
          href="/"
          className="flex text-[17px] items-center justify-center md:text-xl font-bold tracking-tight hover:opacity-80 transition absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 text-black"
        >
          Alyflow
        </Link>

        <div className="hidden md:flex gap-6 text-xs md:text-sm lg:text-[12px]">
          <Link
            href="/#home"
            className="text-black hover:opacity-60 transition cursor-pointer"
          >
            HOME
          </Link>
          <Link
            href="/#about"
            className="text-black hover:opacity-60 transition cursor-pointer"
          >
            ABOUT
          </Link>
          <Link
            href="/#faq"
            className="text-black hover:opacity-60 transition cursor-pointer"
          >
            FAQ
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 z-50"
          aria-label="Toggle menu"
        >
          <RxHamburgerMenu />
        </button>

        <nav className="hidden md:flex items-center gap-3 text-xs md:text-sm tracking-wider">
          <Link
            href="/login"
            className="bg-black text-white rounded-xs px-3 md:px-4 py-1.5 md:py-2 transition text-xs md:text-[11px]"
          >
            LOGIN
          </Link>
          <Link
            href="/register"
            className="bg-white hover:bg-white rounded-xs text-black px-2 md:px-4 py-1.5 md:py-1.5 transition text-xs md:text-[11px] flex items-center justify-center border border-black/10"
          >
            SIGN UP
          </Link>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-black/5 px-4 py-4 flex flex-col gap-4 animate-in fade-in duration-200 w-full">
          <Link
            href="/#home"
            className="text-[10px] text-[#626262] hover:text-black transition cursor-pointer"
          >
            HOME
          </Link>
          <Link
            href="/#about"
            className="text-[10px] text-[#626262] hover:text-black transition cursor-pointer"
          >
            ABOUT
          </Link>
          <Link
            href="/#faq"
            className="text-[10px] text-[#626262] hover:text-black transition cursor-pointer"
          >
            FAQ
          </Link>
          <div className="border-t border-black/5 pt-4 flex flex-col gap-2">
            <Link
              href="/login"
              className="bg-black text-white px-3 py-2 rounded-xs transition text-[10px]"
            >
              LOGIN
            </Link>
            <Link
              href="/register"
              className="bg-white border border-black/10 text-black px-3 py-2 rounded-xs transition text-[10px]"
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
