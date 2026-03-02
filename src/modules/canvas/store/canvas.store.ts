import { create } from "zustand";
import type { Edge, Node } from "reactflow";

type Updater<T> = T | ((prev: T) => T);

interface CanvasState {
  nodes: Node[];
  edges: Edge[];
  setNodes: (next: Updater<Node[]>) => void;
  setEdges: (next: Updater<Edge[]>) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  nodes: [],
  edges: [],
  setNodes: (next) => set((s) => ({ nodes: typeof next === "function" ? (next as any)(s.nodes) : next })),
  setEdges: (next) => set((s) => ({ edges: typeof next === "function" ? (next as any)(s.edges) : next })),
}));

