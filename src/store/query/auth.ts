import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { userAPI } from "@/api/user";

export const useAuth = () => {
  const useRegisterMutation = useMutation({
    mutationFn: userAPI.register,
    onError: () => toast.error("Failed to register"),
    mutationKey: ["register"],
  });

  const useLoginMutation = useMutation({
    mutationFn: userAPI.login,
    onError: () => toast.error("Failed to login"),
    mutationKey: ["login"],
  });

  const useMeQuery = useQuery({
    queryKey: ["me"],
    queryFn: userAPI.me,
  });

  return { useRegisterMutation, useLoginMutation, useMeQuery };
};
