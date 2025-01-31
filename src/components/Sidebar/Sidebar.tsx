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
    const [boardName, setBoardName] = useState("");

    const handleAddBoard = () => {
      if (boardName.trim() !== "") {
        dispatch({ type: "addBoard", payload: { name: boardName } });
      }
      setBoardName("");
    };

    return (
      <aside
        ref={ref}
        className={cn(
          "flex flex-col items-start gap-4 bg-gray-800 p-4 text-gray-200",
          className,
        )}
        {...props}
      >
        <h1 className="text-xl font-bold">Boards</h1>
        <ul className="w-full">
          {boardNamesIds.map((board) => (
            <li key={board.id} className="w-full">
              <Button
                onClick={() => setSelectedBoardId(board.id)}
                className={cn(
                  "w-full rounded-md bg-pink-600 p-2 text-left transition hover:bg-gray-700",
                  board.id === selectedBoardId && "bg-gray-700 text-white",
                )}
              >
                {board.name}
              </Button>
            </li>
          ))}
        </ul>

        {/* Dialog for Adding a Board */}
        <Dialog onOpenChange={(open) => !open && setBoardName("")}>
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
            <input
              type="text"
              placeholder="Board Name"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
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
