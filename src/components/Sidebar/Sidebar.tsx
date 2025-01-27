import { UniqueIdentifier } from "@dnd-kit/core";
import { ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { memoize } from "proxy-memoize";

import { Button } from "@/components/ui/button";
import useKanbanStore, { type KanbanState } from "@/store/store";

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
              <button
                onClick={() => setSelectedBoardId(board.id)}
                className={cn(
                  "w-full rounded-md bg-pink-600 p-2 text-left transition hover:bg-gray-700",
                  board.id === selectedBoardId && "bg-gray-700 text-white",
                )}
              >
                {board.name}
              </button>
            </li>
          ))}
        </ul>
        <Button className="mt-4 w-full">+ Add Board</Button>
      </aside>
    );
  },
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
