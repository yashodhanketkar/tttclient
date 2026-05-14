import { create } from "zustand";

interface HelpState {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  toggleOpen: () => void;
}

export const useHelpStore = create<HelpState>((set) => ({
  isOpen: false,
  setOpen: (value: boolean) => set({ isOpen: value }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
