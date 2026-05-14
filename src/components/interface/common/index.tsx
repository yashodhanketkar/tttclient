import { ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";

export const ToTop = () => {
  return (
    <Button
      size="icon-lg"
      variant="outline"
      className="rounded-full fixed bottom-20 right-15"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ChevronUp />
    </Button>
  );
};
