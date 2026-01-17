"use client";

import { use } from "react";
import "reactflow/dist/style.css";
import ReactFlow, { Background, BackgroundVariant } from "reactflow";

import { NodeTypeSwitcher } from "@/modules/canvas/components/toolbar/NodeTypeSwitcher";
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
  } = useCanvas(workflowId);

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
        <NodeTypeSwitcher onAdd={addNodeOfType} />
      </div>

      <div className="flex-1 bg-[#101011]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          fitViewOptions={{ minZoom: 0.5, maxZoom: 1 }}
          minZoom={0.1}
          maxZoom={2}
          defaultViewport={{ x: 0, y: 0, zoom: 0.1 }}
        ></ReactFlow>
      </div>
    </div>
  );
}
