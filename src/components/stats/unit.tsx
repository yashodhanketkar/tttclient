import { StatService } from "@/services";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToTop } from "../interface/common";
import { StatsButtton } from "./style";
import { StatType } from "./type";

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
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginY={4}
          gap={2}
          width="100%"
        >
          <Typography variant="h5" color="error.main">
            Failed to fetch the data
          </Typography>
          <Box display="flex" flexDirection="row" gap={2}>
            <Button
              sx={StatsButtton}
              variant="contained"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
            <Button
              sx={StatsButtton}
              variant="contained"
              onClick={() => navigate("/stats")}
            >
              Go back
            </Button>
          </Box>
        </Box>
      </Container>
    );

  return (
    <Container>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="h4">{stat.username}'s stats</Typography>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  sx={{ ...StatsButtton, textTransform: "none" }}
                  onClick={() => navigate("/stats")}
                >
                  Return
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>Wins</Typography>
              </TableCell>
              <TableCell>{stat.win} wins</TableCell>
              <TableCell>{(stat.winRate * 100).toFixed(2)}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Losses</TableCell>
              <TableCell>{stat.loss} losses</TableCell>
              <TableCell>{(stat.lossRate * 100).toFixed(2)}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Draws</TableCell>
              <TableCell>{stat.draw} Draws</TableCell>
              <TableCell>{(stat.draw * 100).toFixed(2)}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant="h5">{stat.username}'s boards</Typography>
              </TableCell>
            </TableRow>
            {stat.boards.map((board, i) => (
              <TableRow key={board._id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  {board.isGameOver
                    ? board.hasWinner
                      ? "Won by " + board.winner.username
                      : "Draw"
                    : "In progress"}
                </TableCell>
                <TableCell>
                  <Button onClick={() => navigate("/board/" + board._id)}>
                    Go To
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <ToTop />
    </Container>
  );
};
