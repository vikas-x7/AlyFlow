import { TfiText } from "react-icons/tfi";
import { PiCursorLight } from "react-icons/pi";
import { LiaHandPaperSolid } from "react-icons/lia";
import { BsStars } from "react-icons/bs";
import { LuUndo2, LuRedo2, LuTrash2 } from "react-icons/lu";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { LuMousePointer2, LuSend } from "react-icons/lu";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOOLS = [
  { type: "cursor", icon: <LuMousePointer2 /> },
  { type: "hand", icon: <LiaHandPaperSolid /> },
] as const;

const ACTION_TOOLS = [
  { type: "text", icon: <TfiText /> },
  { type: "ai", icon: <BsStars /> },
] as const;

const UTILITY_TOOLS = [
  { type: "delete", icon: <LuTrash2 /> },
  { type: "undo", icon: <LuUndo2 /> },
  { type: "redo", icon: <LuRedo2 /> },
  { type: "theme", icon: <MdOutlineLightMode /> },
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
  | "delete";

export function NodeTypeSwitcher({
  onAdd,
  active,
}: {
  onAdd: (type: ToolType) => void;
  active?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  useEffect(() => setMounted(true), []);

  const btnClass = (type: string) =>
    "px-2 py-1 rounded transition-colors cursor-pointer " +
    (active === type
      ? "bg-foreground text-background"
      : "hover:bg-foreground/10");

  const Divider = () => <span className="w-px bg-border self-stretch" />;

  return (
    <div className="flex gap-2  px-3 py-2.5 text-[19px] text-foreground/70 bg-panel rounded-[5px] shadow-sm">
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
          onClick={() => {
            if (type === "ai" && active === "ai") {
              onAdd("cursor");
            } else {
              onAdd(type as ToolType);
            }
          }}
        >
          {icon}
        </button>
      ))}

      <Divider />

      {UTILITY_TOOLS.map(({ type, icon }) => {
        if (type === "theme") {
          return (
            <button
              key={type}
              type="button"
              className="px-2 py-1 rounded transition-colors cursor-pointer hover:bg-foreground/10"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              title="Toggle theme"
            >
              {mounted ? (
                resolvedTheme === "dark" ? (
                  <MdOutlineLightMode />
                ) : (
                  <MdOutlineDarkMode />
                )
              ) : (
                <MdOutlineLightMode />
              )}
            </button>
          );
        }

        return (
          <button
            key={type}
            type="button"
            className={btnClass(type)}
            onClick={() => onAdd(type)}
          >
            {icon}
          </button>
        );
      })}

      <AnimatePresence>
        {active === "ai" && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-[650px] rounded-[5px] bg-panel shadow-lg px-4 py-2 flex items-center gap-2"
          >
            <BsStars className="text-foreground/50 shrink-0" />
            <input
              type="text"
              autoFocus
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Describe what you want to generate..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-foreground/40 font-gothic"
              onKeyDown={(e) => {
                if (e.key === "Enter" && aiPrompt.trim()) {
               
                  console.log("Submit AI prompt:", aiPrompt);
                  setAiPrompt("");
                  onAdd("cursor"); 
                }
              }}
            />
            <button
              disabled={!aiPrompt.trim()}
              onClick={() => {
                if (aiPrompt.trim()) {
                  console.log("Submit AI prompt:", aiPrompt);
                  setAiPrompt("");
                  onAdd("cursor");
                }
              }}
              className="w-7 h-7 bg-foreground text-background flex items-center justify-center rounded-[5px] transition-all hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <LuSend size={12} className="ml-0.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
