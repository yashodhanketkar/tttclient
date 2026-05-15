import { DataTable } from "@/components/datatable";
import { useStats } from "@/store/query/stats";

import { columns } from "./data";

export const Stats = () => {
  const { useAllStatsQuery } = useStats();
  const { data: stats, isLoading, isError } = useAllStatsQuery;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="container mb-4">
      <DataTable columns={columns} data={stats} tableName="Player stats" />
    </div>
  );
};
