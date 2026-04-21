import { BoardService } from "@/services";
import { useEffect, useMemo, useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate, useParams } from "react-router-dom";
import type { BoardType } from "@/components/types";

type TAlert = {
  message: string;
  severity: "success" | "info" | "warning" | "error";
};

const WebSocketURL: string | undefined = import.meta.env.VITE_BASE_URL_WS;
if (!WebSocketURL) throw new Error("Incorrect webscoket connection string");

export const Board = () => {
  const [board, setBoard] = useState<BoardType>();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [snackAlert, setSnackAlert] = useState<TAlert | null>(null);
  const { id } = useParams();
  const [socketData, setSocketData] = useState("");
  const websock = useMemo(() => new WebSocket(WebSocketURL), []);
  const navigate = useNavigate();

  websock.onmessage = (e) => {
    const scdata = JSON.parse(e.data);
    setSocketData(scdata);
    if (scdata?.message === "Player two joined") {
      setSnackAlert({
        message: "Player two joined",
        severity: "success",
      });
      setOpen(true);
    }
  };

  useEffect(() => {
    const apiData = async () => {
      const data: BoardType = await BoardService.getByID(id as string);
      if (data) {
        if (data.isGameOver) {
          setOpen(true);
          setSnackAlert({ message: "Game is over", severity: "info" });
        }
        setBoard(data);
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
      setSnackAlert({
        message: "Position already filled",
        severity: "warning",
      });
      setOpen(true);
      return;
    }

    const message = await BoardService.move(id as string, { index: ++index });
    if (message === "ok") {
      console.log("Played");
    } else {
      setSnackAlert({
        message: "Out of turn",
        severity: "error",
      });
      setOpen(true);
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
    <div className="container">
      <div>
        <div className="grid">
          {board.grid.length > 0 &&
            board.grid.map((pos, i) => (
              <div key={i}>
                <button
                  disabled={board.isGameOver}
                  onClick={() => handleSend(i, pos)}
                >
                  {pos}
                </button>
              </div>
            ))}
        </div>
      </div>
      {board.isGameOver ? (
        <button onClick={() => navigate("/board")}>Return</button>
      ) : (
        <>
          {board.numberOfPlayers !== 2 && (
            <div>
              <p>Share this key</p>
              <p>{board.key}</p>
              <button onClick={() => navigator.clipboard.writeText(board.key)}>
                Copy
              </button>
            </div>
          )}
        </>
      )}
      {/* {snackAlert && ( */}
      {/*   <div */}
      {/*     open={open} */}
      {/*     autoHideDuration={2000} */}
      {/*     onClose={() => setOpen(false)} */}
      {/*   > */}
      {/*     <alert severity={snackAlert.severity}>{snackAlert.message}</alert> */}
      {/*   </div> */}
      {/* )} */}
    </div>
  );
};
