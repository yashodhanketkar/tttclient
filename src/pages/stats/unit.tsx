import { useNavigate, useParams } from "react-router-dom";

import { ToTop } from "@/components/interface/common";
import { useStats } from "@/store/query/stats";

export const Stat = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: stat, isLoading, isError } = useStats(id).useStatsByIdQuery;

  if (isLoading) return <>Loading data</>;
  if (isError) return <>Error</>;

  if (!stat || !stat.username)
    return (
      <div>
        <div>
          <p>Failed to fetch the data</p>
          <div className="flex flex-row gap-2">
            <button onClick={() => window.location.reload()}>Refresh</button>
            <button onClick={() => navigate("/stats")}>Go back</button>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th colSpan={2}>
                <p>{stat.username}'s stats</p>
              </th>
              <th>
                <button onClick={() => navigate("/stats")}>Return</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>Wins</p>
              </td>
              <td>{stat.win} wins</td>
              <td>{(stat.winRate * 100).toFixed(2)}%</td>
            </tr>
            <tr>
              <td>Losses</td>
              <td>{stat.loss} losses</td>
              <td>{(stat.lossRate * 100).toFixed(2)}%</td>
            </tr>
            <tr>
              <td>Draws</td>
              <td>{stat.draw} Draws</td>
              <td>{(stat.draw * 100).toFixed(2)}%</td>
            </tr>
            <tr>
              <td colSpan={3}>
                <p>{stat.username}'s boards</p>
              </td>
            </tr>
            {stat.boards.map((board, i) => (
              <tr key={board._id}>
                <td>{i + 1}</td>
                <td>
                  {board.isGameOver
                    ? board.hasWinner
                      ? "Won by " + board.winner.username
                      : "Draw"
                    : "In progress"}
                </td>
                <td>
                  <button onClick={() => navigate("/board/" + board._id)}>
                    Go To
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToTop />
    </div>
  );
};
