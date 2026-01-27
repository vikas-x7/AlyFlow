import { useCallback, useEffect, useMemo, useState } from "react";
import type { Connection, Edge, EdgeChange, Node, NodeChange } from "reactflow";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import { canvasService } from "../services/canvas.service";
import { useCanvasStore } from "../store/canvas.store";
import { TextNode } from "../components/nodes/TextNode";
import { ImageNode } from "../components/nodes/ImageNode";
import { VideoNode } from "../components/nodes/VideoNode";
import { LinkNode } from "../components/nodes/LinkNode";
import { FileNode } from "../components/nodes/FileNode";
import { CodeNode } from "../components/nodes/CodeNode";
import { CustomEdge } from "../components/edges/CustomEdge";

type CanvasNodeType = "text" | "image" | "video" | "link" | "file" | "code";

function makeId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return `${prefix}_${crypto.randomUUID()}`;
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function useCanvas(workflowId: string) {
  const nodes = useCanvasStore((s) => s.nodes);
  const edges = useCanvasStore((s) => s.edges);
  const setCanvasSnapshot = useCanvasStore((s) => s.setCanvasSnapshot);
  const setNodes = useCanvasStore((s) => s.setNodes);
  const setEdges = useCanvasStore((s) => s.setEdges);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!workflowId) {
      setCanvasSnapshot({ nodes: [], edges: [] });
      setIsLoading(false);
      setLoadError("Invalid workflow id");
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
        setLoadError(
          typeof e?.response?.data?.error === "string"
            ? e.response.data.error
            : "Failed to load canvas",
        );
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
      const shouldMarkDirty = changes.some(
        (change) => change.type !== "select",
      );
      setNodes((prev) => applyNodeChanges(changes, prev), {
        markDirty: shouldMarkDirty,
      });
    },
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const shouldMarkDirty = changes.some(
        (change) => change.type !== "select",
      );
      setEdges((prev) => applyEdgeChanges(changes, prev), {
        markDirty: shouldMarkDirty,
      });
    },
    [setEdges],
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((prev) =>
        addEdge(
          {
            ...connection,
            type: "custom",
            animated: false,
          },
          prev,
        ),
      );
    },
    [setEdges],
  );

  const addNodeOfType = useCallback(
    (type: CanvasNodeType, position?: { x: number; y: number }) => {
      const id = makeId(type);
      const base: Node = {
        id,
        type,
        position: position ?? {
          x: 80 + Math.random() * 320,
          y: 80 + Math.random() * 220,
        },
        data: {},
      };

      const dataByType: Record<CanvasNodeType, any> = {
        text: { text: "New text" },
        image: { url: "" },
        video: { url: "" },
        link: { url: "https://", label: "" },
        file: { filename: "file", url: "" },
        code: { language: "ts", code: "// code..." },
      };

      setNodes((prev) => prev.concat({ ...base, data: dataByType[type] }));
      return id;
    },
    [setNodes],
  );

  const nodeTypes = useMemo(
    () => ({
      text: TextNode,
      image: ImageNode,
      video: VideoNode,
      link: LinkNode,
      file: FileNode,
      code: CodeNode,
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
    addNodeOfType,
  };
}
