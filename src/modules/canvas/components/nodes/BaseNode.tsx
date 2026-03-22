import type { ReactNode } from "react";
import { Handle, Position } from "reactflow";
import { useState } from "react";

interface BaseNodeProps {
  children: ReactNode;
  bgColor?: string;
  title?: string;
  titleColor?: string;
  indicatorColor?: string;
}

export function BaseNode({
  children,
  bgColor,
  title,
  titleColor,
  indicatorColor,
}: BaseNodeProps) {
  const [hovered, setHovered] = useState(false);

  const handleStyle = {
    opacity: hovered ? 1 : 0,
    transition: "opacity 0.1s",
    backgroundColor: "white",
    borderRadius: "50%",
  };

  return (
    <div
      className="rounded-[5px] min-w-45 p-2 flex items-center justify-center relative"
      style={{ backgroundColor: bgColor || "#E8E8E8" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-full">{children}</div>

      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        style={handleStyle}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        style={handleStyle}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        style={handleStyle}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        style={handleStyle}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={handleStyle}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        style={handleStyle}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        style={handleStyle}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        style={handleStyle}
      />
    </div>
  );
}
