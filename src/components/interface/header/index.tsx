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
          <Button
            onClick={() => navigate("/")}
            sx={{ ...NavLinkStyle, flexGrow: 1, justifyContent: "start" }}
          >
            <Typography variant="h6">TicTacToe</Typography>
          </Button>
          <NavBar />
          <Profile />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
