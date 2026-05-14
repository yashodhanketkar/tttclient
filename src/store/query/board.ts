import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { boardAPI } from "@/api/board";

export const useBoard = () => {
  const qc = useQueryClient();

  const useNewGameMutation = useMutation({
    mutationFn: boardAPI.start,
    onSuccess: () => toast.success("Game started"),
  });

  const useJoinGameMutation = useMutation({
    mutationFn: boardAPI.join,
    onSuccess: () => toast.success("Joined"),
  });

  const useBoardByIdQuery = (id: string) =>
    useQuery({
      queryFn: () => boardAPI.getByID(id),
      queryKey: ["board"],
    });

  const useBoardMoveMutation = useMutation({
    mutationFn: boardAPI.move,
    onSuccess: () => {
      toast.success("Played");
      qc.invalidateQueries({ queryKey: ["board"] });
    },
    onError: () => toast.error("Failed to play a move"),
  });

  const useGetAllBoardsQuery = useQuery({
    queryKey: ["allBoards"],
    queryFn: boardAPI.getAll,
  });

  return {
    useNewGameMutation,
    useJoinGameMutation,
    useBoardByIdQuery,
    useBoardMoveMutation,
    useGetAllBoardsQuery,
  };
};
