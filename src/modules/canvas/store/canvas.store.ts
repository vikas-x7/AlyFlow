import { create } from "zustand";
import type { Edge, Node } from "reactflow";

type Updater<T> = T | ((prev: T) => T);
type SetOptions = {
  markDirty?: boolean;
};

export type CanvasNode = Node & {
  isDirty?: boolean;
};

interface CanvasState {
  nodes: CanvasNode[];
  edges: Edge[];
  removedNodeIds: string[];
  isEdgesDirty: boolean;
  lastMutationAt: number;
  globalEdgeType: string;
  globalEdgeThickness: number;
  setGlobalEdgePrefs: (type: string, thickness: number) => void;
  setCanvasSnapshot: (payload: { nodes: Node[]; edges: Edge[] }) => void;
  setNodes: (next: Updater<CanvasNode[]>, options?: SetOptions) => void;
  setEdges: (next: Updater<Edge[]>, options?: SetOptions) => void;
  markSaved: (payload: {
    savedNodes: Node[];
    removedNodeIds: string[];
    savedEdges?: Edge[];
  }) => void;
}

type ComparableNode = CanvasNode & {
  selected?: boolean;
  dragging?: boolean;
};

type ComparableEdge = Edge & {
  selected?: boolean;
};

export function stripTransientNode(node: CanvasNode | Node): Node {
  const { isDirty: _isDirty, selected: _selected, dragging: _dragging, ...rest } = node as ComparableNode;
  return rest as Node;
}

export function stripTransientEdge(edge: Edge): Edge {
  const { selected: _selected, ...rest } = edge as ComparableEdge;
  return rest as Edge;
}

function isNodeSameContent(a: CanvasNode | Node, b: CanvasNode | Node) {
  return JSON.stringify(stripTransientNode(a)) === JSON.stringify(stripTransientNode(b));
}

function areEdgesSameContent(currentEdges: Edge[], nextEdges: Edge[]) {
  if (currentEdges.length !== nextEdges.length) return false;

  const currentById = new Map(
    currentEdges.map((edge) => [edge.id, JSON.stringify(stripTransientEdge(edge))]),
  );

  for (const edge of nextEdges) {
    const current = currentById.get(edge.id);
    if (!current) return false;
    if (current !== JSON.stringify(stripTransientEdge(edge))) return false;
  }

  return true;
}

function withDirtyFlags(prev: CanvasNode[], next: CanvasNode[], markDirty: boolean) {
  if (!markDirty) {
    const prevById = new Map(prev.map((node) => [node.id, node]));
    return next.map((node) => {
      const previousNode = prevById.get(node.id);
      return {
        ...node,
        isDirty: Boolean(previousNode?.isDirty || node.isDirty),
      };
    });
  }

  const prevById = new Map(prev.map((node) => [node.id, node]));

  return next.map((node) => {
    const previousNode = prevById.get(node.id);
    const wasAlreadyDirty = Boolean(previousNode?.isDirty || node.isDirty);
    const changed = !previousNode || !isNodeSameContent(previousNode, node);

    return {
      ...node,
      isDirty: wasAlreadyDirty || changed,
    };
  });
}

export const useCanvasStore = create<CanvasState>((set) => ({
  nodes: [],
  edges: [],
  removedNodeIds: [],
  isEdgesDirty: false,
  lastMutationAt: 0,
  globalEdgeType: "default",
  globalEdgeThickness: 1.5,
  setGlobalEdgePrefs: (type, thickness) => set({ globalEdgeType: type, globalEdgeThickness: thickness }),
  setCanvasSnapshot: ({ nodes, edges }) =>
    set({
      nodes: nodes.map((node) => ({ ...node, isDirty: false })),
      edges,
      removedNodeIds: [],
      isEdgesDirty: false,
      lastMutationAt: 0,
    }),
  setNodes: (next, options) =>
    set((s) => {
      const markDirty = options?.markDirty ?? true;
      const resolved = typeof next === "function" ? (next as (prev: CanvasNode[]) => CanvasNode[])(s.nodes) : next;
      const nodes = withDirtyFlags(s.nodes, resolved, markDirty);

      const nodeIds = new Set(nodes.map((node) => node.id));
      const removedInThisUpdate = markDirty
        ? s.nodes.filter((node) => !nodeIds.has(node.id)).map((node) => node.id)
        : [];
      const keptRemovedNodeIds = s.removedNodeIds.filter((id) => !nodeIds.has(id));
      const removedNodeIds = Array.from(new Set([...keptRemovedNodeIds, ...removedInThisUpdate]));

      return {
        nodes,
        removedNodeIds,
        lastMutationAt: markDirty ? Date.now() : s.lastMutationAt,
      };
    }),
  setEdges: (next, options) =>
    set((s) => {
      const markDirty = options?.markDirty ?? true;
      const edges = typeof next === "function" ? (next as (prev: Edge[]) => Edge[])(s.edges) : next;
      const changed = areEdgesSameContent(s.edges, edges) === false;

      return {
        edges,
        isEdgesDirty: markDirty ? s.isEdgesDirty || changed : s.isEdgesDirty,
        lastMutationAt: markDirty && changed ? Date.now() : s.lastMutationAt,
      };
    }),
  markSaved: ({ savedNodes, removedNodeIds, savedEdges }) =>
    set((s) => {
      const savedNodeById = new Map(savedNodes.map((node) => [node.id, node]));
      const currentNodeIds = new Set(s.nodes.map((node) => node.id));
      const removedIds = new Set(removedNodeIds);

      const nodes = s.nodes.map((node) => {
        if (!node.isDirty) return node;
        const savedVersion = savedNodeById.get(node.id);
        if (!savedVersion) return node;
        if (!isNodeSameContent(node, savedVersion)) return node;
        return { ...node, isDirty: false };
      });

      const nextRemovedNodeIds = s.removedNodeIds.filter(
        (id) => !(removedIds.has(id) && !currentNodeIds.has(id)),
      );

      const isEdgesDirty = savedEdges ? !areEdgesSameContent(s.edges, savedEdges) : s.isEdgesDirty;

      return {
        nodes,
        removedNodeIds: nextRemovedNodeIds,
        isEdgesDirty,
      };
    }),
}));
