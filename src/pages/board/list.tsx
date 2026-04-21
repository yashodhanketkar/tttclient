import { useAuth } from "@/hooks/auth";
import { BoardService } from "@/services";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToTop } from "@/components/interface/common";
import { type BoardType } from "@/components/types";

export const Boards = () => {
  const [boards, setBoards] = useState<BoardType[]>([]);
  const navigate = useNavigate();
  const {
    user: { id },
  } = useAuth();

  useEffect(() => {
    const apiData = async () => {
      setBoards(await BoardService.getAll());
    };
    apiData();
  }, []);

  return (
    <div className="grid">
      {boards.length > 0 &&
        boards.map((board) => (
          <div key={board._id}>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>{board.startedBy.username}</th>
                    <th>vs</th>
                    <th>{board.against?.username}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Status</td>
                    <td colSpan={2}>
                      {board.isGameOver
                        ? board.hasWinner
                          ? "Won by " + board.winner.username
                          : "Draw"
                        : "In progress"}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <button onClick={() => navigate("/board/" + board._id)}>
                        {(board.startedBy._id === id ||
                          board.against._id === id) &&
                        !board.isGameOver
                          ? "Join"
                          : "View"}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      <ToTop />
    </div>
  );
};
