import { createContext } from "react";

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
