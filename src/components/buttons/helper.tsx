import { CircleQuestionMarkIcon } from "lucide-react";

import { Button } from "../ui/button";

export const HelpDialogButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      size="icon-lg"
      variant="ghost"
      onClick={onClick}
      title={`Press ? to show keybinds`}
      className="rounded-full fixed bottom-15 right-5 dark:bg-secondary dark:text-primary-secondary"
    >
      <CircleQuestionMarkIcon className="size-6" />
    </Button>
  );
};
