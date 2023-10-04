import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F00",
    },
    background: {
      default: "#EEE",
      paper: "#FFF",
    },
    text: {
      primary: "#000",
      secondary: "#FFF",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#F00",
    },
    background: {
      default: "#333",
      paper: "#FFF",
    },
    text: {
      primary: "#000",
      secondary: "#DDD",
    },
    action: {
      disabled: "#FFFFFF44",
      disabledBackground: "#FF000044",
    },
  },
});
