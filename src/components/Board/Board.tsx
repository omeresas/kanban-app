import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { DndContext } from "@dnd-kit/core";

import Column from "@/components/Board/Column";
import AddColumn from "@/components/Board/AddColumn";
import useKanbanStore from "@/store/store";

type BoardProps = ComponentPropsWithoutRef<"div">;

const Board = ({ className, ...props }: BoardProps) => {
  const selectedBoard = useKanbanStore((state) =>
    state.boards.find((board) => board.id === state.selectedBoardId),
  );
  return (
    <DndContext>
      <div
        className={cn(
          "from-board-gradient-start via-board-gradient-middle to-board-gradient-end grid auto-cols-[18rem] grid-flow-col items-start gap-6 bg-gradient-to-br from-20% via-60% p-6",
          className,
        )}
        {...props}
      >
        {selectedBoard && (
          <>
            {selectedBoard.columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                boardId={selectedBoard.id}
              />
            ))}
            <AddColumn />
          </>
        )}
      </div>
    </DndContext>
  );
};

export default Board;
