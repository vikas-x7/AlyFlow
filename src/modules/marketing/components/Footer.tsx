import { FaCuttlefish } from "react-icons/fa6";
import { IoFishOutline } from "react-icons/io5";
import { PiFlowArrowThin } from "react-icons/pi";

export const Footer = () => {
  return (
    <footer className=" text-white px-6 py-16 border-t border-white/10 font-gothic">
      <div className=" flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <div className=" flex items-center justify-center rounded-sm"></div>
            <span className="text-xl  tracking-wide">Aly flow</span>
          </div>

          <p className="text-[#626262] leading-relaxed text-sm">
            Design, draw, and organize everything in one flexible workspace
          </p>
        </div>

        <div className="w-full md:w-auto"></div>
      </div>

      <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-[#626262]">
        © {new Date().getFullYear()} Alyflow. All rights reserved.
      </div>
    </footer>
  );
};
