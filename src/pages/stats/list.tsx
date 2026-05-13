import { useEffect, useState } from "react";

import { DataTable } from "@/components/datatable";
import { ToTop } from "@/components/interface/common";
import { type StatType } from "@/components/types";
import { StatService } from "@/services";

import { columns } from "./data";

export const Stats = () => {
  const [stats, setStats] = useState<StatType[]>([]);

  useEffect(() => {
    const apiData = async () => {
      const data = await StatService.getAll();
      if (data) {
        setStats(data.data);
      }
    };
    apiData();
  }, []);

  console.log(stats);

  return (
    <div className="container">
      <DataTable columns={columns} data={stats} />
      <ToTop />
    </div>
  );
};
