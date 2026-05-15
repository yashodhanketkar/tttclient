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
      className="w-1/2 md:w-auto mx-auto md:mx-0
      border-0 transition-all duration-200 text-xl p-6
      hover:shadow-lg hover:shadow-primary md:hover:-translate-y-1"
      disabled={disabled}
    >
      {text}
    </Button>
  );
};
