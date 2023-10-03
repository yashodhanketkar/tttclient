import { Box, Paper, Typography } from "@mui/material";
import { FooterElementStyle, FooterStyle } from "./style";

export const Footer = () => {
  return (
    <Box>
      <Paper variant="elevation" elevation={3} sx={FooterStyle}>
        <Box sx={FooterElementStyle}>
          <Typography>ticktactoe</Typography>
          <Typography>2023</Typography>
        </Box>
        <Box sx={FooterElementStyle}>
          <Typography flexGrow={1} textAlign={"center"} variant="caption">
            Yashodhan Ketkar
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
