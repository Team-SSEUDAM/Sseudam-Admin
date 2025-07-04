import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: {
    id?: string;
    loginId?: string;
  } | null;
}

interface AuthActions {
  setAccessToken: (token: string) => void;
  setUser: (user: AuthState["user"]) => void;
  login: (token: string, user: AuthState["user"]) => void;
  logout: () => void;
  clearAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      user: null,

      setAccessToken: (token: string) =>
        set({
          accessToken: token,
          isAuthenticated: !!token,
        }),

      setUser: (user: AuthState["user"]) => set({ user }),

      login: (token: string, user: AuthState["user"]) =>
        set({
          accessToken: token,
          isAuthenticated: true,
          user,
        }),

      logout: () => {
        set({
          accessToken: null,
          isAuthenticated: false,
          user: null,
        });
      },

      clearAuth: () => {
        set({
          accessToken: null,
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: "auth-storage", // NOTE: localStorage 키 이름
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        // NOTE: accessToken은 persist하지 않음 (메모리에서만 유지)
      }),
    }
  )
);
