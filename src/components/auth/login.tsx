import { AuthSerivce } from "@/services";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormContainer, FormElements, InputPropsStyle, FormButton } from "./style";

type User = {
  username: string;
  password: string;
};


export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

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
          Login
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
          type="password"
          sx={FormElements}
					InputProps={InputPropsStyle}
          {...register("password", { required: true })}
          error={Boolean(errors.password)}
          helperText={errors.password && "Field is required"}
        />
				<Button sx={FormButton} variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
};
