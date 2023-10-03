import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton, SxProps } from "@mui/material";

const PageUpButton: SxProps = {
  position: "fixed",
  bottom: 50,
  right: 10,
  zIndex: 999,
  borderRadius: "100%",
  aspectRatio: 1,
  backgroundColor: "#FF000055",
};

export const ToTop = () => {
  return (
    <IconButton
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      sx={PageUpButton}
    >
      <UpIcon />
    </IconButton>
  );
};
