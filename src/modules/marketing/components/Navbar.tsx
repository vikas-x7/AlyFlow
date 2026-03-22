"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import Topbar from "@/modules/marketing/components/Topbar";

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
      <header className="fixed top-0 left-0 right-0 z-50 w-full text-black font-gothic mask-[linear-gradient(to_bottom,black_70%,transparent_100%)] bg-white">
        <Topbar />
        <div className="px-4 md:px-6 py-3 md:pb-10 flex items-center justify-between w-full md:max-w-[80%] mx-auto relative">
          <div className="flex gap-2 items-center justify-center">
            <img
              src="https://i.pinimg.com/736x/0d/24/b2/0d24b286f7159cfd6029e51173f3d0b0.jpg"
              alt=""
              className="w-6 h-6 rounded-[3px]"
            />
            <Link
              href="/"
              className="text-[17px] md:text-[26px] font-bold -tracking-[0.5px] hover:opacity-80 transition text-black absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
            >
              Alyflow
            </Link>
          </div>

          <div className="hidden md:flex gap-6 text-[15px] absolute left-1/2 -translate-x-1/2">
            <Link
              href="/#home"
              className="text-black hover:opacity-60 transition"
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="text-black hover:opacity-60 transition"
            >
              About
            </Link>
            <Link
              href="/#faq"
              className="text-black hover:opacity-60 transition"
            >
              Faq
            </Link>
          </div>

          <div className="md:hidden w-6" />

          <div className="flex items-center gap-3 ml-auto">
            <nav className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="bg-black text-white px-4 py-1.5 text-[15px] transition hover:bg-black/80 rounded-[30px]"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="bg-white border border-black/10 text-black px-4 py-1.5 text-[15px] rounded-[30px]"
              >
                Sign up
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

      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-1/2 h-full z-40 bg-white flex flex-col px-6 pt-20 pb-10 gap-6 md:hidden shadow-xl">
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
