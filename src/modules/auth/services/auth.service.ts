import axios from "@/shared/lib/axios";

export const authService = {
  async login() {
    return axios.post("/api/auth/login", {});
  },
  async register() {
    return axios.post("/api/auth/register", {});
  },
  async logout() {
    return axios.post("/api/auth/logout", {});
  },
  async me() {
    return axios.get("/api/auth/me");
  },
};

