import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import useKanbanStore from "@/store/store";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogPortal,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const AddBoard = () => {
  const dispatch = useKanbanStore((state) => state.dispatch);
  const [newBoardName, setNewBoardName] = useState("");
  const [open, setOpen] = useState(false);

  function handleAddBoard() {
    if (newBoardName.trim() !== "") {
      dispatch({ type: "addBoard", payload: { name: newBoardName } });
    }
    setNewBoardName("");
    setOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddBoard();
    }
  }

  function handleOnOpenChange(open: boolean) {
    if (!open) {
      setNewBoardName("");
    }
    setOpen(open);
  }

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <Button variant="add_board" size="auto">
          <Plus strokeWidth={3} className="pt-[1px]" /> Add Board
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Board</DialogTitle>
            <DialogDescription>
              Enter a name for the new board.
            </DialogDescription>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Board Name"
            value={newBoardName}
            onKeyDown={handleKeyDown}
            onChange={(e) => setNewBoardName(e.target.value)}
            className="w-full rounded-md border p-2"
            autoFocus
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleAddBoard}>Create Board</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default AddBoard;
