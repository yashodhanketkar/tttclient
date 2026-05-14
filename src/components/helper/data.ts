import type { RegisterableHotkey } from "@tanstack/react-hotkeys";

import type { AvailableKeybindType } from "./type";

export const availableKeybinds: AvailableKeybindType = [
  {
    description: "General Keybinds",
    keybinds: [
      { keybind: "Shift+H", description: "Got to home page" },
      { keybind: "Shift+/", description: "Toggle this dialog" },
      { keybind: "Shift+N", description: "Start a new game" },
      { keybind: "Shift+J", description: "Join a game" },
      { keybind: "Shift+G", description: "Open game navigtions menu" },
    ],
  },
  {
    description: "Games Menu Keybinds",
    keybinds: [
      { keybind: "1", description: "Go to stats page", indented: true },
      { keybind: "2", description: "Go to board page", indented: true },
    ],
  },
  {
    description: "For board",
    keybinds: [
      ...Array.from({ length: 9 }).map((_, i) => ({
        keybind: `${i + 1}` as RegisterableHotkey,
        description: `Go to cell ${i + 1}`,
        indented: true,
      })),
    ],
  },
];
