import { CircleArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";

export const ScrollTopButton = () => {
  return (
    <Button
      size="icon-lg"
      variant="outline"
      className="rounded-full fixed bottom-15 right-15 dark:bg-secondary dark:text-primary-secondary"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <CircleArrowUp className="size-6" />
    </Button>
  );
};
