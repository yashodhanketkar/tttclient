import { useAuth } from "@/hooks/auth";
import { BoardService } from "@/services";
import { useEffect, useState } from "react";
import { ToTop } from "@/components/interface/common";
import { type BoardType } from "@/components/types";
import { type ColumnDef, type Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { DataTable } from "./table";

const ColSorter = ({
  label,
  column,
}: {
  label: string;
  column: Column<BoardType, unknown>;
}) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      <ArrowUpDown className="" />
    </Button>
  );
};

export const columns: ColumnDef<BoardType>[] = [
  {
    accessorKey: "#",
    header: "Serial",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "startedBy",
    header: ({ column }) => ColSorter({ column, label: "Started by" }),
    accessorFn: (row) => row.startedBy.username,
  },
  {
    accessorKey: "against",
    header: ({ column }) => ColSorter({ column, label: "Against" }),
    accessorFn: (row) => row.against?.username,
    maxSize: 100,
  },
  {
    accessorKey: "winner",
    header: ({ column }) => ColSorter({ column, label: "Winner" }),
    accessorFn: (row) => row.winner?.username,
    maxSize: 100,
  },
  {
    accessorKey: "_id",
    header: "Board ID",
    accessorFn: (row) => row._id,
  },
];

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
  }, []);

  return (
    <div className="grid">
      <DataTable columns={columns} data={boards} />
      <ToTop />
    </div>
  );
};
