import { useAuth } from "@/store/query/auth";
import { useBoard } from "@/store/query/board";

import { DataTable } from "../../components/datatable";
import { columns } from "./data";

export const Boards = () => {
  const { useMeQuery } = useAuth();
  const {
    data: { id },
  } = useMeQuery;

  const { useGetAllBoardsQuery } = useBoard();

  const { data: Allboards, isLoading, isError } = useGetAllBoardsQuery;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const boards = Allboards?.filter((board) => {
    if (board.startedBy?._id == id) return true;
    if (board.against?._id == id) return true;
    return false;
  });

  return (
    <div className="container mb-4">
      <DataTable columns={columns} data={boards!} tableName="My boards" opts />
    </div>
  );
};
