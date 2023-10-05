import { AuthSerivce } from "@/services";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PasswordToggle } from "./common";
import {
  AuthHeading,
  FormButton,
  FormContainer,
  FormElements,
  InputPropsStyle,
} from "./style";
import {useNavigate} from "react-router-dom";

type User = {
  username: string;
  password: string;
  cnfPassword: string;
};

export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  const [cnfMessage, setCnfMessage] = useState("Field is required");
  const [passwordVisible, setPasswordVisible] = useState(false);
	const navigate = useNavigate()

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const onSubmit: SubmitHandler<User> = async (user) => {
		const data = await AuthSerivce.register(user);
		if (data) return navigate("/login")
  };

  return (
    <Container>
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={FormContainer}
      >
        <Typography variant="h5" sx={AuthHeading}>
          Register
        </Typography>
        <TextField
          placeholder="username"
          type="text"
          sx={FormElements}
          InputProps={InputPropsStyle}
          {...register("username", { required: true })}
          error={Boolean(errors.username)}
          helperText={errors.username && "Field is required"}
        />
        <TextField
          placeholder="password"
          type={passwordVisible ? "text" : "password"}
          sx={FormElements}
          InputProps={{
            sx: InputPropsStyle.sx,
            endAdornment: (
              <PasswordToggle
                passwordVisible={passwordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            ),
          }}
          {...register("password", { required: true })}
          error={Boolean(errors.password)}
          helperText={errors.password && "Field is required"}
        />
        <TextField
          placeholder="Confirm Password"
          type={passwordVisible ? "text" : "password"}
          sx={FormElements}
          InputProps={{
            sx: InputPropsStyle.sx,
            endAdornment: (
              <PasswordToggle
                passwordVisible={passwordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            ),
          }}
          {...register("cnfPassword", {
            required: true,
            validate: (val: string) => {
              if (watch("password") !== val) {
                setCnfMessage("Passwords do not match");
                return "Passwords do not match";
              }
            },
          })}
          error={Boolean(errors.cnfPassword)}
          helperText={errors.cnfPassword && `${cnfMessage}`}
        />
        <Button sx={FormButton} variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
};
