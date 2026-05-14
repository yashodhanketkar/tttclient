import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import type {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { Field, FieldDescription, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

interface FormInputFieldProps<T extends FieldValues> {
  control: Control<T, any, any>;
  name: Path<T>;
  hideable?: boolean;
}

export const FormInputField = <T extends FieldValues>({
  control,
  name,
  hideable = false,
}: FormInputFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.error}>
          <FieldLabel htmlFor={field.name} className="capitalize">
            {name}
          </FieldLabel>
          {hideable ? (
            <ProtectedTextField field={field} />
          ) : (
            <TextField field={field} />
          )}
          <FieldDescription>Enter {name}</FieldDescription>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

interface TextFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
}

const TextField = <T extends FieldValues>({ field }: TextFieldProps<T>) => {
  return (
    <Input
      {...field}
      id={field.name}
      placeholder="Enter username"
      autoComplete="off"
      autoFocus
      className="p-4"
    />
  );
};

const ProtectedTextField = <T extends FieldValues>({
  field,
}: TextFieldProps<T>) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  return (
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
  );
};

type PasswordToggleProps = {
  passwordVisible: boolean;
  togglePasswordVisibility: () => void;
};

export const PasswordToggle = (props: PasswordToggleProps) => {
  const { passwordVisible, togglePasswordVisibility } = props;

  return (
    <Button
      tabIndex={-1}
      size="icon"
      type="button"
      variant="ghost"
      onClick={togglePasswordVisibility}
    >
      {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
    </Button>
  );
};
