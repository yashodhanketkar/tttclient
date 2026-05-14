import { useQuery } from "@tanstack/react-query";

import { userAPI } from "@/api/user";

export const useStats = (id?: string) => {
  const useAllStatsQuery = useQuery({
    queryKey: ["allStats"],
    queryFn: userAPI.getAll,
  });

  const useStatsByIdQuery = useQuery({
    queryKey: ["allStats", id],
    queryFn: () => userAPI.getByID(id!),
  });

  return {
    useAllStatsQuery,
    useStatsByIdQuery,
  };
};
