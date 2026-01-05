import { TfiText } from "react-icons/tfi";
import { CiImageOn } from "react-icons/ci";
import { CiVideoOn } from "react-icons/ci";
import { HiMiniLink } from "react-icons/hi2";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoCodeSlashOutline } from "react-icons/io5";
import { PiCursorLight } from "react-icons/pi";
import { LiaHandPaperSolid } from "react-icons/lia";

export function NodeTypeSwitcher({
  onAdd,
}: {
  onAdd: (type: "text" | "image" | "video" | "link" | "file" | "code") => void;
}) {
  return (
    <div className="flex gap-2  border border-[#28272F] px-3 text-[18px] text-white/70 py-2 bg-[#0D0D0D] rounded-[5px]  ">
      <button type="button" className=" px-2 py-1">
        <PiCursorLight />
      </button>
      <button type="button" className=" px-2 py-1">
        <LiaHandPaperSolid />
      </button>
      <button
        type="button"
        className=" px-2 py-1"
        onClick={() => onAdd("text")}
      >
        <TfiText />
      </button>
      <button
        type="button"
        className="  px-2 py-1"
        onClick={() => onAdd("image")}
      >
        <CiImageOn />
      </button>
      <button
        type="button"
        className=" px-2 py-1"
        onClick={() => onAdd("video")}
      >
        <CiVideoOn />
      </button>
      <button
        type="button"
        className="  px-2 py-1"
        onClick={() => onAdd("link")}
      >
        <HiMiniLink />
      </button>
      <button
        type="button"
        className=" px-2 py-1"
        onClick={() => onAdd("file")}
      >
        <IoDocumentTextOutline />
      </button>
      <button
        type="button"
        className=" px-2 py-1"
        onClick={() => onAdd("code")}
      >
        <IoCodeSlashOutline />
      </button>
    </div>
  );
}
