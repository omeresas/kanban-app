import { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import BoardOptions from "@/components/Header/BoardOptions";
import useKanbanStore from "@/store/store";

type HeaderProps = ComponentPropsWithRef<"div">;

const Header = ({ className, ...props }: HeaderProps) => {
  const selectedBoard = useKanbanStore((state) =>
    state.boards.find((board) => board.id === state.selectedBoardId),
  );

  return (
    <div
      className={cn(
        "bg-header-sidebar-background text-header-sidebar-foreground flex items-center justify-start",
        className,
      )}
      {...props}
    >
      <div className="flex w-[calc(100vw-255px)] items-center justify-between">
        <h1 className="ml-10 text-2xl font-bold">
          {selectedBoard?.name ?? "No Board Available"}
        </h1>
        <div className="mr-10 flex gap-2">
          {selectedBoard && <BoardOptions boardId={selectedBoard.id} />}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
