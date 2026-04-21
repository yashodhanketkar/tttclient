import { AuthSerivce } from "@/services";
import { useState } from "react";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { PasswordToggle } from "./common";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  FieldDescription,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Link, Navigate } from "react-router-dom";

type User = {
  username: string;
  password: string;
  cnfPassword: string;
};

export const Register = () => {
  const form = useForm<User>();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const onSubmit: SubmitHandler<User> = async (user) => {
    await AuthSerivce.register({
      username: user.username,
      password: user.password,
    });
    return Navigate({ to: "/login" });
  };

  const password = form.watch("password");
  const cnfPassword = form.watch("cnfPassword");

  let diabled = true;
  if (password?.trim() !== "" && password === cnfPassword) diabled = false;

  return (
    <Card className="w-1/2 md:w-1/4 mx-auto">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <p>Please register to continue</p>
      </CardHeader>
      <CardContent>
        <div className="container">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.error}>
                    <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Enter username"
                      autoComplete="off"
                      autoFocus
                      className="p-4"
                    />
                    <FieldDescription>Provide a username</FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.error}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Enter password"
                        autoComplete="off"
                        className="p-4"
                      />
                      <InputGroupAddon align="inline-end">
                        <PasswordToggle
                          passwordVisible={passwordVisible}
                          togglePasswordVisibility={togglePasswordVisibility}
                        />
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>Provide a password</FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="cnfPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.error}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Confirm Password"
                        autoComplete="off"
                        className="p-4"
                      />
                      <InputGroupAddon align="inline-end">
                        <PasswordToggle
                          passwordVisible={passwordVisible}
                          togglePasswordVisibility={togglePasswordVisibility}
                        />
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>Renter a password</FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <ButtonGroup>
                <Button disabled={diabled} type="submit">
                  Submit
                </Button>
                <Button variant="destructive" type="reset">
                  Reset
                </Button>
              </ButtonGroup>
            </FieldGroup>
          </form>
        </div>
      </CardContent>
      <CardFooter>
        <CardDescription>
          {"If not registered, you can here "}
          <Link className="font-bold" to="/login">
            Login
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};
