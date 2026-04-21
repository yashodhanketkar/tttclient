import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type PasswordToggleProps = {
  passwordVisible: boolean;
  togglePasswordVisibility: () => void;
};

export const PasswordToggle = (props: PasswordToggleProps) => {
  const { passwordVisible, togglePasswordVisibility } = props;

  return (
    <Button
      tabIndex={-1}
      size="icon"
      type="button"
      variant="ghost"
      onClick={togglePasswordVisibility}
    >
      {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
    </Button>
  );
};
