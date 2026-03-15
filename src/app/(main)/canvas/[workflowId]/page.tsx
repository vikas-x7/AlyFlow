"use client";

import { use } from "react";
import "reactflow/dist/style.css";
import ReactFlow, {
  MiniMap,
  ReactFlowInstance,
} from "reactflow";
import type { Edge } from "reactflow";
import { useState, useRef, useCallback } from "react";

import { NodeTypeSwitcher } from "@/modules/canvas/components/toolbar/NodeTypeSwitcher";
import { NodeFormatPanel } from "@/modules/canvas/components/toolbar/NodeFormatPanel";
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
    onReconnect,
    addNodeOfType,
  } = useCanvas(workflowId);

  const [activeTool, setActiveTool] = useState<string>("cursor");
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const [zoom, setZoom] = useState<number>(0.1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasFittedRef = useRef(false);
  const edgeReconnectSuccessful = useRef(true);

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
        ) : null}
      </div>

      <div className="absolute bottom-4 z-90 right-130">
        <NodeTypeSwitcher
          active={activeTool}
          onAdd={(type) => {
            setActiveTool(type);
          }}
        />
      </div>

      <div className="flex-1 bg-[#101011] relative" ref={containerRef}>
        <div className="absolute bottom-0  z-50">
          <div className="rounded-r-[5px]  border  border-white/5 py-2  text-center w-[100px] text-[15px] text-white font-gothic">
            {Math.round(zoom * 100)}%
          </div>
        </div>
        <ReactFlow
          onInit={(instance) => {
            setRfInstance(instance);
            try {
              const v = (instance as any).getViewport?.();
              if (typeof v?.zoom === "number") setZoom(v.zoom);
            } catch (e) { }
            if (!hasFittedRef.current && nodes.length > 0) {
              hasFittedRef.current = true;
              setTimeout(() => {
                instance.fitView({ minZoom: 0.3, maxZoom: 1.5, padding: 0.2 });
                try {
                  const v = (instance as any).getViewport?.();
                  if (typeof v?.zoom === "number") setZoom(v.zoom);
                } catch (e) { }
              }, 50);
            }
          }}
          onMove={(_e: any, viewport?: any) => {
            const z = viewport?.zoom ?? _e?.viewport?.zoom;
            if (typeof z === "number") setZoom(z);
          }}
          onMoveEnd={(_e: any, viewport?: any) => {
            const z = viewport?.zoom ?? _e?.viewport?.zoom;
            if (typeof z === "number") setZoom(z);
          }}
          onConnect={onConnect}
          onPaneClick={(event: any) => {
            if (!rfInstance) return;
            if (activeTool !== "text") return;
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const pos = rfInstance.project({ x, y });
            addNodeOfType("text", pos);
          }}
          onReconnect={(oldEdge, newConnection) => {
            edgeReconnectSuccessful.current = true;
            onReconnect(oldEdge, newConnection);
          }}
          onReconnectStart={() => {
            edgeReconnectSuccessful.current = false;
          }}
          onReconnectEnd={(_, edge) => {
            if (!edgeReconnectSuccessful.current) {
              onEdgesChange([{ id: (edge as Edge).id, type: "remove" }]);
            }
            edgeReconnectSuccessful.current = true;
          }}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          minZoom={0.1}
          maxZoom={5}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          reconnectRadius={50}
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
          {/* NodeFormatPanel must be inside ReactFlow to access zustand store */}
          <NodeFormatPanel />
        </ReactFlow>
      </div>
    </div>
  );
}
