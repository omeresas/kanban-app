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
import { Plus, Table2 } from "lucide-react";

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
          "bg-header-sidebar-background text-header-sidebar-foreground flex flex-col items-start pr-2",
          className,
        )}
        {...props}
      >
        <h1 className="p-4 pl-6 text-base font-medium tracking-wider text-gray-400">
          All Boards
        </h1>
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
          <Dialog open={open} onOpenChange={handleOnOpenChange}>
            <DialogTrigger asChild>
              <Button className="bg-add-board-button-background text-add-board-button-foreground hover:bg-accent my-2 w-full justify-start rounded-l-none rounded-r-full p-2 pl-6 text-left text-base font-medium shadow-sm [&_svg]:size-4.5">
                <Plus strokeWidth={2.2} className="pt-[1px]" /> Add Board
              </Button>
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
        </ul>

        {/* Dialog for Adding a Board */}
      </aside>
    );
  },
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
