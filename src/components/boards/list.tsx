import { useAuth } from "@/hooks/auth";
import { BoardService } from "@/services/boards";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoardButtton, BoardContainer, BoardGames } from "./style";
import { BoardType } from "./type";

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
    <Grid container sx={BoardContainer}>
      {boards.length > 0 &&
        boards.map((board) => (
          <Grid item key={board._id} xs={5} sx={BoardGames}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{board.startedBy.username}</TableCell>
                  <TableCell>vs</TableCell>
                  <TableCell>{board.against?.username}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell colSpan={2}>
                    {board.isGameOver
                      ? board.hasWinner
                        ? "Won by " + board.winner.username
                        : "Draw"
                      : "In progress"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Button
                      variant="contained"
                      sx={{ ...BoardButtton, textTransform: "none" }}
                      onClick={() => navigate("/board/" + board._id)}
                    >
                      {(board.startedBy._id === id ||
                        board.against._id === id) &&
                      !board.isGameOver
                        ? "Join"
                        : "View"}
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        ))}
    </Grid>
  );
};
