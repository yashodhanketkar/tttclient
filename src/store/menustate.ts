import { create } from "zustand";

interface NavMenuState {
  activeMenu: string;
  setActiveMenu: (value: string) => void;
  closeMenu: () => void;
}

export const useNavMenuStore = create<NavMenuState>((set) => ({
  activeMenu: "",
  setActiveMenu: (value) => set({ activeMenu: value }),
  closeMenu: () => set({ activeMenu: "" }),
}));
