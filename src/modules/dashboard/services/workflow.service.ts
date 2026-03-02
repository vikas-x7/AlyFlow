import axios from "@/shared/lib/axios";

export const workflowService = {
  async list() {
    return axios.get("/api/workflows");
  },
  async create(input: { name: string; description?: string }) {
    return axios.post("/api/workflows", input);
  },
  async get(id: string) {
    return axios.get(`/api/workflows/${id}`);
  },
  async update(id: string, input: { name: string; description?: string }) {
    return axios.put(`/api/workflows/${id}`, input);
  },
  async remove(id: string) {
    return axios.delete(`/api/workflows/${id}`);
  },
};

