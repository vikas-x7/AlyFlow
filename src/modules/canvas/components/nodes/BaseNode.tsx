import type { ReactNode } from "react";
import { Handle, NodeResizer, Position } from "reactflow";
import { useState } from "react";
import { useCanvasStore } from "../../store/canvas.store";

interface BaseNodeProps {
  children: ReactNode;
  id: string;
  selected?: boolean;
  isUserResized?: boolean;
  bgColor?: string;
  title?: string;
  titleColor?: string;
  indicatorColor?: string;
}

export function BaseNode({
  children,
  id,
  selected,
  isUserResized,
  bgColor,
  title,
  titleColor,
  indicatorColor,
}: BaseNodeProps) {
  const [hovered, setHovered] = useState(false);
  const setNodes = useCanvasStore((s) => s.setNodes);

  const handleStyle = {
    opacity: hovered ? 1 : 0,
    transition: "opacity 0.1s",
    backgroundColor: "white",
    borderRadius: "50%",
  };

  return (
    <div
      className={`rounded-[5px] p-2 flex items-center justify-center relative ${
        isUserResized ? "w-full h-full min-w-20 min-h-11" : "min-w-45"
      }`}
      style={{ backgroundColor: bgColor || "#E8E8E8" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <NodeResizer
        isVisible={selected}
        minWidth={80}
        minHeight={44}
        handleStyle={{
          width: 8,
          height: 8,
          borderRadius: 2,
          backgroundColor: "var(--foreground)",
          border: "1px solid var(--background)",
        }}
        lineStyle={{
          borderColor: "var(--foreground)",
          opacity: 0.75,
        }}
        onResizeStart={() => {
          setNodes((nodes) =>
            nodes.map((node) =>
              node.id === id
                ? { ...node, data: { ...node.data, isUserResized: true } }
                : node,
            ),
          );
        }}
      />

      <div className="w-full h-full flex items-center">{children}</div>

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
