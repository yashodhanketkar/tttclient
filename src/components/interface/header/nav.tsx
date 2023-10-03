import { useAuth } from "@/hooks/auth";
import { Box, Link } from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import { NavLinkStyle } from "./style";

export const NavBar = () => {
  const { user } = useAuth();

  if (!user.id || user.id === "") return <></>;

  return (
    <Box display="flex" flexDirection="row" gap={1}>
      <Link sx={NavLinkStyle} component={RouterLink} to="/board">
        Board
      </Link>
      <Link sx={NavLinkStyle} component={RouterLink} to="/stats">
        Stats
      </Link>
    </Box>
  );
};
