'use client';

import { useEffect, useState } from 'react';

export function Loader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`flex items-center justify-center gap-3 transition-opacity duration-700 ease-in-out ${show ? 'opacity-100' : 'opacity-0'}`}>
      <img src="/images/alylogo.jpg" alt="Alyflow" className="w-7 h-7 rounded-[5px] animate-pulse" />
      <span className="font-gothic text-[20px]  tracking-wide text-white animate-pulse">Alyflow</span>
    </div>
  );
}
