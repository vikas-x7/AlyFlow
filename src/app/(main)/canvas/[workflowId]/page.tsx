"use client";

import "reactflow/dist/style.css";
import ReactFlow, { Background, Controls } from "reactflow";
import { Toolbar } from "@/modules/canvas/components/toolbar/Toolbar";
import { NodeTypeSwitcher } from "@/modules/canvas/components/toolbar/NodeTypeSwitcher";
import { MiniMap } from "@/modules/canvas/components/MiniMap";
import { useCanvas } from "@/modules/canvas/hooks/useCanvas";
import { useAutoSave } from "@/modules/canvas/hooks/useAutoSave";

interface CanvasPageProps {
  params: {
    workflowId: string;
  };
}

export default function CanvasPage({ params }: CanvasPageProps) {
  return <CanvasClient workflowId={params.workflowId} />;
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
    nodes,
    edges,
    enabled: true,
    ready: !isLoading,
  });

  return (
    <div className="h-[calc(100vh-0px)] flex flex-col">
      <Toolbar isSaving={autosave.isSaving} lastSavedAt={autosave.lastSavedAt} error={autosave.error} />
      <div className="border-b p-2 bg-white">
        <NodeTypeSwitcher onAdd={addNodeOfType} />
      </div>

      {loadError ? (
        <div className="p-4 text-sm text-red-600">{loadError}</div>
      ) : null}

      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}

