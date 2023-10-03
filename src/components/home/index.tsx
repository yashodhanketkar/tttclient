import { useAuth } from "@/hooks/auth";
import { Box, Button, Link, Typography } from "@mui/material";
import { useState } from "react";
import { JoinGame } from "./join";
import { NewGame } from "./new";
import { FlexCol, GameInput } from "./style";

export const Home = () => {
  const { user } = useAuth();
  const [newOpen, setNewOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  const handleNewOpen = () => setNewOpen((prev) => !prev);
  const handleJoinOpen = () => setJoinOpen((prev) => !prev);

  return (
    <Box sx={FlexCol}>
      <Box component="header" display={"flex"} flexDirection={"column"}>
        <Typography variant="h3">Welcome to tictactoe</Typography>
        <Typography variant="subtitle1" flexGrow={1} textAlign={"end"}>
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
        <Typography>
          {"Please "}
          <Link component={"a"} href="/register">
            register
          </Link>
          {" or "}
          <Link component={"a"} href="/login">
            login
          </Link>
          {" to access."}
        </Typography>
      )}
      <NewGame open={newOpen} handleClick={handleNewOpen} />
      <JoinGame open={joinOpen} handleClick={handleJoinOpen} />
    </Box>
  );
};
