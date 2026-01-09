import { z } from "zod";

export const canvasSchema = z.object({
  nodes: z.array(z.unknown()),
  edges: z.array(z.unknown()),
});

export const canvasPatchSchema = z.object({
  dirtyNodes: z.array(z.unknown()),
  removedNodeIds: z.array(z.string()).default([]),
  edges: z.array(z.unknown()).optional(),
});

export const canvasSaveSchema = z.union([canvasSchema, canvasPatchSchema]);
