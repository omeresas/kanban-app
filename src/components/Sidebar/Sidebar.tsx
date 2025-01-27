import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SidebarProps = React.ComponentPropsWithRef<"aside"> & {
  boardNamesIds: { id: number; name: string }[]; // Array of board names and IDs
  selectedBoardId: number;
  setSelectedBoardId: (id: number) => void; // Setter function for selected board ID
};

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ boardNamesIds, selectedBoardId, setSelectedBoardId, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className="flex flex-col items-start gap-4 bg-gray-800 p-4 text-gray-200"
        {...props}
      >
        <h1 className="text-xl font-bold">Boards</h1>
        <ul className="w-full">
          {boardNamesIds.map((board) => (
            <li key={board.id} className="w-full">
              <button
                onClick={() => setSelectedBoardId(board.id)} // Pass ID to update state
                className={cn(
                  "w-full rounded-md p-2 text-left transition hover:bg-gray-700",
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
