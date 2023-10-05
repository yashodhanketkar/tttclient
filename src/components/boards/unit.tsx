import { BoardService } from "@/services";
import ContentCopy from "@mui/icons-material/ContentCopy";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate, useParams } from "react-router-dom";
import {
  BoardUnitButton,
  BoardUnitContainer,
  BoardUnitGrid,
  KeyBoxUnit,
  ReturnButton,
} from "./style";
import { BoardType } from "./type";

type TAlert = {
  message: string;
  severity: AlertColor;
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
          {board.grid.length > 0 &&
            board.grid.map((pos, i) => (
              <Grid key={i} item xs={4}>
                <Button
                  disabled={board.isGameOver}
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
      {board.isGameOver ? (
        <Button
          startIcon={<KeyboardArrowLeft />}
          sx={ReturnButton}
          variant="contained"
          onClick={() => navigate("/board")}
        >
          Return
        </Button>
      ) : (
        <>
          {board.numberOfPlayers !== 2 && (
            <Box sx={KeyBoxUnit}>
              <Typography variant="body2">Share this key</Typography>
              <Typography variant="h6">{board.key}</Typography>
              <Button
                onClick={() => navigator.clipboard.writeText(board.key)}
                endIcon={<ContentCopy />}
                variant="contained"
              >
                Copy
              </Button>
            </Box>
          )}
        </>
      )}
      {snackAlert && (
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
        >
          <Alert severity={snackAlert.severity}>{snackAlert.message}</Alert>
        </Snackbar>
      )}
    </Container>
  );
};
