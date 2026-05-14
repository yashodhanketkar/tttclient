import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { FormInputField } from "@/components/inputfield";
import { useAuthStore } from "@/store/authState";
import { useAuth } from "@/store/query/auth";

import { AuthWrapper } from "./wrapper";

type User = {
  username: string;
  password: string;
};

export const Login = () => {
  const form = useForm<User>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { useLoginMutation } = useAuth();
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<User> = async (user) => {
    useLoginMutation.mutate(user, {
      onSuccess: (data) => {
        setToken(data);
        navigate("/");
      },
    });
  };

  return (
    <AuthWrapper
      form={form}
      formTitle="Login"
      onSubmit={onSubmit}
      diabled={false}
    >
      <FormInputField control={form.control} name="username" />
      <FormInputField control={form.control} name="password" hideable />
    </AuthWrapper>
  );
};
