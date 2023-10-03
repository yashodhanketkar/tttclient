import { AuthSerivce } from "@/services";
import { Box, Button, Container, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormButton, FormContainer, FormElements, InputPropsStyle } from "./style";

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

  const onSubmit: SubmitHandler<User> = async (user) => {
    await AuthSerivce.login(user);
  };

  return (
    <Container>
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={FormContainer}
      >
        <Typography variant="h5" fontWeight={600} textAlign="center">
          Register
        </Typography>
        <TextField
          placeholder="username"
          type="text"
          sx={FormElements}
					InputProps={{sx: InputPropsStyle.sx, endAdornment: <InputAdornment position="end">Test</InputAdornment>}}
          {...register("username", { required: true })}
          error={Boolean(errors.username)}
          helperText={errors.username && "Field is required"}
        />
        <TextField
          placeholder="password"
          type="password"
          sx={FormElements}
					InputProps={InputPropsStyle}
          {...register("password", { required: true })}
          error={Boolean(errors.password)}
          helperText={errors.password && "Field is required"}
        />
        <TextField
          placeholder="Confirm Password"
          type="password"
          sx={FormElements}
					InputProps={InputPropsStyle}
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
