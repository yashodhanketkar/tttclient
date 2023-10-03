import { BoardService } from "@/services/boards";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { DialogButton, DialogStyle } from "./style";
import { BoardType } from "./types";

type InputType = {
  key: string;
};

type NewGameProps = {
  open: boolean;
  handleClick: () => void;
};

export const JoinGame = ({ open, handleClick }: NewGameProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [boards, setBoards] = useState<BoardType[]>();

  useEffect(() => {
    const apiData = async () => {
      const data = await BoardService.getAll();
      if (data) setBoards(data);
      setLoading(false);
    };
    apiData();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputType>();

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const res = await BoardService.join(id, data.key);
    if (res) navigate("/board/" + id);
  };

  const onReset = () => {
    setId("");
    reset();
  };

  if (loading) return <>Loading</>;

  if (boards && boards.length > 0)
    return (
      <Dialog open={open} onClose={handleClick}>
        <Box sx={DialogStyle}>
          {!id || id === "" ? (
            boards
              .filter((board) => !board.isGameOver)
              .map((board, i) => {
                return (
                  <Button key={board._id} onClick={() => setId(board._id)}>
                    Game {i}
                  </Button>
                );
              })
          ) : (
            <SecondScreen
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              handleClick={handleClick}
              navigate={navigate}
              onReset={onReset}
            />
          )}
        </Box>
      </Dialog>
    );
};

type SecondScreenProps = {
  register: UseFormRegister<InputType>;
  errors: FieldErrors<InputType>;
  handleSubmit: UseFormHandleSubmit<InputType, undefined>;
  onSubmit: SubmitHandler<InputType>;
  handleClick: () => void;
  navigate: NavigateFunction;
  onReset: () => void;
};

const SecondScreen = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  handleClick,
  navigate,
  onReset,
}: SecondScreenProps) => {
  return (
    <>
      <Typography>Join game?</Typography>
      <TextField
        {...register("key", { required: true })}
        error={Boolean(errors.key)}
        helperText={errors.key && "Key required"}
      />
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        display={"flex"}
        flexDirection={"row"}
        gap={1}
      >
        <Button
          sx={DialogButton}
          variant="contained"
          onClick={() => {
            handleClick();
            navigate("/");
          }}
          type="submit"
        >
          Join
        </Button>
        <Button
          sx={DialogButton}
          variant="contained"
          onClick={() => {
            handleClick();
            onReset();
          }}
        >
          Close
        </Button>
      </Box>
    </>
  );
};
