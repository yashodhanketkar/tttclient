import { useHelpStore } from "@/store/helpState";

import { HelpDialogButton } from "../buttons/helper";
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
        render={<HelpDialogButton onClick={() => setOpen(true)} />}
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
