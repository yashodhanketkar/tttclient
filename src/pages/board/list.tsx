import { useEffect, useState } from "react";

import { ToTop } from "@/components/interface/common";
import type { BoardType } from "@/components/types";
import { useAuth } from "@/hooks/auth";
import { BoardService } from "@/services";

import { DataTable } from "../../components/datatable";
import { columns } from "./data";

export const Boards = () => {
  const [boards, setBoards] = useState<BoardType[]>([]);
  const {
    user: { id },
  } = useAuth();

  useEffect(() => {
    const apiData = async () => {
      const boards: BoardType[] = await BoardService.getAll();
      setBoards(
        boards.filter((board) => {
          if (board.startedBy?._id == id) return true;
          if (board.against?._id == id) return true;
          return false;
        }),
      );
    };
    apiData();
  }, [id]);

  return (
    <div className="grid">
      <DataTable columns={columns} data={boards} opts />
      <ToTop />
    </div>
  );
};
