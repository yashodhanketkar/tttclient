import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { BoardService } from "@/services";
import { useEffect, useState } from "react";
import {
  type FieldErrors,
  type SubmitHandler,
  type UseFormHandleSubmit,
  type UseFormRegister,
  useForm,
} from "react-hook-form";
import { type NavigateFunction, useNavigate } from "react-router-dom";
import { type BoardType } from "@/components/types";
import { GameButton } from "./common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldGroup, FieldLabel, Field } from "@/components/ui/field";
import { ButtonGroup } from "@/components/ui/button-group";

type InputType = {
  key: string;
};

export const JoinGame = ({ active }: { active: boolean }) => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [boards, setBoards] = useState<BoardType[]>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const apiData = async () => {
      const data: BoardType[] = await BoardService.getAll();
      if (data && data.length > 0) {
        const availableBoards = data.filter((board) => !board.isGameOver);
        setBoards(availableBoards);
      }
    };
    apiData();
  }, [open]);

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

  const handleClick = () => {
    setId("");
  };

  const onReset = () => {
    setId("");
    reset();
  };

  console.log({
    active: active,
    "boards?.length": boards?.length,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <GameButton
        text="Join Game"
        disabled={!active || !boards || boards.length < 1}
        onClick={() => setOpen(true)}
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
          <DialogClose>
            <Button variant="outline">Close</Button>
          </DialogClose>
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
