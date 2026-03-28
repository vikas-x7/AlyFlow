import { TfiText } from 'react-icons/tfi';
import { PiCursorLight } from 'react-icons/pi';
import { LiaHandPaperSolid } from 'react-icons/lia';
import { LuUndo2, LuRedo2, LuTrash2 } from 'react-icons/lu';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { LuMousePointer2 } from 'react-icons/lu';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const TOOLS = [
  { type: 'cursor', icon: <LuMousePointer2 /> },
  { type: 'hand', icon: <LiaHandPaperSolid /> },
] as const;

const ACTION_TOOLS = [{ type: 'text', icon: <TfiText /> }] as const;

const UTILITY_TOOLS = [
  { type: 'delete', icon: <LuTrash2 /> },
  { type: 'undo', icon: <LuUndo2 /> },
  { type: 'redo', icon: <LuRedo2 /> },
  { type: 'theme', icon: <MdOutlineLightMode /> },
] as const;

type ToolType = 'text' | 'cursor' | 'hand' | 'undo' | 'redo' | 'import' | 'export' | 'theme' | 'delete';

export function NodeTypeSwitcher({ onAdd, active }: { onAdd: (type: ToolType) => void; active?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const btnClass = (type: string) => 'px-2 py-1 rounded transition-colors cursor-pointer ' + (active === type ? 'bg-foreground text-background' : 'hover:bg-foreground/10');

  const Divider = () => <span className="w-px bg-border self-stretch" />;

  return (
    <div className="flex gap-2  px-3 py-2.5 text-[19px] text-foreground/70 bg-panel rounded-[5px] shadow-sm">
      {TOOLS.map(({ type, icon }) => (
        <button key={type} type="button" className={btnClass(type)} onClick={() => onAdd(type)}>
          {icon}
        </button>
      ))}

      <Divider />

      {ACTION_TOOLS.map(({ type, icon }) => (
        <button key={type} type="button" className={btnClass(type)} onClick={() => onAdd(type as ToolType)}>
          {icon}
        </button>
      ))}

      <Divider />

      {UTILITY_TOOLS.map(({ type, icon }) => {
        if (type === 'theme') {
          return (
            <button
              key={type}
              type="button"
              className="px-2 py-1 rounded transition-colors cursor-pointer hover:bg-foreground/10"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              title="Toggle theme"
            >
              {mounted ? resolvedTheme === 'dark' ? <MdOutlineLightMode /> : <MdOutlineDarkMode /> : <MdOutlineLightMode />}
            </button>
          );
        }

        return (
          <button key={type} type="button" className={btnClass(type)} onClick={() => onAdd(type)}>
            {icon}
          </button>
        );
      })}
    </div>
  );
}
