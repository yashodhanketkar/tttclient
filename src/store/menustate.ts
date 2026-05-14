import { create } from "zustand";

interface NavMenuState {
  activeMenu: string;
  setActiveMenu: (value: string) => void;
  closeMenu: () => void;
}

export const useNavMenuStore = create<NavMenuState>((set) => ({
  activeMenu: "",
  setActiveMenu: (value: string) => set({ activeMenu: value }),
  closeMenu: () => set({ activeMenu: "" }),
}));
