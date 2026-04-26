import Link from "next/link";
import React from "react";

export default function Topbar() {
  return (
    <div className="bg-[#C6B9FF] w-full py-0.5 font-gothic text-black">
      <div className="flex items-center justify-center text-[13px] gap-2 sm:gap-5 px-4 flex-wrap">
        <h1 className="text-center text-[8px] sm:text-[12px]">
          Unlimited Canvas is here build flows without boundaries
        </h1>
        <Link href="/login" className="bg-black px-3  rounded-4xl text-white shrink-0 text-[8px] sm:text-[13px]">
          Try now
        </Link>
      </div>
    </div>
  );
}
