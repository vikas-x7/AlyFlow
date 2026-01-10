import Link from "next/link";
import React from "react";
import { GiCrossedAirFlows } from "react-icons/gi";

function Navbar() {
  return (
    <div>
      <header className="bg-black  fixed w-full z-90 py-1 text-white  font-gothic border-b border-white/5 ">
        <div className="px-6 py-2 flex items-center justify-between">
          <div className="flex gap-5 text-[14px]">
            <p>HOME </p>
            <p>ABOUT </p>
            <p>FAQ </p>
          </div>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-[23px]"
          >
            Alyflow
          </Link>

          <nav className="flex items-center gap-3 text-sm ">
            <Link
              href="/login"
              className="bg-black text-white/80 px-2  py-1 rounded-sm"
            >
              LOGIN
            </Link>
            <Link
              href="/login"
              className="bg-black text-white/80 px-2  py-1 rounded-sm"
            >
              SING UP
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
