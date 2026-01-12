import type { ReactNode } from "react";
import { Handle, Position } from "reactflow";
import { useState } from "react";

interface BaseNodeProps {
  title: string;
  children: ReactNode;
  showIndicators?: boolean;
  titleColor?: string;
  indicatorColor?: string;
}

export function BaseNode({
  title,
  children,
  showIndicators = true,
  titleColor = "#e05555",
  indicatorColor = "#e03e3e",
}: BaseNodeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded min-w-55 relative bg-[#1a1a1a] border border-[#2e2e2e] shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-[#2e2e2e]">
        <div className="flex items-center gap-2">
          {showIndicators && (
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: indicatorColor }}
            />
          )}
          <span
            className="text-xs font-semibold tracking-wide"
            style={{ color: titleColor }}
          >
            {title}
          </span>
        </div>

        {showIndicators && (
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: indicatorColor }}
          />
        )}
      </div>

      {/* Body */}
      <div className="px-3 py-2 text-xs leading-relaxed text-[#9a9a9a]">
        {children}
      </div>

      {/* Handles — only visible on hover */}
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }}
      />

      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }}
      />

      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }}
      />

      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }}
      />
    </div>
  );
}
