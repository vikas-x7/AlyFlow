"use client";

import { use } from "react";
import "reactflow/dist/style.css";
import ReactFlow, {
  Background,
  BackgroundVariant,
  MiniMap,
  ReactFlowInstance,
} from "reactflow";
import { useState, useRef, useCallback } from "react";

import { NodeTypeSwitcher } from "@/modules/canvas/components/toolbar/NodeTypeSwitcher";
import { DrawingOverlay } from "@/modules/canvas/components/DrawingOverlay";
import { useCanvas } from "@/modules/canvas/hooks/useCanvas";
import { useAutoSave } from "@/modules/canvas/hooks/useAutoSave";
import { Loader } from "@/shared/components/ui/Loader";

interface CanvasPageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

export default function CanvasPage({ params }: CanvasPageProps) {
  const { workflowId } = use(params);
  return <CanvasClient workflowId={workflowId} />;
}

function CanvasClient({ workflowId }: { workflowId: string }) {
  const {
    nodes,
    edges,
    nodeTypes,
    edgeTypes,
    isLoading,
    loadError,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNodeOfType,
    addCustomNode,
  } = useCanvas(workflowId);

  const [activeTool, setActiveTool] = useState<string>("cursor");
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isConnectingRef = useRef(false);

  const handleDrawingComplete = useCallback(
    (
      flowPoints: { x: number; y: number }[],
      color: string,
      strokeWidth: number,
    ) => {
      if (flowPoints.length < 2) return;
      const xs = flowPoints.map((p) => p.x);
      const ys = flowPoints.map((p) => p.y);
      const minX = Math.min(...xs);
      const minY = Math.min(...ys);
      const width = Math.max(Math.max(...xs) - minX, 1);
      const height = Math.max(Math.max(...ys) - minY, 1);
      const relPoints = flowPoints.map((p) => ({
        x: p.x - minX,
        y: p.y - minY,
      }));
      // DrawingNode adds internal padding (strokeWidth + 6) around the path
      // via an SVG translate. Offset the node position so the visible stroke
      // lands exactly where the user drew it.
      const padding = strokeWidth + 6;
      addCustomNode(
        "drawing",
        { points: relPoints, color, strokeWidth, width, height },
        { x: minX - padding, y: minY - padding },
      );
    },
    [addCustomNode],
  );

  const autosave = useAutoSave({
    workflowId,
    enabled: true,
    ready: !isLoading,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#101011]">
        <Loader />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#101011]">
        <div className="rounded border border-red-900 bg-red-950 px-3 py-2 text-sm text-red-400">
          {loadError}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-0px)] flex flex-col">
      <div className="absolute top-4 right-4 z-50">
        {autosave.error ? (
          <div className="rounded border border-red-400 bg-red-50 px-3 py-1 text-xs text-red-700">
            Autosave failed. Retrying...
          </div>
        ) : autosave.isSaving ? (
          <div className="rounded border border-amber-300 bg-amber-50 px-3 py-1 text-xs text-amber-800">
            Saving...
          </div>
        ) : autosave.lastSavedAt ? (
          <div className="rounded border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs text-emerald-800">
            Saved {autosave.lastSavedAt.toLocaleTimeString()}
          </div>
        ) : null}
      </div>

      <div className="absolute bottom-4 z-90 right-130">
        <NodeTypeSwitcher
          active={activeTool}
          onAdd={(type) => {
            // set active tool for UI only; placement happens on canvas clicks
            setActiveTool(type);
          }}
        />
      </div>

      <div className="flex-1 bg-[#101011] relative" ref={containerRef}>
        <DrawingOverlay
          active={activeTool === "pen"}
          rfInstance={rfInstance}
          containerRef={containerRef}
          color="#e05555"
          strokeWidth={3}
          onDrawingComplete={handleDrawingComplete}
        />
        <ReactFlow
          onInit={(instance) => setRfInstance(instance)}
          onConnectStart={() => {
            isConnectingRef.current = true;
          }}
          onConnectEnd={() => {
            setTimeout(() => {
              isConnectingRef.current = false;
            }, 50);
          }}
          onConnect={(connection) => {
            isConnectingRef.current = false;
            onConnect(connection);
          }}
          onPaneClick={(event: any) => {
            if (isConnectingRef.current) return;
            if (!rfInstance) return;
            if (
              !["text", "image", "video", "link", "file", "code"].includes(
                activeTool,
              )
            )
              return;
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const pos = rfInstance.project({ x, y });
            addNodeOfType(activeTool as any, pos);
          }}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ minZoom: 0.5, maxZoom: 1 }}
          minZoom={0.1}
          maxZoom={2}
          defaultViewport={{ x: 0, y: 0, zoom: 0.1 }}
        >
          <MiniMap
            style={{
              width: 120,
              height: 80,
              background: "#0D0D0D",
            }}
            pannable
            zoomable
          />
        </ReactFlow>
      </div>
    </div>
  );
}
