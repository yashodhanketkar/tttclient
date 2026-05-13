import type { ColumnDef } from "@tanstack/react-table";

import { colSorter, renderStatCell } from "@/components/datatablehelper";
import type { StatType } from "@/components/types";

export const columns: ColumnDef<StatType>[] = [
  {
    accessorKey: "#",
    header: ({ column }) => colSorter({ column, label: "SN" }),
    cell: (info) => info.row.index + 1,
    size: 5,
  },
  {
    accessorKey: "username",
    header: ({ column }) => colSorter({ column, label: "Username" }),
    accessorFn: (row) => row.username,
    size: 100,
  },
  {
    accessorKey: "games",
    header: ({ column }) => colSorter({ column, label: "Games" }),
    accessorFn: (row) => row.games,
    size: 15,
  },
  {
    accessorKey: "win",
    header: ({ column }) => colSorter({ column, label: "Wins" }),
    accessorFn: (row) => row.win,
    cell: (info) =>
      renderStatCell({
        count: info.row.original.win,
        rate: info.row.original.winRate,
      }),
    size: 15,
  },
  {
    accessorKey: "loss",
    header: ({ column }) => colSorter({ column, label: "Losses" }),
    accessorFn: (row) => row.loss,
    cell: (info) =>
      renderStatCell({
        count: info.row.original.loss,
        rate: info.row.original.lossRate,
      }),
    size: 15,
  },
  {
    accessorKey: "draw",
    header: ({ column }) => colSorter({ column, label: "Draws" }),
    accessorFn: (row) => row.draw,
    cell: (info) =>
      renderStatCell({
        count: info.row.original.draw,
        rate: info.row.original.drawRate,
      }),
    size: 15,
  },
];
