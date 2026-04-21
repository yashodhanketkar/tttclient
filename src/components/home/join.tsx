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

type InputType = {
  key: string;
};

type NewGameProps = {
  open: boolean;
  handleClick: () => void;
};

export const JoinGame = ({ open, handleClick }: NewGameProps) => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [boards, setBoards] = useState<BoardType[]>();

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

  const onReset = () => {
    setId("");
    reset();
  };

  if (!boards) return <></>;
  console.log({ boards });

  if (boards.length > 0)
    return (
      <dialog open={open} onClose={handleClick}>
        <div>
          <p>Games</p>
          {!id || id === "" ? (
            boards
              .filter((board) => !board.isGameOver)
              .map((board, i) => {
                return (
                  <button key={board._id} onClick={() => setId(board._id)}>
                    Game {i + 1} - By {board.startedBy.username}
                  </button>
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
        </div>
      </dialog>
    );
  else
    return (
      <dialog open={open} onClose={handleClick}>
        <p>No Games Found</p>
        <div>
          No available games found. Please start new game or try again in some
          time.
        </div>
        <div>
          <button onClick={handleClick}>Close</button>
        </div>
      </dialog>
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
  navigate,
  onReset,
}: SecondScreenProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Join game?</p>
      <textarea {...register("key", { required: true })} />
      {errors.key && <p>{errors.key.message}</p>}
      <button
        onClick={() => {
          handleClick();
          navigate("/");
        }}
        type="submit"
      >
        Join
      </button>
      <button
        onClick={() => {
          handleClick();
          onReset();
        }}
      >
        Close
      </button>
    </form>
  );
};
