import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import {
  type FieldErrors,
  type SubmitHandler,
  useForm,
  type UseFormHandleSubmit,
  type UseFormRegister,
} from "react-hook-form";
import { type NavigateFunction, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useBoard } from "@/store/query/board";

import { GameButton } from "./common";

type InputType = {
  key: string;
};

const WebSocketURL: string | undefined = import.meta.env.VITE_BASE_URL_WS;
if (!WebSocketURL) throw new Error("Incorrect webscoket connection string");

export const JoinGame = ({ active }: { active: boolean }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputType>();
  const websock = useMemo(() => new WebSocket(WebSocketURL), []);

  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const { useGetAllBoardsQuery, useJoinGameMutation } = useBoard();

  const { data, isLoading, isError } = useGetAllBoardsQuery;
  const boards = data?.filter((board) => !board.isGameOver);
  const qc = useQueryClient();

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    useJoinGameMutation.mutate(
      { id: id, key: data.key },
      {
        onSuccess: () => navigate("/board/" + id),
      },
    );
  };

  const handleClick = () => {
    setId("");
  };

  const onReset = () => {
    setId("");
    reset();
  };

  useEffect(() => {
    websock.onmessage = (e) => {
      const scdata = JSON.parse(e.data);
      if ((scdata?.message as string).includes("New board created")) {
        qc.invalidateQueries({
          queryKey: ["allBoards"],
        });
      }
    };

    return () => {
      websock.onmessage = null;
    };
  }, [websock]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <GameButton
            id="join-game-button"
            text="Join Game"
            disabled={
              !active || !boards || boards.length < 1 || isLoading || isError
            }
            onClick={() => setOpen(true)}
          />
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Games</DialogTitle>
        </DialogHeader>
        {!id || id === "" ? (
          boards &&
          boards
            .filter((board) => !board.isGameOver)
            .map((board, i) => {
              return (
                <Button
                  variant="outline"
                  key={board._id}
                  onClick={() => setId(board._id)}
                >
                  Game {i + 1} - By {board.startedBy.username}
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
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type SecondScreenProps = {
  register: UseFormRegister<InputType>;
  errors: FieldErrors<InputType>;
  handleSubmit: UseFormHandleSubmit<InputType>;
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
  onReset,
}: SecondScreenProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="game-key-input">Enter game key</FieldLabel>
          <Input id="game-key-input" {...register("key", { required: true })} />
        </Field>
        {errors.key && <p>{errors.key.message}</p>}
        <ButtonGroup orientation="horizontal" className="ml-auto">
          <Button
            variant="outline"
            onClick={() => {
              handleClick();
              onReset();
            }}
          >
            Choose another
          </Button>
          <Button type="submit">Join</Button>
        </ButtonGroup>
      </FieldGroup>
    </form>
  );
};
