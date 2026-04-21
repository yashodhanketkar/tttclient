import { useAuth } from "@/hooks/auth";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { JoinGame } from "./join";
import { NewGame } from "./new";
import { GameButton } from "./common";

export const Home = () => {
  const { user } = useAuth();
  const [joinOpen, setJoinOpen] = useState(false);

  const handleJoinOpen = () => setJoinOpen((prev) => !prev);
  const loggedIn = user?.id ? true : false;

  return (
    <div>
      <div>
        <h1
          className="scroll-m-20 text-center font-extrabold tracking-tight text-balance mt-[30vh]
          mb-6 text-5xl md:mb-10 md:text-6xl"
        >
          Welcome to TTT
        </h1>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 justify-center">
        <NewGame active={!loggedIn} />
        <GameButton
          text="Join Game"
          onClick={handleJoinOpen}
          disabled={!loggedIn}
        />
      </div>
      {!loggedIn && (
        <div className="text-center text-sm text-stone-800 mt-4 italic">
          {"Please "}
          <NavLink className="font-bold" to="/login">
            login
          </NavLink>
          {" or "}
          <NavLink className="font-bold" to="/register">
            register
          </NavLink>
          {" to access."}
        </div>
      )}
      <JoinGame open={joinOpen} handleClick={handleJoinOpen} />
    </div>
  );
};
