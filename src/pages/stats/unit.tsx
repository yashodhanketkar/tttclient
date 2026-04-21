import { StatService } from "@/services";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToTop } from "@/components/interface/common";
import type { StatType } from "@/components/types";

export const Stat = () => {
  const { id } = useParams();
  const [stat, setStat] = useState<StatType>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const apiData = async () => {
      const data: StatType = await StatService.getByID(id as string);
      if (data) {
        setStat(data);
      }
      setLoading(false);
    };
    apiData();
  }, [id]);

  if (loading) return <>Loading data</>;

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
                <StatsButtton onClick={() => navigate("/stats")}>
                  Return
                </StatsButtton>
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
