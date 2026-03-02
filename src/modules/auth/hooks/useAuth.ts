import { useCallback, useMemo } from "react";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const isAuthenticated = !!token;

  const login = useCallback(
    async (input: { email: string; password: string }) => {
      const res = await authService.login(input);
      setAuth(res);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("auth_token", res.token);
      }
      return res;
    },
    [setAuth],
  );

  const register = useCallback(
    async (input: { name: string; email: string; password: string }) => {
      const res = await authService.register(input);
      setAuth(res);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("auth_token", res.token);
      }
      return res;
    },
    [setAuth],
  );

  const logout = useCallback(async () => {
    await authService.logout().catch(() => null);
    clearAuth();
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("auth_token");
    }
  }, [clearAuth]);

  const refreshMe = useCallback(async () => {
    const me = await authService.me().catch(() => null);
    if (!me) return null;
    if (token) setAuth({ user: me, token });
    return me;
  }, [setAuth, token]);

  return useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      login,
      register,
      logout,
      refreshMe,
    }),
    [user, token, isAuthenticated, login, register, logout, refreshMe],
  );
}

