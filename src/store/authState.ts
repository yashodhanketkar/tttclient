import { create } from "zustand";

interface AuthState {
  token: string;
  setToken: (value: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("ttt_access_token") || "",
  setToken: (value) => {
    localStorage.setItem("ttt_access_token", value);
    set({ token: value });
  },
}));
