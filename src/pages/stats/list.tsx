import { DataTable } from "@/components/datatable";
import { ToTop } from "@/components/interface/common";
import { useStats } from "@/store/query/stats";

import { columns } from "./data";

export const Stats = () => {
  const { useAllStatsQuery } = useStats();
  const { data: stats, isLoading, isError } = useAllStatsQuery;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="container">
      <DataTable columns={columns} data={stats} />
      <ToTop />
    </div>
  );
};
