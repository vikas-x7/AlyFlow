import { z } from 'zod';

export const workflowSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullish(),
});
