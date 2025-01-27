import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { DndContext } from "@dnd-kit/core";

import { BoardColumn, NewColumnButton } from "./BoardColumn";
import { type Board } from "@/store/types";

type BoardProps = ComponentPropsWithoutRef<"div"> & {
  board: Board;
};

const Board = ({ board, className, ...props }: BoardProps) => {
  return (
    <DndContext>
      <div
        className={cn(
          "grid auto-cols-[300px] grid-flow-col gap-6 p-6",
          className,
        )}
        {...props}
      >
        {/* Render columns from the board */}
        {board.columns.map((column) => (
          <BoardColumn
            key={column.id}
            id={column.id}
            title={column.name}
            tasks={column.tasks}
          />
        ))}
        <NewColumnButton />
      </div>
    </DndContext>
  );
};

export default Board;
