import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { boardAPI } from "@/api/board";

export const useBoard = () => {
  const useNewGameQuery = useQuery({
    queryKey: ["game"],
    queryFn: boardAPI.start,
  });

  const useJoinGameMutation = useMutation({
    mutationFn: boardAPI.join,
    onSuccess: () => toast.success("Joined"),
  });

  const useBoardByIdQuery = useMutation({
    mutationFn: boardAPI.getByID,
  });

  const useBoardMoveMutation = useMutation({
    mutationFn: boardAPI.move,
    onSuccess: () => toast.success("Played"),
    onError: () => toast.error("Failed to play a move"),
  });

  const useGetAllBoardsQuery = useQuery({
    queryKey: ["allBoards"],
    queryFn: boardAPI.getAll,
  });

  return {
    useNewGameQuery,
    useJoinGameMutation,
    useBoardByIdQuery,
    useBoardMoveMutation,
    useGetAllBoardsQuery,
  };
};
