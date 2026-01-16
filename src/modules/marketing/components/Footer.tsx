import { IoFishOutline } from "react-icons/io5";

export const Footer = () => {
  return (
    <footer className=" text-white px-6 py-16 border-t border-white/10 font-gothic">
      <div className=" flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 flex items-center justify-center rounded-sm">
              <IoFishOutline size={50} />
            </div>
            <span className="text-xl  tracking-wide">Aly flow</span>
          </div>

          <p className="text-gray-400 leading-relaxed text-sm">
            Design, draw, and organize everything in one flexible workspace
          </p>
        </div>

        <div className="w-full md:w-auto">
          <div className="flex flex-col sm:flex-row w-full max-w-md md:max-w-none">
            <input
              type="email"
              placeholder="NAME@EMAIL.COM"
              className="flex-1 bg-white text-black px-4 py-3 text-sm outline-none"
            />
            <button className="bg-[#E72A0D] border border-white/20 px-6 py-3 text-sm font-medium hover:bg-[#E72A0D]/80  hover:text-black transition">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Alyflow. All rights reserved.
      </div>
    </footer>
  );
};
