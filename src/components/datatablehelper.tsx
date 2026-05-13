import type { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "./ui/button";

export const colSorter = <T,>({ label, column }: { label: string; column: Column<T, unknown> }) => {
  return (
    <Button
      variant="ghost"
      className="w-full inline-flex justify-between"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      <ArrowUpDown className="" />
    </Button>
  );
};

export const renderStatCell = ({ count, rate }: { count: number; rate: number }) => {
  const scount = count ?? 0;
  const srate = rate ?? 0;

  return (
    <div className="inline-flex gap-1">
      <span className="font-bold">{scount}</span>
      <span>({(srate * 100).toFixed(2)}%)</span>
    </div>
  );
};
