import { useAuth } from "@/hooks/auth";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { JoinGame } from "./join";
import { NewGame } from "./new";

export const Home = () => {
  const { user } = useAuth();
  const [newOpen, setNewOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  const handleNewOpen = () => setNewOpen((prev) => !prev);
  const handleJoinOpen = () => setJoinOpen((prev) => !prev);

  return (
    <div>
      <div>
        <p>Welcome to tictactoe</p>
        <p>powered by MUI</p>
      </div>
      <div>
        <button disabled={!user || !user.id}>Start New Game</button>
      </div>
      <p>
        <button disabled={!user || !user.id}>Join Game</button>
      </p>
      {(!user || !user.id) && (
        <p color="text.main">
          {"Please "}
          <NavLink to="/login">login</NavLink>
          {" or "}
          <NavLink to="/register">register</NavLink>
          {" to access."}
        </p>
      )}
      <NewGame open={newOpen} handleClick={handleNewOpen} />
      <JoinGame open={joinOpen} handleClick={handleJoinOpen} />
    </div>
  );
};
