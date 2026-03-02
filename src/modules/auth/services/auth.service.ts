import axios from "@/shared/lib/axios";
import type { AuthUser } from "../types";

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export const authService = {
  async login(input: { email: string; password: string }) {
    const { data } = await axios.post<AuthResponse>("/api/auth/login", input);
    return data;
  },
  async register(input: { name: string; email: string; password: string }) {
    const { data } = await axios.post<AuthResponse>("/api/auth/register", input);
    return data;
  },
  async logout() {
    await axios.post("/api/auth/logout", {});
  },
  async me() {
    const { data } = await axios.get<{ user: AuthUser | null }>("/api/auth/me");
    return data.user;
  },
};

