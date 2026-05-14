import { type SubmitHandler, useForm, useWatch } from "react-hook-form";

import { FormInputField } from "@/components/inputfield";
import { useAuth } from "@/store/query/auth";

import { AuthWrapper } from "./wrapper";

type User = {
  username: string;
  password: string;
  cnfPassword: string;
};

export const Register = () => {
  const form = useForm<User>({
    defaultValues: { username: "", password: "", cnfPassword: "" },
  });

  const { useRegisterMutation } = useAuth();

  const onSubmit: SubmitHandler<User> = async (user) => {
    useRegisterMutation.mutate({
      username: user.username,
      password: user.password,
    });
  };

  const [password, cnfPassword] = useWatch({
    control: form.control,
    name: ["password", "cnfPassword"],
  });

  let diabled = true;
  if (password?.trim() !== "" && password === cnfPassword) diabled = false;

  return (
    <AuthWrapper
      form={form}
      formTitle="Register"
      onSubmit={onSubmit}
      diabled={diabled}
    >
      <FormInputField control={form.control} name="username" />
      <FormInputField control={form.control} name="password" hideable />
      <FormInputField control={form.control} name="cnfPassword" hideable />
    </AuthWrapper>
  );
};
