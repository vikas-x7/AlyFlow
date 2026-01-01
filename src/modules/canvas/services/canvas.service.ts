import axios from "@/shared/lib/axios";

export const canvasService = {
  async get(workflowId: string) {
    return axios.get(`/api/canvas/${workflowId}`);
  },
  async save(workflowId: string, data: unknown) {
    return axios.post(`/api/canvas/${workflowId}`, data);
  },
};

