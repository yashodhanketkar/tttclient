import { BoardService } from "@/services";
import { useEffect, useMemo, useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate, useParams } from "react-router-dom";
import type { BoardType } from "@/components/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy } from "lucide-react";

const WebSocketURL: string | undefined = import.meta.env.VITE_BASE_URL_WS;
if (!WebSocketURL) throw new Error("Incorrect webscoket connection string");

export const Board = () => {
  const [board, setBoard] = useState<BoardType>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [socketData, setSocketData] = useState("");
  const websock = useMemo(() => new WebSocket(WebSocketURL), []);
  const navigate = useNavigate();

  websock.onmessage = (e) => {
    const scdata = JSON.parse(e.data);
    setSocketData(scdata);
    if (scdata?.message === "Player two joined") {
      toast.success("Player two joined");
    }
  };

  useEffect(() => {
    const apiData = async () => {
      const data = await BoardService.getByID(id as string);
      if (data) {
        if (data.isGameOver) {
          toast.success("Game is over");
        }
        setBoard(data.board);
      }
    };
    apiData();
    setLoading(false);
  }, [id, socketData]);

  if (!board) return <></>;

  const handleSend = async (index: number, pos: string) => {
    if (board.isGameOver) {
      alert("Game is over");
      return;
    }

    if (pos !== "") {
      toast.warning("Position already filled");
    }

    const message = await BoardService.move(id as string, { index: ++index });
    if (message === "ok") {
      console.log("Played");
    } else {
      toast.error("Out of turn");
    }
  };

  if (loading)
    return (
      <p>
        <ReactLoading
          type="spinningBubbles"
          color="#F00"
          height={"25%"}
          width={"25%"}
        />
      </p>
    );

  return (
    <div className="container relative h-[85vh]">
      <div className="@container grid bg-border gap-1 grid-cols-3 lg:w-1/3 mx-auto shadow inline-size w-full">
        {board.grid.length > 0 &&
          board.grid.map((pos, i) => (
            <button
              className={`bg-card aspect-square font-semibold text-[20cqw] hover:bg-card-foreground/5 ${pos === "X" ? "text-red-500" : "text-green-500"}`}
              key={i}
              disabled={board.isGameOver}
              onClick={() => handleSend(i, pos)}
            >
              {pos}
            </button>
          ))}
      </div>
      {board.isGameOver ? (
        <Button
          size="lg"
          className="p-4 font-semibold m-4 absolute bottom-0 left-0"
          onClick={() => navigate("/board")}
        >
          <ArrowLeft />
          Return
        </Button>
      ) : (
        board.numberOfPlayers !== 2 && (
          <div className="m-4 absolute bottom-0 left-0 flex flex-col gap-1">
            <p>Share this key</p>
            <p>{board.key}</p>
            <Button
              className="p-4 font-semibold"
              onClick={() => navigator.clipboard.writeText(board.key)}
            >
              <Copy />
              Copy
            </Button>
          </div>
        )
      )}
    </div>
  );
};
