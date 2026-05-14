import { toast } from "sonner";

import { api } from "@/api/client";
import type { BoardType } from "@/components/types";

type Move = {
  index: number;
};

export const getAll = async (): Promise<BoardType[]> => {
  return api
    .get("/board")
    .then((res) => res.data.data)
    .catch((err: Error) => {
      console.error("Failed to fetch ", err.message);
      return [];
    });
};

export const getByID = async ({ id }: { id: string }): Promise<BoardType> => {
  return api
    .get("/board/" + id)
    .then((res) => {
      if (res.data.data.board.isGameOver) {
        toast.info("Game is over");
      }
      return res.data.data;
    })
    .catch((err: Error) => console.error(err.message));
};

export const join = async ({ id, key }: { id: string; key: string }) => {
  return api
    .put("/board/saved/" + id, { key })
    .then((res) => res.data.data.status)
    .catch((err: Error) => console.error("Failed to join, " + err.message));
};

export const start = async () => {
  return api
    .get("/board/new")
    .then((res) => res.data.data)
    .catch((err: Error) =>
      console.error("Failed to create new board, ", err.message),
    );
};

export const move = async ({ id, body }: { id: string; body: Move }) => {
  return await api
    .put("/board/move/" + id, { ...body })
    .then((res) => {
      if (res.status !== 200) throw new Error("Wrong move");
      return "ok";
    })
    .catch((err: Error) => console.error("Failed to play a move", err.message));
};

export const boardAPI = {
  getAll,
  getByID,
  join,
  start,
  move,
};
