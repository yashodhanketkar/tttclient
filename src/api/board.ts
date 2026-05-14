import { toast } from "sonner";

import { api } from "@/api/client";
import type { BoardType } from "@/components/types";

type Move = {
  index: number;
};

export const getAll = async (): Promise<BoardType[]> => {
  const res = await api.get("/board");

  if (res.status !== 200) {
    toast.error("Failed to fetch boards");
    return [];
  }

  return res.data.data;
};

export const getByID = async (id: string): Promise<BoardType | undefined> => {
  const res = await api.get("/board/" + id);

  return res.data.data.board;
};

export const start = async () => {
  const res = await api.get("/board/new");

  if (res.status !== 201) {
    toast.error("Failed to create new board");
    return;
  }

  return res.data.data;
};

export const join = async ({ id, key }: { id: string; key: string }) => {
  const res = await api.put("/board/saved/" + id, { key });

  if (res.status !== 200) {
    toast.error("Failed to join game");
    return;
  }

  return res.data.data.status;
};

export const move = async ({ id, body }: { id: string; body: Move }) => {
  const res = await api.put("/board/move/" + id, { ...body });

  if (res.status !== 200) {
    toast.error("Wrong move");
  }

  return "Ok";
};

export const boardAPI = {
  getAll,
  getByID,
  join,
  start,
  move,
};
