import { Button } from "@/components/ui/button";

export const GameButton = ({
  disabled,
  text,
  onClick,
  id = "",
}: {
  disabled?: boolean;
  text: string;
  onClick?: () => void;
  id?: string;
}) => {
  return (
    <Button
      onClick={onClick}
      id={id}
      className="
      md:hover:p-7 md:hover:-translate-y-1 w-1/2 md:w-auto mx-auto md:mx-0
      text-xl p-6 hover:bg-stone-700"
      disabled={disabled}
    >
      {text}
    </Button>
  );
};
