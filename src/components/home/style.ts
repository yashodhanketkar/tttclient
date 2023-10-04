import { SxProps } from "@mui/material";

export const FlexCol: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: "50vw",
  maxWidth: "fit-content",
  marginX: " auto",
  gap: 4,
  "&>*": {
    textAlign: "center",
  },
};

export const GameInput: SxProps = {
  paddingX: 4,
  paddingY: 2,
  maxWidth: "fit-content",
  minWidth: "50%",
  fontSize: "1.25rem",
  textTransform: "none",
  "&:hover": {
    boxShadow: "0.3rem 0.3rem 0.5rem 0.1rem #00000033",
  },
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

export const RouterLinkStyle: SxProps = {
  textDecoration: "none",
  textTransform: "capitalize",
  "&:hover": {
    textDecorationLine: "underline",
    textUnderlineOffset: 4,
  },
};
