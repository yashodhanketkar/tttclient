import { Link } from "react-router-dom";
import { NavBar } from "./nav";

export const Header = () => {
  return (
    <div className="flex inline-flex justify-between px-4 py-2 w-full border-b border-border">
      <Link to="/" className="font-semibold text-lg">
        TicTacToe
      </Link>
      <NavBar />
    </div>
  );
};
