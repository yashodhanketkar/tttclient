import { useAuthStore } from "@/store/authState";

import { Button } from "../ui/button";

export const LogoutButton = () => {
  const { setToken } = useAuthStore();

  const handleLogout = async () => {
    setToken("");
    window.location.href = "/";
  };

  return (
    <Button autoFocus onClick={() => handleLogout()}>
      Logout
    </Button>
  );
};
