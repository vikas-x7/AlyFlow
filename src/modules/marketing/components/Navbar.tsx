"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

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
    <>
      <header
        className={`fixed top-0  left-0 right-0 z-50 w-full text-black font-gothic transition-all duration-300 ${
          scrolled ? "bg-white shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="px-4 md:px-6 py-3 md:py-2 flex items-center justify-between max-w-7xl mx-auto relative">
          {/* Logo */}
          <Link
            href="/"
            className="text-[17px] md:text-xl font-bold tracking-tight hover:opacity-80 transition text-black absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
          >
            Alyflow
          </Link>

          {/* Center Nav Links */}
          <div className="hidden md:flex gap-6 text-[12px] absolute left-1/2 -translate-x-1/2 font-bold">
            <Link
              href="/#home"
              className="text-black hover:opacity-60 transition"
            >
              HOME
            </Link>
            <Link
              href="/#about"
              className="text-black hover:opacity-60 transition"
            >
              ABOUT
            </Link>
            <Link
              href="/#faq"
              className="text-black hover:opacity-60 transition"
            >
              FAQ
            </Link>
          </div>

        
          <div className="md:hidden w-6" />

        
          <div className="flex items-center gap-3 ml-auto">
            <nav className="hidden md:flex items-center gap-3 ">
              <Link
                href="/login"
                className="bg-black text-white px-4 py-1.5 text-[11px] transition hover:bg-black/80 rounded-[5px]"
              >
                LOGIN
              </Link>
              <Link
                href="/register"
                className="bg-white border border-black/10 text-black  px-4 py-1.5 text-[11px] rounded-[5px]"
              >
                SIGN UP
              </Link>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden z-50 p-1 text-xl"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <IoClose /> : <RxHamburgerMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col px-6 pt-24 pb-10 gap-6 md:hidden">
          <Link
            href="/#home"
            onClick={() => setIsMenuOpen(false)}
            className="text-sm font-medium text-[#626262] hover:text-black transition border-b border-black/5 pb-4"
          >
            HOME
          </Link>
          <Link
            href="/#about"
            onClick={() => setIsMenuOpen(false)}
            className="text-sm font-medium text-[#626262] hover:text-black transition border-b border-black/5 pb-4"
          >
            ABOUT
          </Link>
          <Link
            href="/#faq"
            onClick={() => setIsMenuOpen(false)}
            className="text-sm font-medium text-[#626262] hover:text-black transition border-b border-black/5 pb-4"
          >
            FAQ
          </Link>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="bg-black text-white px-4 py-3 rounded-sm text-sm text-center transition"
            >
              LOGIN
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMenuOpen(false)}
              className="bg-white border border-black/10 text-black px-4 py-3 rounded-sm text-sm text-center transition"
            >
              SIGN UP
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
