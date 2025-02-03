import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { DndContext } from "@dnd-kit/core";

import Column from "@/components/Board/Column";
import AddColumn from "@/components/Board/AddColumn";
import { type Board } from "@/store/types";

type BoardProps = ComponentPropsWithoutRef<"div"> & {
  board: Board;
};

const Board = ({ board, className, ...props }: BoardProps) => {
  return (
    <DndContext>
      <div
        className={cn(
          "from-board-gradient-start via-board-gradient-middle to-board-gradient-end grid auto-cols-[18rem] grid-flow-col items-start gap-6 bg-gradient-to-br from-20% via-60% p-6",
          className,
        )}
        {...props}
      >
        {board.columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
        <AddColumn boardId={board.id} />
      </div>
    </DndContext>
  );
};

export default Board;
