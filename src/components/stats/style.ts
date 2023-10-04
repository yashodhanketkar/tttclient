import { SxProps } from "@mui/material";

export const StatsUnitButton: SxProps = {
  width: "100%",
  aspectRatio: 1,
  border: "1px solid",
  borderColor: "primary.main",
  fontSize: "3em",
};

export const StatsUnitGrid: SxProps = {
  width: "fit-content",
};

export const StatsUnitContainer: SxProps = {
  width: "50vw",
  marginX: "auto",
};

export const StatsButtton: SxProps = {
  width: "fit-content",
  paddingX: 1,
  paddingY: 0.25,
  borderRadius: 1,
};

export const StatsContainer: SxProps = {
  justifyContent: "space-evenly",
  margin: {
    xs: 4,
    md: 1,
  },
  gap: {
    xs: 4,
    md: 0,
  },
  width: "auto",
};

export const StatsGrid: SxProps = {
  boxShadow: "0rem 0rem 0.1rem 0.1rem #00000033",
  borderRadius: 1,
  ":hover": {
    boxShadow:
      "0rem 0rem 0.25rem 0.25rem #00000033, 0rem 0rem 0.25rem 0.25rem #FF000033",
  },
};
