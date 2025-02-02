import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { DndContext } from "@dnd-kit/core";

import { Column, NewColumnButton } from "./Column";
import { type Board } from "@/store/types";

type BoardProps = ComponentPropsWithoutRef<"div"> & {
  board: Board;
};

const Board = ({ board, className, ...props }: BoardProps) => {
  return (
    <DndContext>
      <div
        className={cn(
          "from-gradient-start via-gradient-middle to-gradient-end grid auto-cols-[300px] grid-flow-col items-start gap-6 bg-gradient-to-br p-6",
          className,
        )}
        {...props}
      >
        {board.columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
        <NewColumnButton />
      </div>
    </DndContext>
  );
};

export default Board;
