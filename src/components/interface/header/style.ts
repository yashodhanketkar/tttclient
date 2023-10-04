import { SxProps } from "@mui/material";

export const ProfileStyle: SxProps = {
  color: "red",
  backgroundColor: "white",
  fontWeight: 700,
  height: "2.5rem",
  width: "2.5rem",
  marginX: "0.5rem",
  ":hover": {
    color: "red",
    backgroundColor: "white",
    boxShadow: "0 0 1rem 0.1rem white",
  },
};

export const NavLinkStyle: SxProps = {
  color: "text.secondary",
  fontWeight: 600,
};

export const ToolBarStyle: SxProps = {
  gap: "0.25rem",
};

export const PopperStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
  padding: 1,
  marginTop: 0.5,
  backgroundColor: "white",
  borderRadius: 1,
};

export const PopperElementStyle: SxProps = {
  paddingX: 1,
  paddingY: 0.5,
};
