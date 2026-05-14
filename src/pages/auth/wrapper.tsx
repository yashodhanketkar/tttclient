import { type UseFormReturn } from "react-hook-form";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";

type User = {
  username: string;
  password: string;
  cnfPassword?: string;
};

interface AuthWrapperProps<T extends User> {
  form: UseFormReturn<T, any, T>;
  formTitle: string;
  children: React.ReactNode;
  onSubmit: (data: T) => void;
  diabled: boolean;
}

export const AuthWrapper = <T extends User>({
  form,
  formTitle,
  children,
  diabled,
  onSubmit,
}: AuthWrapperProps<T>) => {
  return (
    <Card className="w-11/12 lg:w-1/4 mx-auto mt-[45vh] transform -translate-y-1/2">
      <CardHeader>
        <CardTitle>{formTitle}</CardTitle>
        <p>Please {formTitle.toLowerCase()} to proceed</p>
      </CardHeader>
      <CardContent>
        <div className="container">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {children}
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
