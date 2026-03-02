import Link from "next/link";

export const Hero = () => {
  return (
    <section className="mb-20 flex items-center justify-center px-6 bg-cover bg-center relative font-gothic">
      <div className="relative max-w-6xl w-full  z-10 mt-50 text-start">
        <h1 className="text-4xl md:text-5xl text-white/90 mb-6 tracking-tight">
          Design, draw, and organize everything <br /> in one flexible workspace
        </h1>

        <p className="text-gray-300 mb-8">
          Map systems, plan projects, and structure complex ideas with complete
          freedom and precision
        </p>

        <Link
          href="/canvas"
          className="inline-block rounded bg-white transition text-black px-6 py-2 text-sm font-medium"
        >
          Get start now
        </Link>
      </div>
    </section>
  );
};
