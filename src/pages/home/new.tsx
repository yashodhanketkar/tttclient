import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { BoardService } from "@/services";

import { GameButton } from "./common";

export const NewGame = ({ active }: { active: boolean }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNewClick = async () => {
    const game = await BoardService.start();
    if (game) navigate("/board/" + game._id);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <GameButton text="New Game" disabled={!active} onClick={() => setOpen(true)} />
      <DialogContent>
        <DialogHeader>Start new game?</DialogHeader>
        <DialogDescription>Please click on start to start a new game. or click on close to cancel?</DialogDescription>
        <DialogFooter>
          <ButtonGroup>
            <DialogClose>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button onClick={handleNewClick}>Start</Button>
          </ButtonGroup>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
