import { Logout } from "@/components/auth/logout";
import { useAuth } from "@/hooks/auth";
import { Avatar, Box, Button, ClickAwayListener, Popper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PopperElementStyle, PopperStyle, ProfileStyle } from "./style";

export const Profile = () => {
  const { user } = useAuth();
  const [userEl, setUserEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent | TouchEvent | MouseEvent) => {
    setUserEl((e as React.MouseEvent<HTMLElement>).currentTarget);
  };

  const handleClickAway = () => {
    setUserEl(null);
  };

  const open = Boolean(userEl);
  const id = open ? "user" : undefined;

  return (
    <>
      {user.username && user.username !== "" ? (
        <>
          <Avatar onClick={handleClick} alt={user.username} sx={ProfileStyle}>
            {user.username?.charAt(0)}
          </Avatar>
          {userEl && (
            <ClickAwayListener
              mouseEvent="onMouseDown"
              touchEvent="onTouchStart"
              onClickAway={handleClickAway}
            >
              <Popper
                id={id}
                open={open}
                anchorEl={userEl}
                placement="bottom-end"
              >
                <Box sx={PopperStyle}>
                  <Button
                    onClick={Logout}
                    variant="contained"
                    sx={PopperElementStyle}
                  >
                    Logout
                  </Button>
                </Box>
              </Popper>
            </ClickAwayListener>
          )}
        </>
      ) : (
        <Button sx={ProfileStyle} onClick={() => navigate("/login")}>
          Login
        </Button>
      )}
    </>
  );
};
