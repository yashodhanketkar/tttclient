import { useAuth } from "@/hooks/auth";
import { Box, Button, Link, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { JoinGame } from "./join";
import { NewGame } from "./new";
import { FlexCol, GameInput, RouterLinkStyle } from "./style";

export const Home = () => {
  const { user } = useAuth();
  const [newOpen, setNewOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  const handleNewOpen = () => setNewOpen((prev) => !prev);
  const handleJoinOpen = () => setJoinOpen((prev) => !prev);

  return (
    <Box sx={FlexCol}>
      <Box component="header" display={"flex"} flexDirection={"column"}>
        <Typography color="text.main" variant="h3">
          Welcome to tictactoe
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.main"
          paddingX={{ xs: 1, md: 0 }}
          textAlign={"end"}
        >
          powered by MUI
        </Typography>
      </Box>
      <Box sx={FlexCol}>
        <Button
          disabled={!user || !user.id}
          variant="contained"
          onClick={handleNewOpen}
          sx={GameInput}
        >
          Start New Game
        </Button>
      </Box>
      <Box sx={FlexCol}>
        <Button
          disabled={!user || !user.id}
          variant="contained"
          onClick={handleJoinOpen}
          sx={GameInput}
        >
          Join Game
        </Button>
      </Box>
      {(!user || !user.id) && (
        <Typography color="text.main">
          {"Please "}
          <Link sx={RouterLinkStyle} component={RouterLink} to="/login">
            login
          </Link>
          {" or "}
          <Link sx={RouterLinkStyle} component={RouterLink} to="/register">
            register
          </Link>
          {" to access."}
        </Typography>
      )}
      <NewGame open={newOpen} handleClick={handleNewOpen} />
      <JoinGame open={joinOpen} handleClick={handleJoinOpen} />
    </Box>
  );
};
