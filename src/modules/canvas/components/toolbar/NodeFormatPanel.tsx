"use client";

import { useCallback, useState } from "react";
import { useReactFlow, useOnSelectionChange } from "reactflow";
import type { Node } from "reactflow";

const PRESET_COLORS = [
  "#61A3BA",
  "#91C788",
  "#B983FF",
  "#FFA447",
  "#E05555",
  "#F5F5F5",
  "#1E1E1E",
  "#FFFFFF",
  "#F5F5F5",
  "#1E1E1E",
  "#FFFFFF",
  "#F5F5F5",
];

export function NodeFormatPanel() {
  const { setNodes } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      if (nodes.length === 1) {
        setSelectedNode(nodes[0]);
      } else {
        setSelectedNode(null);
      }
    },
  });

  const updateNodeData = useCallback(
    (key: string, value: any) => {
      if (!selectedNode) return;
      setNodes((nds) =>
        nds.map((n) =>
          n.id === selectedNode.id
            ? { ...n, data: { ...n.data, [key]: value } }
            : n,
        ),
      );
      // Update local state too
      setSelectedNode((prev) =>
        prev ? { ...prev, data: { ...prev.data, [key]: value } } : prev,
      );
    },
    [selectedNode, setNodes],
  );

  if (!selectedNode) return null;

  const { bgColor, bold, italic, underline } = selectedNode.data || {};

  return (
    <div className="fixed top-2 right-1 z-50 w-37.5 bg-[#0D0D0D] border border-[#28272F] rounded-[5px] p-3 flex flex-col gap-3 ">
      {/* Header */}
      <div className="text-[11px] text-white/40 font-mono uppercase tracking-wider">
        Node Style
      </div>

      {/* Color Picker */}
      <div className="flex flex-col   justify-between">
        <div className="text-[10px] text-white/30 font-mono uppercase tracking-wider mb-3">
          Background
        </div>
        <div className="grid grid-cols-4 gap-2 ">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => updateNodeData("bgColor", color)}
              className="w-6 h-6  border-2 transition-all duration-150 hover:scale-110 cursor-pointer rounded-[5px]"
              style={{
                backgroundColor: color,
                borderColor:
                  (bgColor || "#61A3BA") === color
                    ? "#ffffff"
                    : "rgba(255,255,255,0.1)",
              }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#28272F]" />

      {/* Text Formatting — only for text nodes */}
      {selectedNode.type === "text" && (
        <div className="flex flex-col gap-2">
          <div className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
            Text Format
          </div>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => updateNodeData("bold", !bold)}
              className={`w-8 h-8 flex items-center justify-center rounded-[4px] text-[14px] font-bold cursor-pointer transition-all duration-150 border ${
                bold
                  ? "bg-white/15 text-white border-white/30"
                  : "bg-transparent text-white/50 border-white/10 hover:bg-white/5"
              }`}
              title="Bold"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => updateNodeData("italic", !italic)}
              className={`w-8 h-8 flex items-center justify-center rounded-[4px] text-[14px] italic cursor-pointer transition-all duration-150 border ${
                italic
                  ? "bg-white/15 text-white border-white/30"
                  : "bg-transparent text-white/50 border-white/10 hover:bg-white/5"
              }`}
              title="Italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => updateNodeData("underline", !underline)}
              className={`w-8 h-8 flex items-center justify-center rounded-[4px] text-[14px] underline cursor-pointer transition-all duration-150 border ${
                underline
                  ? "bg-white/15 text-white border-white/30"
                  : "bg-transparent text-white/50 border-white/10 hover:bg-white/5"
              }`}
              title="Underline"
            >
              U
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
