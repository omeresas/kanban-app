import * as React from "react";
import { UniqueIdentifier } from "@dnd-kit/core";
import { ComponentPropsWithRef, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { memoize } from "proxy-memoize";

import { Button } from "@/components/ui/button";
import useKanbanStore, { type KanbanState } from "@/store/store";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Table2 } from "lucide-react";

const useBoardNamesIds = memoize<
  KanbanState,
  { id: UniqueIdentifier; name: string }[]
>((state) =>
  state.boards.map((board) => ({
    id: board.id,
    name: board.name,
  })),
);

type SidebarProps = ComponentPropsWithRef<"aside"> & {
  selectedBoardId: UniqueIdentifier | null;
  setSelectedBoardId: (id: UniqueIdentifier) => void;
};

const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ selectedBoardId, setSelectedBoardId, className, ...props }, ref) => {
    const boardNamesIds = useKanbanStore(useBoardNamesIds);
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
      <aside
        ref={ref}
        className={cn(
          "bg-header-sidebar-background text-header-sidebar-foreground flex flex-col items-start gap-4 pr-2",
          className,
        )}
        {...props}
      >
        <h1 className="p-4 text-lg font-semibold">Boards</h1>
        <ul className="w-full">
          {boardNamesIds.map((board) => (
            <li key={board.id}>
              <Button
                onClick={() => setSelectedBoardId(board.id)}
                variant={
                  board.id === selectedBoardId
                    ? "sidebar_selected"
                    : "sidebar_unselected"
                }
                size="auto"
              >
                <Table2 strokeWidth={2.2} className="pt-[1px]" />
                {board.name}
              </Button>
            </li>
          ))}
        </ul>

        {/* Dialog for Adding a Board */}
        <Dialog open={open} onOpenChange={handleOnOpenChange}>
          <DialogTrigger asChild>
            <Button className="mt-4 w-full">+ Add Board</Button>
          </DialogTrigger>
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
        </Dialog>
      </aside>
    );
  },
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
