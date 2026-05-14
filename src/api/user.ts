import { toast } from "sonner";

import { api } from "./client";

type AuthData = {
  username: string;
  password: string;
};

const register = async (data: AuthData) => {
  const res = await api.post("/user/register", { ...data });
  if (res.data.message !== "User registered") return;

  toast.success("User registered successfully");
  return res.data.data;
};

const login = async (data: AuthData) => {
  const res = await api.post("/user/login", { ...data });
  if (res.data.message !== "User logged in") return;

  return res.data.data.token ?? "";
};

const me = async () => {
  const res = await api.get("/user/me", {
    headers: { "Cache-control": "no-cache" },
  });

  if (res.status !== 200) {
    toast.error("Failed to fetch user");
    return;
  }

  return res.data.data;
};

const getAll = async () => {
  const res = await api.get("/user/stats");

  if (res.status !== 200) {
    toast.error("Failed to fetch user stats");
    return [];
  }

  return res.data.data;
};

const getByID = async (id: string) => {
  const res = await api.get("/user/stats/" + id);

  if (res.status !== 200) {
    toast.error("Failed to fetch user stats");
    return;
  }

  return res.data.data;
};

export const userAPI = {
  register,
  login,
  me,
  getAll,
  getByID,
};
