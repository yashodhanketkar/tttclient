import { create } from "zustand";

type ThemeType = "light" | "dark";

interface ThemeState {
  theme: ThemeType;
  setTheme: (value: ThemeType) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem("theme") as ThemeType) || "light",
  setTheme: (value) => {
    handleThemeChange(value);
    set({ theme: value });
  },
  toggleTheme: () =>
    set((state) => {
      const value = state.theme === "light" ? "dark" : "light";

      handleThemeChange(value);
      return {
        theme: value,
      };
    }),
}));

const handleThemeChange = (theme: ThemeType) => {
  localStorage.setItem("theme", theme);
  switch (theme) {
    case "light":
      document.documentElement.classList.remove("dark");
      break;
    case "dark":
      document.documentElement.classList.add("dark");
      break;
  }
};
