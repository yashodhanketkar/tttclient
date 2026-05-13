import { useContext } from "react";

import { AuthContext } from "@/context/auth/core";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Context Error");
  const { user, setUser } = context;
  return { user, setUser };
};
