import { BoardService } from "@/services";
import { useNavigate } from "react-router-dom";

type NewGameProps = {
  open: boolean;
  handleClick: () => void;
};

export const NewGame = ({ open, handleClick }: NewGameProps) => {
  const navigate = useNavigate();

  const handleNewClick = async () => {
    const game = await BoardService.start();
    handleClick();
    if (game) navigate("/board/" + game._id);
  };

  return (
    <dialog open={open} onClose={handleClick}>
      <div>
        <p>Start new game?</p>
        <div>
          <button onClick={handleNewClick}>Start</button>
          <button onClick={handleClick}>Close</button>
        </div>
      </div>
    </dialog>
  );
};
