import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/themestate";

import { NavBar } from "./nav";

export const Header = () => {
  return (
    <div className="flex inline-flex justify-between px-4 py-2 w-full border-b border-border bg-card text-card-foreground items-center">
      <Link to="/" className="font-semibold text-lg">
        TicTacToe
      </Link>
      <NavBar />
      <ThemeButton />
    </div>
  );
};

const ThemeButton = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Button
      size="icon"
      variant="ghost"
      className="rounded-full"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <Sun className="fill-amber-500 text-amber-500 size-6" />
      ) : (
        <Moon className="fill-yellow-500 text-yellow-500 size-6" />
      )}
    </Button>
  );
};
