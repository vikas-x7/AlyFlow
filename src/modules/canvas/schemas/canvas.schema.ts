import { z } from "zod";

export const canvasSchema = z.object({
  nodes: z.array(z.unknown()),
  edges: z.array(z.unknown()),
});

