import {
  formatForDisplay,
  type RegisterableHotkey,
} from "@tanstack/react-hotkeys";

import { DialogDescription } from "../ui/dialog";
import { Kbd } from "../ui/kbd";
import type { AvailableKeybindType, KeybindType } from "./type";

export const KeybindsRenderer = ({
  availableKeybinds,
}: {
  availableKeybinds: AvailableKeybindType;
}) =>
  availableKeybinds.map((avk, i) => (
    <KeybindsBlock
      key={i}
      description={avk.description}
      keybinds={avk.keybinds}
    />
  ));

const KeybindsBlock = ({
  description,
  keybinds,
}: {
  description: string;
  keybinds: KeybindType[];
}) => {
  return (
    <>
      <hr className="my-2" />
      <DialogDescription>{description}</DialogDescription>
      {keybinds.map((kb, i) => (
        <KeybindItem
          key={i}
          keybind={kb.keybind as RegisterableHotkey}
          description={kb.description}
          indented={kb.indented}
        />
      ))}
    </>
  );
};

const KeybindItem = ({
  keybind,
  description,
  indented = false,
}: {
  keybind: RegisterableHotkey;
  description: string;
  indented?: boolean;
}) => {
  return (
    <span className={indented ? "pl-2" : ""}>
      <Kbd>{formatForDisplay(keybind)}</Kbd>: {description}
    </span>
  );
};
