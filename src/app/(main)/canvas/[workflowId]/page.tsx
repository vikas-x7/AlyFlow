'use client';

import { use } from 'react';
import 'reactflow/dist/style.css';
import ReactFlow, { MiniMap, ReactFlowInstance, getConnectedEdges } from 'reactflow';
import type { Edge, NodeChange, EdgeChange } from 'reactflow';
import { useState, useRef, useCallback } from 'react';
import { NodeTypeSwitcher } from '@/modules/canvas/components/toolbar/NodeTypeSwitcher';
import { NodeFormatPanel } from '@/modules/canvas/components/toolbar/NodeFormatPanel';
import { DrawingOverlay } from '@/modules/canvas/components/DrawingOverlay';
import { useCanvas } from '@/modules/canvas/hooks/useCanvas';
import { useAutoSave } from '@/modules/canvas/hooks/useAutoSave';
import { useCanvasStore } from '@/modules/canvas/store/canvas.store';
import { Loader } from '@/shared/components/ui/Loader';
import { useTheme } from 'next-themes';
import { ChevronDown } from 'lucide-react';

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
  const { nodes, edges, nodeTypes, edgeTypes, isLoading, loadError, onNodesChange, onEdgesChange, onConnect, onConnectStart, onConnectEnd, onReconnect, addNodeOfType } = useCanvas(workflowId);
  const pushHistory = useCanvasStore((s) => s.pushHistory);
  const undo = useCanvasStore((s) => s.undo);
  const redo = useCanvasStore((s) => s.redo);

  const [activeTool, setActiveTool] = useState<string>('cursor');
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const [zoom, setZoom] = useState<number>(0.1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasFittedRef = useRef(false);
  const edgeReconnectSuccessful = useRef(true);
  const lastConnectEndTimeRef = useRef<number>(0);
  const { resolvedTheme } = useTheme();

  const autosave = useAutoSave({
    workflowId,
    enabled: true,
    ready: !isLoading,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-foreground">
        <div className="rounded border border-red-900 bg-red-950 px-3 py-2 text-sm text-red-400">{loadError}</div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-0px)] flex flex-col bg-background">
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        {autosave.error ? <div className="rounded border border-red-400 bg-red-50 px-3 py-1 text-xs text-red-700">Autosave failed. Retrying...</div> : null}
      </div>

      <div className="absolute bottom-4 z-10 right-1/2 translate-x-1/2">
        <NodeTypeSwitcher
          active={activeTool}
          onAdd={(type) => {
            if (type === 'undo') {
              undo();
              return;
            }
            if (type === 'redo') {
              redo();
              return;
            }
            if (type === 'delete') {
              const selectedNodes = nodes.filter((n) => n.selected);
              const selectedEdges = edges.filter((e) => e.selected);

              const connectedEdges = getConnectedEdges(selectedNodes, edges);
              const edgesToRemoveIds = new Set([...selectedEdges.map((e) => e.id), ...connectedEdges.map((e) => e.id)]);

              const nodesToRemove = selectedNodes.map((n) => ({ id: n.id, type: 'remove' as const }) as NodeChange);
              const edgesToRemove = Array.from(edgesToRemoveIds).map((id) => ({ id, type: 'remove' as const }) as EdgeChange);

              if (nodesToRemove.length > 0 || edgesToRemove.length > 0) pushHistory();

              if (nodesToRemove.length > 0) onNodesChange(nodesToRemove);
              if (edgesToRemove.length > 0) onEdgesChange(edgesToRemove);
              return;
            }
            setActiveTool(type);
          }}
        />
      </div>

      <div className="flex-1 relative" ref={containerRef} data-active-tool={activeTool}>
        <div className="absolute bottom-4 left-4 z-10">
          <div className="flex items-center rounded-md border border-border bg-panel shadow-sm overflow-hidden h-10">
            <div className="relative flex items-center h-full hover:bg-muted transition-colors">
              <select
                className="w-[84px] pl-2 pr-6 bg-transparent text-center text-[14px] text-foreground font-gothic cursor-pointer h-full appearance-none outline-none font-medium z-10 relative"
                value={Math.round(zoom * 100)}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'fit') {
                    rfInstance?.fitView({ padding: 0.2, duration: 800 });
                  } else {
                    rfInstance?.zoomTo(Number(val) / 100, { duration: 300 });
                  }
                }}
                title="Zoom level"
              >
                <option value={Math.round(zoom * 100)} hidden className="bg-panel text-foreground">
                  {Math.round(zoom * 100)}%
                </option>
                <option value="25" className="bg-panel text-foreground">
                  25%
                </option>
                <option value="50" className="bg-panel text-foreground">
                  50%
                </option>
                <option value="75" className="bg-panel text-foreground">
                  75%
                </option>
                <option value="100" className="bg-panel text-foreground">
                  100%
                </option>
                <option value="125" className="bg-panel text-foreground">
                  125%
                </option>
                <option value="150" className="bg-panel text-foreground">
                  150%
                </option>
                <option value="200" className="bg-panel text-foreground">
                  200%
                </option>
                <option value="300" className="bg-panel text-foreground">
                  300%
                </option>
                <option value="fit" className="bg-panel text-foreground">
                  Fit View
                </option>
              </select>
              <ChevronDown size={14} className="absolute right-2 text-foreground pointer-events-none opacity-50" />
            </div>
          </div>
        </div>
        <DrawingOverlay
          active={activeTool === 'pen'}
          rfInstance={rfInstance}
          containerRef={containerRef}
          onDrawingComplete={(points: { x: number; y: number }[], color: string, strokeWidth: number) => {
            if (!points || points.length < 2) return;
            const minX = Math.min(...points.map((p) => p.x));
            const minY = Math.min(...points.map((p) => p.y));
            const relativePoints = points.map((p) => ({ x: p.x - minX, y: p.y - minY }));
            addNodeOfType('drawing', { x: minX, y: minY }, { points: relativePoints, color, strokeWidth });
            setActiveTool('pen');
          }}
        />
        <ReactFlow
          onInit={(instance) => {
            setRfInstance(instance);
            try {
              const v = (instance as any).getViewport?.();
              if (typeof v?.zoom === 'number') setZoom(v.zoom);
            } catch (e) {}
            if (!hasFittedRef.current && nodes.length > 0) {
              hasFittedRef.current = true;
              setTimeout(() => {
                instance.fitView({ minZoom: 0.3, maxZoom: 1.5, padding: 0.2 });
                try {
                  const v = (instance as any).getViewport?.();
                  if (typeof v?.zoom === 'number') setZoom(v.zoom);
                } catch (e) {}
              }, 50);
            }
          }}
          onMove={(_e: any, viewport?: any) => {
            const z = viewport?.zoom ?? _e?.viewport?.zoom;
            if (typeof z === 'number') setZoom(z);
          }}
          onMoveEnd={(_e: any, viewport?: any) => {
            const z = viewport?.zoom ?? _e?.viewport?.zoom;
            if (typeof z === 'number') setZoom(z);
          }}
          onNodeDragStart={() => pushHistory()}
          onSelectionDragStart={() => pushHistory()}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={(event) => {
            // Inject rfInstance and containerRect so the hook can project coordinates
            const e = event as any;
            e.__rfInstance = rfInstance;
            e.__containerRect = containerRef.current?.getBoundingClientRect();
            onConnectEnd(event as any);
            // Record when edge connection ended to prevent onPaneClick from creating duplicate node
            lastConnectEndTimeRef.current = Date.now();
          }}
          onPaneClick={(event: any) => {
            if (!rfInstance) return;
            if (activeTool !== 'text') return;
            // Skip pane click if it's too soon after an edge connection ended
            // (prevents duplicate node creation)
            if (Date.now() - lastConnectEndTimeRef.current < 100) return;
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const pos = rfInstance.project({ x, y });
            addNodeOfType('text', pos);
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
              onEdgesChange([{ id: (edge as Edge).id, type: 'remove' }]);
            }
            edgeReconnectSuccessful.current = true;
          }}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          panOnDrag={activeTool === 'hand'}
          selectionOnDrag={activeTool === 'cursor'}
          elementsSelectable={activeTool === 'cursor' || activeTool === 'text'}
          minZoom={0.1}
          maxZoom={5}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          reconnectRadius={50}
        >
          <MiniMap
            style={{
              width: 120,
              height: 80,
              position: 'fixed',
            }}
            className="!bg-panel border border-border !rounded-md overflow-hidden"
            maskColor={resolvedTheme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)'}
            nodeColor={resolvedTheme === 'dark' ? '#333' : '#e0e0e0'}
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
