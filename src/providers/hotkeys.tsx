import { type RegisterableHotkey, useHotkeys } from "@tanstack/react-hotkeys";
import type React from "react";
import { useNavigate } from "react-router-dom";

import { useHelpStore } from "@/store/helpState";
import { useNavMenuStore } from "@/store/menustate";

const idClick = (id: string) => {
  window.document.getElementById(id)?.click();
};

export const KeyProvider = ({ children }: { children: React.ReactNode }) => {
  const { activeMenu, setActiveMenu, closeMenu } = useNavMenuStore();
  const { toggleOpen } = useHelpStore();
  const navigate = useNavigate();

  const numberClickHandler = (id: number) => {
    if (activeMenu !== "") {
      idClick(`nav-menu-item-${id}`);
      closeMenu();
    } else {
      idClick(`board-cell-${id}`);
    }
  };

  const numArray = Array.from({ length: 9 }, (_, index) => {
    const num = index + 1;
    return {
      hotkey: num.toString() as RegisterableHotkey,
      callback: () => numberClickHandler(num),
    };
  });

  useHotkeys([
    ...numArray,
    { hotkey: "Shift+N", callback: () => idClick("new-game-button") },
    { hotkey: "Shift+J", callback: () => idClick("join-game-button") },
    { hotkey: "Shift+G", callback: () => setActiveMenu("Games") },
    { hotkey: "Shift+A", callback: () => setActiveMenu("Account") },
    { hotkey: "Shift+H", callback: () => navigate("/") },
    { hotkey: "Shift+/" as RegisterableHotkey, callback: () => toggleOpen() },
  ]);

  return <div>{children}</div>;
};
