import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

import { BoardColumn, NewColumnButton } from "./BoardColumn";
import data from "@/data/fakedata.json"; // Adjust the path based on your file structure
import { DndContext } from "@dnd-kit/core";
import { type Board } from "@/store/types";

type BoardProps = ComponentPropsWithoutRef<"div"> & {
  board: Board;
};

const Board = ({ className, ...props }: BoardProps) => {
  return (
    <DndContext>
      <div
        className={cn(
          "grid auto-cols-[300px] grid-flow-col gap-6 p-6",
          className,
        )}
        {...props}
      >
        {data.columns.map((column) => (
          <BoardColumn
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={column.tasks}
          />
        ))}
        <NewColumnButton />
      </div>
    </DndContext>
  );
};

export default Board;
