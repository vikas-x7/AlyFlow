"use client";

import { useCallback, useState } from "react";
import { useReactFlow, useOnSelectionChange } from "reactflow";
import type { Node, Edge } from "reactflow";

const PRESET_COLORS = [
  "#61A3BA",
  "#91C788",
  "#B983FF",
  "#FFA447",
  "#E05555",
  "#F5F5F5",
  "#D9D9D9",
  "#FFFFFF",
  "#F5F5F5",
];

const EDGE_TYPES = [
  { value: "default", label: "Bezier" },
  { value: "straight", label: "Straight" },
  { value: "step", label: "Step" },
  { value: "smoothstep", label: "Smooth" },
  { value: "animated", label: "Animated" },
] as const;

const EDGE_THICKNESS = [1, 2, 3, 5] as const;

export function NodeFormatPanel() {
  const { setNodes, setEdges } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [showToast, setShowToast] = useState(false);

  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      setSelectedNode(nodes.length === 1 ? nodes[0] : null);
      setSelectedEdge(edges.length === 1 ? edges[0] : null);
    },
  });

  const showSelectToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const updateNodeData = useCallback(
    (key: string, value: any) => {
      if (!selectedNode) {
        showSelectToast();
        return;
      }
      setNodes((nds) =>
        nds.map((n) =>
          n.id === selectedNode.id
            ? { ...n, data: { ...n.data, [key]: value } }
            : n,
        ),
      );
      setSelectedNode((prev) =>
        prev ? { ...prev, data: { ...prev.data, [key]: value } } : prev,
      );
    },
    [selectedNode, setNodes],
  );

  const updateEdge = useCallback(
    (key: string, value: any) => {
      if (!selectedEdge) {
        showSelectToast();
        return;
      }
      setEdges((eds) =>
        eds.map((e) =>
          e.id === selectedEdge.id
            ? key === "type"
              ? { ...e, type: value, animated: value === "animated" }
              : { ...e, data: { ...e.data, [key]: value } }
            : e,
        ),
      );
      setSelectedEdge((prev) =>
        prev
          ? key === "type"
            ? { ...prev, type: value, animated: value === "animated" }
            : { ...prev, data: { ...prev.data, [key]: value } }
          : prev,
      );
    },
    [selectedEdge, setEdges],
  );

  const { bgColor, bold, italic, underline } = selectedNode?.data || {};
  const currentEdgeType = selectedEdge?.type ?? "default";
  const currentThickness = selectedEdge?.data?.strokeWidth ?? 1.5;

  return (
    <>
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-[#1a1a1a] border border-white/10 text-white/70 text-[12px] font-mono px-4 py-2 rounded-[5px] shadow-lg">
          Please select a node first
        </div>
      )}

      <div className="fixed top-2 right-1 z-50 w-37.5 bg-[#0D0D0D] border border-white/5 rounded-[5px] p-3 flex flex-col gap-3">
        {/* Header */}
        <div className="text-[11px] text-white/40 font-mono uppercase tracking-wider">
          Node Style
        </div>

        {/* Background */}
        <div className="flex flex-col">
          <div className="text-[10px] text-white/30 font-mono uppercase tracking-wider mb-3">
            Background
          </div>
          <div className="grid grid-cols-4 gap-2">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => updateNodeData("bgColor", color)}
                className="w-6 h-6 border-2 transition-all duration-150 hover:scale-110 cursor-pointer rounded-[5px]"
                style={{
                  backgroundColor: color,
                  borderColor:
                    (bgColor || "#61A3BA") === color
                      ? "#ffffff"
                      : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-[#28272F]" />

        {/* Text Format */}
        <div className="flex flex-col gap-2">
          <div className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
            Text Format
          </div>
          <div className="flex gap-1.5">
            {[
              { key: "bold", label: "B", className: "font-bold" },
              { key: "italic", label: "I", className: "italic" },
              { key: "underline", label: "U", className: "underline" },
            ].map(({ key, label, className }) => {
              const active = selectedNode?.data?.[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    updateNodeData(key, !selectedNode?.data?.[key])
                  }
                  className={`w-8 h-8 flex items-center justify-center rounded-[5px] text-[14px] cursor-pointer transition-all duration-150 border ${className} ${
                    active
                      ? "bg-white/15 text-white border-white/30"
                      : "bg-transparent text-white/50 border-white/10 hover:bg-white/5"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full h-px bg-[#28272F]" />

        {/* Edge Style */}
        <div className="flex flex-col gap-2">
          <div className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
            Edge Type
          </div>
          <div className="grid grid-cols-2 gap-1">
            {EDGE_TYPES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => updateEdge("type", value)}
                className={`px-2 py-1 text-[10px] font-mono rounded-[4px] border transition-all cursor-pointer ${
                  currentEdgeType === value ||
                  (value === "animated" && selectedEdge?.animated)
                    ? "bg-white/15 text-white border-white/30"
                    : "bg-transparent text-white/40 border-white/10 hover:bg-white/5"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
            Edge Thickness
          </div>
          <div className="flex gap-1.5 items-center">
            {EDGE_THICKNESS.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => updateEdge("strokeWidth", size)}
                className={`w-8 h-8 flex items-center justify-center rounded-[4px] border cursor-pointer transition-all ${
                  currentThickness === size
                    ? "bg-white/15 border-white/30"
                    : "bg-transparent border-white/10 hover:bg-white/5"
                }`}
              >
                <div
                  className="w-4 bg-white/70 rounded-full"
                  style={{ height: `${size}px` }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
