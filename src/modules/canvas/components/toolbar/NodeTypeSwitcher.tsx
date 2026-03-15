import { TfiText } from "react-icons/tfi";
import { PiCursorLight } from "react-icons/pi";
import { LiaHandPaperSolid } from "react-icons/lia";
import { BsStars } from "react-icons/bs";
import { MdOutlineFullscreen } from "react-icons/md";
import { LuUndo2, LuRedo2 } from "react-icons/lu";
import { PiExportLight } from "react-icons/pi";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { LuMousePointer2 } from "react-icons/lu";
import { CiImport } from "react-icons/ci";

const TOOLS = [
  { type: "cursor", icon: <LuMousePointer2 /> },
  { type: "hand", icon: <LiaHandPaperSolid /> },
] as const;

const ACTION_TOOLS = [
  { type: "text", icon: <TfiText /> },
  { type: "ai", icon: <BsStars /> },
] as const;

const UTILITY_TOOLS = [
  { type: "undo", icon: <LuUndo2 /> },
  { type: "redo", icon: <LuRedo2 /> },

  { type: "theme", icon: <MdOutlineLightMode /> },
  { type: "fullscreen", icon: <MdOutlineFullscreen /> },
] as const;

type ToolType =
  | "text"
  | "cursor"
  | "hand"
  | "ai"
  | "undo"
  | "redo"
  | "import"
  | "export"
  | "theme"
  | "fullscreen";

export function NodeTypeSwitcher({
  onAdd,
  active,
}: {
  onAdd: (type: ToolType) => void;
  active?: string;
}) {
  const btnClass = (type: string) =>
    "px-2 py-1 rounded transition-colors cursor-pointer " +
    (active === type ? "bg-[#D9D9D9] text-black" : "");

  const Divider = () => <span className="w-px bg-[#28272F] self-stretch" />;

  return (
    <div className="flex gap-2 border border-[#151515] px-3  py-2.5 text-[19px] text-white/70  bg-[#0D0D0D] rounded-[5px]">
      {TOOLS.map(({ type, icon }) => (
        <button
          key={type}
          type="button"
          className={btnClass(type)}
          onClick={() => onAdd(type)}
        >
          {icon}
        </button>
      ))}

      <Divider />

      {ACTION_TOOLS.map(({ type, icon }) => (
        <button
          key={type}
          type="button"
          className={btnClass(type)}
          onClick={() => onAdd(type)}
        >
          {icon}
        </button>
      ))}

      {UTILITY_TOOLS.map(({ type, icon }) => (
        <button
          key={type}
          type="button"
          className={btnClass(type)}
          onClick={() => onAdd(type)}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
