import { httpService } from "@/config/httpservice";

type Move = {
  index: number;
};

class BoardServiceClass {
  getAll = async () => {
    return httpService
      .get("/board")
      .then((res) => res.data)
      .catch((err: Error) => {
        console.log("Failed to fetch ", err.message);
        return [];
      });
  };

  getID = async (id: string) => {
    return httpService
      .get("/board/" + id)
      .then((res) => res.data)
      .catch((err: Error) => console.log(err.message));
  };

  join = async (id: string, key: string) => {
    return httpService
      .put("/board/saved/" + id, { key })
      .then((res) => res.data.status)
      .catch((err: Error) => console.log("Failed to join, " + err.message));
  };

  start = async () => {
    return httpService
      .get("/board/new")
      .then((res) => res.data)
      .catch((err: Error) =>
        console.log("Failed to create new board, ", err.message)
      );
  };

  move = async (id: string, body: Move) => {
    return await httpService
      .put("/board/move/" + id, { ...body })
      .then((res) => {
        if (res.status !== 200) throw new Error("Wrong move");
        return "ok";
      })
      .catch((err: Error) => console.log("Failed to play a move", err.message));
  };
}

export const BoardService = new BoardServiceClass();
