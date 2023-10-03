import { BoardService } from "@/services/boards";
import { Box, Button, Dialog, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DialogButton, DialogStyle } from "./style";

type NewGameProps = {
  open: boolean;
  handleClick: () => void;
};

export const NewGame = ({ open, handleClick }: NewGameProps) => {
  const navigate = useNavigate();

  const handleNewClick = async () => {
    const id = (await BoardService.start())._id;
    handleClick();
    if (id) navigate("/board/" + id);
  };

  return (
    <Dialog open={open} onClose={handleClick}>
      <Box sx={DialogStyle}>
        <Typography>Start new game?</Typography>
        <Box display={"flex"} flexDirection={"row"} gap={1}>
          <Button
            sx={DialogButton}
            variant="contained"
            onClick={handleNewClick}
          >
            Start
          </Button>
          <Button sx={DialogButton} variant="contained" onClick={handleClick}>
            Close
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
