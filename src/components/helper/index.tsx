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
import { availableKeybinds } from "./data";
import { KeybindsRenderer } from "./factory";

export const HelperDialog = () => {
  const { isOpen, setOpen } = useHelpStore();

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            size="icon-lg"
            variant="outline"
            title={`Press ? to show keybinds`}
            className="rounded-full fixed bottom-20 right-5"
          >
            <CircleQuestionMarkIcon />
          </Button>
        }
      />
      <DialogContent className="flex flex-col gap-1" showCloseButton={false}>
        <DialogHeader className="mb-2">
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Here are the keyboard shortcuts for the app
          </DialogDescription>
        </DialogHeader>

        {/* redners keybinds */}
        <KeybindsRenderer availableKeybinds={availableKeybinds} />
      </DialogContent>
    </Dialog>
  );
};
