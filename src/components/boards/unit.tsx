import { BoardService } from "@/services/boards";
import { Box, Button, Container, Grid, Paper } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ReactLoading from "react-loading";
import { useParams } from "react-router-dom";
import { BoardUnitButton, BoardUnitContainer, BoardUnitGrid } from "./style";
import { BoardType } from "./type";

export const Board = () => {
  const [grid, setGrid] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOver, setIsOver] = useState(false);
  const { id } = useParams();
  const [socketData, setSocketData] = useState("");
  const websock = useMemo(() => new WebSocket("ws://127.0.0.1:5555/"), []);

  websock.onmessage = (e) => {
    setSocketData(JSON.parse(e.data));
  };

  useEffect(() => {
    const apiData = async () => {
      const board: BoardType = await BoardService.getID(id as string);
      if (board) {
        setGrid(board.grid);
        setIsOver(board.isGameOver);
      }
    };
    apiData();
    setLoading(false);
  }, [id, socketData]);

  const handleSend = async (index: number, pos: string) => {
    if (isOver) {
      alert("Game is over");
      return;
    }

    if (pos !== "") {
      alert("Illegal move");
      return;
    }

    const message = await BoardService.move(id as string, { index: ++index });
    if (message === "ok") {
      console.log("Played");
    } else {
      alert("Illegal move");
    }
  };

  if (loading)
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactLoading
          type="spinningBubbles"
          color="#F00"
          height={"25%"}
          width={"25%"}
        />
      </Box>
    );

  return (
    <Container>
      <Paper elevation={3} sx={BoardUnitContainer}>
        <Grid container sx={BoardUnitGrid}>
          {grid.length > 0 &&
            grid.map((pos, i) => (
              <Grid key={i} item xs={4}>
                <Button
                  disabled={isOver}
                  sx={{
                    ...BoardUnitButton,
                    backgroundColor: pos === "" ? "transparent" : "#FFEEEE66",
                  }}
                  onClick={() => handleSend(i, pos)}
                >
                  {pos}
                </Button>
              </Grid>
            ))}
        </Grid>
      </Paper>
    </Container>
  );
};
