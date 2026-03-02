export const Footer = () => {
  return (
    <footer className=" text-white px-6 py-16 border-t border-white/10 font-gothic">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        {/* Left Side */}
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-white rounded-sm"></div>
            <span className="text-xl  tracking-wide">Aly flow</span>
          </div>

          <p className="text-gray-400 leading-relaxed text-sm">
            In this new era of technology we look in the future with certainty
            and pride to for our company and business.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-auto">
          <div className="flex flex-col sm:flex-row w-full max-w-md md:max-w-none">
            <input
              type="email"
              placeholder="NAME@EMAIL.COM"
              className="flex-1 bg-white text-black px-4 py-3 text-sm outline-none"
            />
            <button className="bg-[#111] border border-white/20 px-6 py-3 text-sm font-medium hover:bg-white hover:text-black transition">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Dopler. All rights reserved.
      </div>
    </footer>
  );
};
