export const workflowService = {
  async list() {
    const res = await fetch('/api/workflows');
    if (!res.ok) throw new Error('Failed to load workflows');
    return { data: await res.json() };
  },
  async create(input: { name: string; description?: string }) {
    const res = await fetch('/api/workflows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error('Failed to create workflow');
    return { data: await res.json() };
  },
  async get(id: string) {
    const res = await fetch(`/api/workflows/${id}`);
    if (!res.ok) throw new Error('Failed to get workflow');
    return { data: await res.json() };
  },
  async update(id: string, input: { name: string; description?: string }) {
    const res = await fetch(`/api/workflows/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error('Failed to update workflow');
    return { data: await res.json() };
  },
  async remove(id: string) {
    const res = await fetch(`/api/workflows/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete workflow');
    return { data: await res.json() };
  },
};
