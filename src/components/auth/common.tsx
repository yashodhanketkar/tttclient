import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";

type PasswordToggleProps = {
  passwordVisible: boolean;
  togglePasswordVisibility: () => void;
};

export const PasswordToggle = (props: PasswordToggleProps) => {
  const { passwordVisible, togglePasswordVisibility } = props;

  return (
    <InputAdornment position="end">
      <IconButton type="button" onClick={togglePasswordVisibility}>
        {passwordVisible ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
};
