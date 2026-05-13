import { useEffect, useState } from "react";

import { AuthSerivce } from "@/services";

import { AuthContext, type TUser, User } from "./core";

type AuthWrapperProps = {
  children: React.ReactNode;
};

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [user, setUser] = useState<TUser>(User);

  useEffect(() => {
    const apiData = async () => {
      const data = await AuthSerivce.me();
      if (data) setUser(data.data);
    };
    apiData();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
