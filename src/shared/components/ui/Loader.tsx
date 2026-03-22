"use client";

import { useEffect, useState } from "react";

export function Loader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 transition-opacity duration-700 ease-in-out ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src="https://i.pinimg.com/736x/0d/24/b2/0d24b286f7159cfd6029e51173f3d0b0.jpg"
        alt="Alyflow"
        className="w-10 h-10 rounded-[5px] animate-pulse"
      />
      <span className="font-gothic text-[15px] font-semibold tracking-wide text-white animate-pulse">
        Alyflow
      </span>
    </div>
  );
}