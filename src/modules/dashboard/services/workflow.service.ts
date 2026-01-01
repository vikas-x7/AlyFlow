import axios from "@/shared/lib/axios";

export const workflowService = {
  async list() {
    return axios.get("/api/workflows");
  },
  async create() {
    return axios.post("/api/workflows", {});
  },
  async get(id: string) {
    return axios.get(`/api/workflows/${id}`);
  },
  async update(id: string) {
    return axios.put(`/api/workflows/${id}`, {});
  },
  async remove(id: string) {
    return axios.delete(`/api/workflows/${id}`);
  },
};

