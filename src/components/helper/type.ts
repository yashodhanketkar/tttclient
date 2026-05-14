import type { RegisterableHotkey } from "@tanstack/react-hotkeys";

export type KeybindType = {
  keybind: RegisterableHotkey | string;
  description: string;
  indented?: boolean;
};

export type AvailableKeybindType = {
  description: string;
  keybinds: KeybindType[];
}[];
