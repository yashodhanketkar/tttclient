import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./nav";
import { Profile } from "./profile";
import { NavLinkStyle, ToolBarStyle } from "./style";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={ToolBarStyle}>
          <Box sx={{ flexGrow: 1, justifyContent: "start" }}>
            <Button onClick={() => navigate("/")} sx={NavLinkStyle}>
              <Typography variant="h6" fontWeight={600}>
                TicTacToe
              </Typography>
            </Button>
          </Box>
          <NavBar />
          <Profile />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
