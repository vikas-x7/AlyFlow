import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Connection, Edge, EdgeChange, Node, NodeChange, OnConnectStartParams } from 'reactflow';
import { addEdge, applyEdgeChanges, applyNodeChanges, reconnectEdge } from 'reactflow';
import { canvasService } from '../services/canvas.service';
import { useCanvasStore } from '../store/canvas.store';
import { TextNode } from '../components/nodes/TextNode';
import { DrawingNode } from '../components/nodes/DrawingNode';
import { CustomEdge } from '../components/edges/CustomEdge';

function makeId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return `${prefix}_${crypto.randomUUID()}`;
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function useCanvas(workflowId: string) {
  const nodes = useCanvasStore((s) => s.nodes);
  const edges = useCanvasStore((s) => s.edges);
  const setCanvasSnapshot = useCanvasStore((s) => s.setCanvasSnapshot);
  const setNodes = useCanvasStore((s) => s.setNodes);
  const setEdges = useCanvasStore((s) => s.setEdges);

  // Track the source node/handle when user starts dragging an edge
  const connectingRef = useRef<{ nodeId: string; handleId: string | null; handleType: string | null } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!workflowId) {
      setCanvasSnapshot({ nodes: [], edges: [] });
      setIsLoading(false);
      setLoadError('Invalid workflow id');
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setLoadError(null);

    canvasService
      .get(workflowId)
      .then((res) => {
        if (cancelled) return;
        const canvas = res.data?.canvas;
        setCanvasSnapshot({
          nodes: (Array.isArray(canvas?.nodes) ? canvas.nodes : []) as Node[],
          edges: (Array.isArray(canvas?.edges) ? canvas.edges : []) as Edge[],
        });
      })
      .catch((e: any) => {
        if (cancelled) return;
        setLoadError(typeof e?.response?.data?.error === 'string' ? e.response.data.error : 'Failed to load canvas');
        setCanvasSnapshot({ nodes: [], edges: [] });
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [workflowId, setCanvasSnapshot]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const shouldMarkDirty = changes.some((change) => change.type !== 'select');
      setNodes((prev) => applyNodeChanges(changes, prev), {
        markDirty: shouldMarkDirty,
      });
    },
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const shouldMarkDirty = changes.some((change) => change.type !== 'select');
      setEdges((prev) => applyEdgeChanges(changes, prev), {
        markDirty: shouldMarkDirty,
      });
    },
    [setEdges],
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      const type = useCanvasStore.getState().globalEdgeType;
      const strokeWidth = useCanvasStore.getState().globalEdgeThickness;

      setEdges((prev) =>
        addEdge(
          {
            ...connection,
            type: 'custom',
            animated: type === 'animated',
            data: { edgeType: type, strokeWidth },
          },
          prev,
        ),
      );
    },
    [setEdges],
  );

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      setEdges((prev) => reconnectEdge(oldEdge, newConnection, prev));
    },
    [setEdges],
  );

  const addNodeOfType = useCallback(
    (type: 'text' | 'drawing', position?: { x: number; y: number }, data?: any) => {
      const id = makeId(type);
      const base: Node = {
        id,
        type,
        position: position ?? {
          x: 80 + Math.random() * 320,
          y: 80 + Math.random() * 220,
        },
        data: data ?? { text: '' },
      };

      setNodes((prev) => prev.concat(base));
      return id;
    },
    [setNodes],
  );

  const onConnectStart = useCallback((_event: any, params: OnConnectStartParams) => {
    connectingRef.current = {
      nodeId: params.nodeId ?? '',
      handleId: params.handleId ?? null,
      handleType: params.handleType ?? null,
    };
  }, []);

  const onConnectEnd = useCallback(
    (event: MouseEvent | TouchEvent) => {
      // Only create a node if the drop is on empty canvas (not on a handle)
      const target = event.target as HTMLElement;
      const isPane = target.classList.contains('react-flow__pane');
      if (!isPane || !connectingRef.current) {
        connectingRef.current = null;
        return;
      }

      const source = connectingRef.current;
      connectingRef.current = null;

      // We need the rfInstance to project screen coords to flow coords
      // It will be passed from the page component
      const customEvent = event as any;
      const rfInstance = customEvent.__rfInstance;
      const containerRect = customEvent.__containerRect;
      if (!rfInstance || !containerRect) return;

      // Get the drop position in flow coordinates
      const clientX = 'changedTouches' in event ? event.changedTouches[0].clientX : (event as MouseEvent).clientX;
      const clientY = 'changedTouches' in event ? event.changedTouches[0].clientY : (event as MouseEvent).clientY;
      const x = clientX - containerRect.left;
      const y = clientY - containerRect.top;
      const pos = rfInstance.project({ x, y });

      // Create new node
      const newNodeId = addNodeOfType('text', pos);

      // Determine which handle to connect to on the new node
      // Source handle → connect to nearest target handle on new node
      const sourceHandleId = source.handleId;
      let targetHandleId = 'top-target';
      if (sourceHandleId?.includes('bottom')) targetHandleId = 'top-target';
      else if (sourceHandleId?.includes('top')) targetHandleId = 'bottom-target';
      else if (sourceHandleId?.includes('right')) targetHandleId = 'left-target';
      else if (sourceHandleId?.includes('left')) targetHandleId = 'right-target';

      // Create edge from source to new node
      const type = useCanvasStore.getState().globalEdgeType;
      const strokeWidth = useCanvasStore.getState().globalEdgeThickness;
      setEdges((prev) =>
        addEdge(
          {
            source: source.nodeId,
            sourceHandle: sourceHandleId,
            target: newNodeId,
            targetHandle: targetHandleId,
            type: 'custom',
            animated: type === 'animated',
            data: { edgeType: type, strokeWidth },
          },
          prev,
        ),
      );
    },
    [addNodeOfType, setEdges],
  );

  const nodeTypes = useMemo(
    () => ({
      text: TextNode,
      drawing: DrawingNode,
    }),
    [],
  );

  const edgeTypes = useMemo(() => ({ custom: CustomEdge }), []);

  return {
    nodes,
    edges,
    nodeTypes,
    edgeTypes,
    isLoading,
    loadError,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onConnectStart,
    onConnectEnd,
    onReconnect,
    addNodeOfType,
  };
}
