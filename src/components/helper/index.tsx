import { type RegisterableHotkey } from "@tanstack/react-hotkeys";
import { CircleQuestionMarkIcon } from "lucide-react";

import { useHelpStore } from "@/store/helpState";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { KeybindItem, KeybindsBlock } from "./factory";

export const HelperDialog = () => {
  const { isOpen, setOpen } = useHelpStore();

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            size="icon-lg"
            variant="outline"
            className="rounded-full fixed bottom-20 right-5"
          >
            <CircleQuestionMarkIcon />
          </Button>
        }
      />
      <DialogContent className="flex flex-col gap-1">
        <DialogHeader className="mb-2">
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Here are the keyboard shortcuts for the app
          </DialogDescription>
        </DialogHeader>

        {/* General Keybinds */}
        <KeybindsBlock description="General Keybinds">
          <KeybindItem keybind="Shift+H" description="Got to home page" />
          <KeybindItem
            keybind={"Shift+/" as RegisterableHotkey}
            description="Toggle this dialog"
          />
          <KeybindItem keybind="Shift+N" description="Start a new game" />
          <KeybindItem keybind="Shift+J" description="Join a game" />
          <KeybindItem
            keybind="Shift+G"
            description="Open game navigtions menu"
          />
        </KeybindsBlock>

        {/* Games Menu Keybinds */}
        <KeybindsBlock description="Games Menu Keybinds">
          <DialogDescription>Inside games menu</DialogDescription>
          <KeybindItem keybind="1" description="Go to stats page" indented />
          <KeybindItem keybind="2" description="Go to board page" indented />
        </KeybindsBlock>

        {/* Game Broad Keybinds */}
        <KeybindsBlock description="For board">
          {Array.from({ length: 9 }).map((_, i) => (
            <KeybindItem
              keybind={`${i + 1}` as RegisterableHotkey}
              description={`Go to cell ${i + 1}`}
              indented
            />
          ))}
        </KeybindsBlock>
      </DialogContent>
    </Dialog>
  );
};
