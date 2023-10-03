import { SxProps } from "@mui/material";

export const BoardUnitButton: SxProps = {
  width: "100%",
  aspectRatio: 1,
  border: "1px solid",
  borderColor: "primary.main",
  fontSize: "3em",
};

export const BoardUnitGrid: SxProps = {
  width: "100%",
};

export const BoardUnitContainer: SxProps = {
  width: "50%",
  marginX: "auto",
};

export const BoardButtton: SxProps = {
  width: "fit-content",
  paddingX: 1,
  paddingY: 0.25,
  borderRadius: 1,
};

export const BoardContainer: SxProps = {
  paddingX: {
    xs: 0,
    md: 5,
    xl: 15,
  },
  justifyContent: "space-between",
  gap: 5,
  width: "auto",
};

export const BoardGames: SxProps = {
  boxShadow: "0rem 0rem 0.1rem 0.1rem #00000033",
  borderRadius: 1,
  ":hover": {
    boxShadow:
      "0rem 0rem 0.25rem 0.25rem #00000033, 0rem 0rem 0.25rem 0.25rem #FF000033",
  },
};
