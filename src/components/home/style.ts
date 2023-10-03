import { SxProps } from "@mui/material";

export const FlexCol: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "50vw",
  marginX: " auto",
  gap: 4,
};

export const GameInput: SxProps = {
  paddingX: 4,
  paddingY: 2,
  width: "50%",
  fontSize: "1.25rem",
  textTransform: "none",
};

export const DialogStyle: SxProps = {
  paddingX: 4,
  paddingY: 2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 1,
};

export const DialogButton: SxProps = {
  paddingX: 2,
  paddingY: 1,
  width: "50%",
};
