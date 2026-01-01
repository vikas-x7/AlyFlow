import { create } from "zustand";

interface CanvasState {
  nodes: unknown[];
  edges: unknown[];
  setNodes: (nodes: unknown[]) => void;
  setEdges: (edges: unknown[]) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  nodes: [],
  edges: [],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
}));

