import { StatService } from "@/services";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToTop } from "@/components/interface/common";
import { type StatType } from "@/components/types";

export const Stats = () => {
  const [stats, setStats] = useState<StatType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const apiData = async () => {
      const data = await StatService.getAll();
      if (data) {
        setStats(data);
      }
    };
    apiData();
  }, []);

  return (
    <div className="container">
      {stats.length > 0 &&
        stats.map((stat) => (
          <div key={stat.username}>
            <div>
              <table>
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <p>{stat.username}</p>
                    </th>
                    <th>
                      {stat.win}/{stat.loss}/{stat.draw}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Wins</th>
                    <th>{stat.win} wins</th>
                    <th>{stat.winRate}</th>
                  </tr>
                  <tr>
                    <th>Loss</th>
                    <th>{stat.loss} losses</th>
                    <th>{stat.lossRate}</th>
                  </tr>
                  <tr>
                    <th>Draws</th>
                    <th>{stat.draw} draws</th>
                    <th>{stat.drawRate}</th>
                  </tr>
                  <tr>
                    <th colSpan={3}>
                      <button onClick={() => navigate(stat._id)}>
                        View Details
                      </button>
                    </th>
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
