import { BoardService } from "@/services";
import { Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DialogButton, DialogStyle } from "./style";

type NewGameProps = {
  open: boolean;
  handleClick: () => void;
};

export const NewGame = ({ open, handleClick }: NewGameProps) => {
  const navigate = useNavigate();

  const handleNewClick = async () => {
    const game = await BoardService.start();
    handleClick();
    if (game) navigate("/board/" + game._id);
  };

  return (
    <Dialog open={open} onClose={handleClick}>
      <Box sx={DialogStyle}>
        <DialogTitle>Start new game?</DialogTitle>
        <DialogActions>
          <Button
            sx={DialogButton}
            color="success"
            variant="contained"
            onClick={handleNewClick}
          >
            Start
          </Button>
          <Button
            sx={DialogButton}
            color="error"
            variant="contained"
            onClick={handleClick}
          >
            Close
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
