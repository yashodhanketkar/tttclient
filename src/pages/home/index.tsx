import { NavLink } from "react-router-dom";

import { useAuthStore } from "@/store/authState";

import { JoinGame } from "./join";
import { NewGame } from "./new";

export const Home = () => {
  const { token } = useAuthStore();
  const loggedIn = token !== "";

  return (
    <div>
      <div>
        <h1
          className="scroll-m-20 text-center font-extrabold tracking-tight text-balance text-5xl md:text-6xl
          mt-[30vh] mb-6 md:mb-10 w-[15ch] mx-auto group cursor-pointer"
        >
          Welcome to the
          <span
            className="rounded-md mx-2 transition-all duration-300 ease-in-out delay-100
            group-hover:bg-primary group-hover:text-primary-foreground group-hover:px-2"
          >
            TTT
          </span>
        </h1>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 justify-center">
        <NewGame active={loggedIn} />
        <JoinGame active={loggedIn} />
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
    </div>
  );
};
