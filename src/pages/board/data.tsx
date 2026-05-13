import type { ColumnDef } from "@tanstack/react-table";

import { colSorter } from "@/components/datatablehelper";
import type { BoardType } from "@/components/types";

export const columns: ColumnDef<BoardType>[] = [
  {
    accessorKey: "#",
    header: ({ column }) => colSorter({ column, label: "SN" }),
    cell: (info) => info.row.index + 1,
    size: 5,
  },
  {
    accessorKey: "startedBy",
    header: ({ column }) => colSorter({ column, label: "Started by" }),
    accessorFn: (row) => row.startedBy.username,
    size: 100,
  },
  {
    accessorKey: "against",
    header: ({ column }) => colSorter({ column, label: "Against" }),
    accessorFn: (row) => row.against?.username,
    size: 100,
  },
  {
    accessorKey: "winner",
    header: ({ column }) => colSorter({ column, label: "Winner" }),
    accessorFn: (row) => row.winner?.username,
    size: 100,
  },
];
