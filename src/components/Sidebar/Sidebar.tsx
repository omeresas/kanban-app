import * as React from "react";
import { UniqueIdentifier } from "@dnd-kit/core";
import { ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { memoize } from "proxy-memoize";
import { Table2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import useKanbanStore, { type KanbanState } from "@/store/store";
import AddBoard from "@/components/Sidebar/AddBoard";

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
          <AddBoard />
        </ul>
      </aside>
    );
  },
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
