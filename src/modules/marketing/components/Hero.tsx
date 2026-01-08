import Link from "next/link";

export const Hero = () => {
  return (
    <section className="mb-50 flex items-center justify-center px-6 bg-cover bg-center relative font-gothic">
      <div className="relative max-w-6xl w-full  z-10 mt-50 text-start">
        <h1 className="text-4xl md:text-[42px] text-white/90 mb-6 tracking-tight">
          Design, draw, and organize everything <br /> in one flexible workspace
        </h1>

        <p className="text-gray-300 mb-8">
          Map systems, plan projects, and structure complex ideas with <br />
          complete freedom and precision
        </p>

        <Link
          href="/canvas"
          className="inline-block rounded bg-white transition text-black px-6 py-2 text-sm font-medium"
        >
          Get start now
        </Link>

        <div className="flex absolute right-0 -top-10 justify-center w-full md:w-auto">
          <img
            className="w-120 opacity-40
            mask-[radial-gradient(circle_at_center,black_5%,transparent_100%)]
            [-webkit-mask-image:radial-gradient(circle_at_center,black_5%,transparent_100%)]
            mask-no-repeat
            mask-size-[100%_100%]"
            src="https://cdn.prod.website-files.com/6812d02840d393aa2c663370/6847f9fe57cfb544f7d5818a_hero-home.svg"
            alt="Hero Background"
          />
        </div>
      </div>
    </section>
  );
};
