import { TfiText } from "react-icons/tfi";
import { PiCursorLight } from "react-icons/pi";
import { LiaHandPaperSolid } from "react-icons/lia";

export function NodeTypeSwitcher({
  onAdd,
  active,
}: {
  onAdd: (type: "text" | "cursor" | "hand") => void;
  active?: string;
}) {
  return (
    <div className="flex gap-2  border border-[#28272F] px-3 text-[18px] text-white/70 py-2 bg-[#0D0D0D] rounded-[5px]  ">
      <button
        type="button"
        className={
          "px-2 py-1 " +
          (active === "cursor" ? "bg-white/10 text-white rounded" : "")
        }
        onClick={() => onAdd("cursor")}
      >
        <PiCursorLight />
      </button>
      <button
        type="button"
        className={
          "px-2 py-1 " +
          (active === "hand" ? "bg-white/10 text-white rounded" : "")
        }
        onClick={() => onAdd("hand")}
      >
        <LiaHandPaperSolid />
      </button>

      {/* divider */}
      <span className="w-px bg-[#28272F] self-stretch" />

      <button
        type="button"
        className={
          " px-2 py-1 " +
          (active === "text" ? "bg-white/10 text-white rounded" : "")
        }
        onClick={() => onAdd("text")}
      >
        <TfiText />
      </button>
    </div>
  );
}
