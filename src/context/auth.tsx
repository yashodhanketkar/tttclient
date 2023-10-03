// import { AuthRouter } from "@/routes";
import { AuthSerivce } from "@/services";
import { createContext, useEffect, useState } from "react";

// const BASE_URL = import.meta.env.VITE_BASE_URL;

export type TUser = {
  id: string;
  username: string;
};

export const User: TUser = {
  id: "",
  username: "",
};

type TAuthContext<T> = {
  user: T;
  setUser: React.Dispatch<React.SetStateAction<T>>;
};

export const AuthContext = createContext<TAuthContext<TUser> | null>(null);

type AuthWrapperProps = {
  children: React.ReactNode;
};

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [user, setUser] = useState<TUser>(User);

  useEffect(() => {
    const apiData = async () => {
      const data = await AuthSerivce.me();
      if (data) setUser(data);
    };
    apiData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
