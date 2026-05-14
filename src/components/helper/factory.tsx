import {
  formatForDisplay,
  type RegisterableHotkey,
} from "@tanstack/react-hotkeys";

import { DialogDescription } from "../ui/dialog";
import { Kbd } from "../ui/kbd";

export const KeybindItem = ({
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

export const KeybindsBlock = ({
  description,
  children,
}: {
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <hr className="my-2" />
      <DialogDescription>{description}</DialogDescription>
      {children}
    </>
  );
};
