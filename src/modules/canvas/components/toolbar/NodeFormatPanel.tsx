"use client";

import { useCallback, useState } from "react";
import { useReactFlow, useOnSelectionChange } from "reactflow";
import type { Node, Edge } from "reactflow";
import { useCanvasStore } from "../../store/canvas.store";

const PRESET_COLORS = [
  "#FF6B6B", // red
  "#FF9F43", // orange
  "#FFEAA7", // yellow
  "#6BCB77", // green
  "#91C788", // sage green
  "#4D96FF", // blue
  "#00D2D3", // teal
  "#C77DFF", // purple
  "#B983FF", // lavender
  "#F8A5C2", // pink
  "#FFA447", // amber
  "#A8865C", // brown
  "#D9D9D9", // gray
  "#E8E8E8", // off-white

  "#4A4A6A", // slate
  "#CA2A30",
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

  const globalEdgeType = useCanvasStore((s) => s.globalEdgeType);
  const globalEdgeThickness = useCanvasStore((s) => s.globalEdgeThickness);
  const setGlobalEdgePrefs = useCanvasStore((s) => s.setGlobalEdgePrefs);

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
      const newType = key === "type" ? value : globalEdgeType;
      const newThickness = key === "strokeWidth" ? value : globalEdgeThickness;
      setGlobalEdgePrefs(newType, newThickness);

      setEdges((eds) =>
        eds.map((e) =>
          key === "type"
            ? { ...e, type: "custom", animated: value === "animated", data: { ...e.data, edgeType: value } }
            : { ...e, type: "custom", data: { ...e.data, [key]: value } }
        ),
      );

      if (selectedEdge) {
        setSelectedEdge((prev) =>
          prev
            ? key === "type"
              ? { ...prev, type: "custom", animated: value === "animated", data: { ...prev.data, edgeType: value } }
              : { ...prev, type: "custom", data: { ...prev.data, [key]: value } }
            : prev,
        );
      }
    },
    [setEdges, globalEdgeType, globalEdgeThickness, setGlobalEdgePrefs, selectedEdge],
  );

  const { bgColor, bold, italic, underline } = selectedNode?.data || {};
  const currentEdgeType = globalEdgeType;
  const currentThickness = globalEdgeThickness;

  return (
    <>
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-100 bg-panel border border-border text-foreground/70 text-[9px] font-mono px-4 py-2 rounded-[5px] shadow-lg">
          Please select a node first
        </div>
      )}

      <div className="fixed top-2 right-1 z-50 w-37.5 bg-panel border border-border rounded-[5px] p-3 flex flex-col gap-3">
        {/* Header */}
        <div className="text-[11px] text-foreground/50 font-mono uppercase tracking-wider">
          Node Style
        </div>

        {/* Background */}
        <div className="flex flex-col">
          <div className="text-[10px] text-foreground/40 font-mono uppercase tracking-wider mb-3">
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
                      ? "var(--foreground)"
                      : "var(--border-color)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-border" />

        {/* Text Format */}
        <div className="flex flex-col gap-2">
          <div className="text-[10px] text-foreground/40 font-mono uppercase tracking-wider">
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
                  className={`w-8 h-8 flex items-center justify-center rounded-[5px] text-[14px] cursor-pointer transition-all duration-150 border ${className} ${active
                    ? "bg-foreground/15 text-foreground border-foreground/30"
                    : "bg-transparent text-foreground/50 border-border hover:bg-foreground/5"
                    }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full h-px bg-border" />

        {/* Edge Style */}
        <div className="flex flex-col gap-2">
          <div className="text-[10px] text-foreground/40 font-mono uppercase tracking-wider">
            Edge Type
          </div>
          <div className="grid grid-cols-2 gap-1">
            {EDGE_TYPES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => updateEdge("type", value)}
                className={`px-2 py-1 text-[10px] font-mono rounded-[4px] border transition-all cursor-pointer ${currentEdgeType === value ||
                  (value === "animated" && selectedEdge?.animated)
                  ? "bg-foreground/15 text-foreground border-foreground/30"
                  : "bg-transparent text-foreground/50 border-border hover:bg-foreground/5"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-[10px] text-foreground/40 font-mono uppercase tracking-wider">
            Edge Thickness
          </div>
          <div className="flex gap-1.5 items-center">
            {EDGE_THICKNESS.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => updateEdge("strokeWidth", size)}
                className={`w-8 h-8 flex items-center justify-center rounded-[5px] border cursor-pointer transition-all ${currentThickness === size
                  ? "bg-foreground/15 border-foreground/30"
                  : "bg-transparent border-border hover:bg-foreground/5"
                  }`}
              >
                <div
                  className="w-4 bg-foreground/70 rounded-full"
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
