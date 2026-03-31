export const canvasService = {
  async get(workflowId: string) {
    const res = await fetch(`/api/canvas/${workflowId}`);
    if (!res.ok) throw new Error('Failed to load canvas');
    return { data: await res.json() };
  },
  async save(workflowId: string, data: unknown) {
    const res = await fetch(`/api/canvas/${workflowId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to save canvas');
    return { data: await res.json() };
  },
};
