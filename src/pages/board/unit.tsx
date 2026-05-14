import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Copy } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBoard } from "@/store/query/board";

const WebSocketURL: string | undefined = import.meta.env.VITE_BASE_URL_WS;
if (!WebSocketURL) throw new Error("Incorrect webscoket connection string");

export const Board = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { useBoardMoveMutation, useBoardByIdQuery } = useBoard();
  const websock = useMemo(() => new WebSocket(WebSocketURL), []);
  const qc = useQueryClient();

  useEffect(() => {
    websock.onmessage = (e) => {
      const scdata = JSON.parse(e.data);
      const message = scdata?.message as string;
      if (message.includes("Player two joined")) {
        qc.invalidateQueries({
          queryKey: ["board"],
        });
        toast.success("Another played joined in");
      }

      if (message.includes("Move made")) {
        qc.invalidateQueries({
          queryKey: ["board"],
        });
      }

      if (message.includes("Game over")) {
        ["board", "allBoards", "allStats"].forEach((key) => {
          qc.invalidateQueries({ queryKey: [key] });
        });
        toast.success("Game over");
      }
    };

    return () => {
      websock.onmessage = null;
    };
  }, [websock]);

  const { data: board, isLoading, isError } = useBoardByIdQuery(id as string);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!board) return <div>Error...</div>;

  const handleSend = async (index: number, pos: string) => {
    if (board.isGameOver) {
      alert("Game is over");
      return;
    }

    if (pos !== "") {
      toast.warning("Position already filled");
      return;
    }

    useBoardMoveMutation.mutate(
      {
        id: id as string,
        body: { index: index + 1 },
      },
      {
        onError: () => {
          toast.error("Out of turn");
        },
      },
    );
  };

  return (
    <div className="container relative h-[85vh]">
      <div className="@container grid bg-border dark:bg-card gap-1 grid-cols-3 lg:w-1/3 mx-auto shadow inline-size w-full">
        {board.grid.length > 0 &&
          board.grid.map((pos, i) => (
            <button
              className={
                " bg-card aspect-square font-semibold text-[20cqw] hover:bg-card-foreground/5 " +
                " dark:bg-secondary hover:dark:bg-card-foreground/25 " +
                (pos === "X" ? " text-red-500 " : " text-green-500 ")
              }
              key={i}
              id={`board-cell-${i + 1}`}
              title={
                board.currentMark === "O"
                  ? "Player 1's turn - O"
                  : "Player 2's turn - X"
              }
              disabled={board.isGameOver}
              onClick={() => handleSend(i, pos)}
            >
              {pos}
            </button>
          ))}
      </div>
      {board.isGameOver && (
        <Button
          size="lg"
          className="p-4 font-semibold m-4 absolute bottom-0 left-0"
          onClick={() => navigate("/board")}
        >
          <ArrowLeft />
          Return
        </Button>
      )}
      <Dialog open={board.numberOfPlayers !== 2}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invitation Code</DialogTitle>
            <DialogDescription>
              Please use this code to invite your opponent
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="p-4 font-semibold"
              title={`Copy ${board.key}`}
              onClick={() => navigator.clipboard.writeText(board.key)}
            >
              {board.key}
              <Copy />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
