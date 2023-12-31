import { StatService } from "@/services";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToTop } from "../interface/common";
import { StatsButtton, StatsContainer, StatsGrid } from "./style";
import { StatType } from "./type";

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
    <Grid container sx={StatsContainer}>
      {stats.length > 0 &&
        stats.map((stat) => (
          <Grid item key={stat.username} xs={12} md={5} sx={StatsGrid}>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography variant="h5">{stat.username}</Typography>
                    </TableCell>
                    <TableCell>
                      {stat.win}/{stat.loss}/{stat.draw}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Wins</TableCell>
                    <TableCell>{stat.win} wins</TableCell>
                    <TableCell>{stat.winRate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Loss</TableCell>
                    <TableCell>{stat.loss} losses</TableCell>
                    <TableCell>{stat.lossRate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Draws</TableCell>
                    <TableCell>{stat.draw} draws</TableCell>
                    <TableCell>{stat.drawRate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Button
                        onClick={() => navigate(stat._id)}
                        variant="contained"
                        sx={StatsButtton}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        ))}
      <ToTop />
    </Grid>
  );
};
