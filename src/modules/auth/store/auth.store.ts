import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "../types";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  setAuth: (payload: { user: AuthUser; token: string }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: ({ user, token }) => set({ user, token }),
      clearAuth: () => set({ user: null, token: null }),
    }),
    {
      name: "auth_store",
      partialize: (s) => ({ user: s.user, token: s.token }),
    },
  ),
);

