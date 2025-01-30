import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { DndContext } from "@dnd-kit/core";

import { Column, NewColumnButton } from "./Column";
import { type Board } from "@/store/types";
import useKanbanStore from "@/store/store";
import { useEffect } from "react";

type BoardProps = ComponentPropsWithoutRef<"div"> & {
  board: Board;
};

const Board = ({ board, className, ...props }: BoardProps) => {
  // const dispatch = useKanbanStore((state) => state.dispatch);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     console.log("Adding a new column...");

  //     dispatch({
  //       type: "addColumn",
  //       payload: {
  //         boardId: board.id,
  //         column: { id: Date.now(), name: "New Column", tasks: [] },
  //       },
  //     });
  //   }, 3000); // 3-second delay before adding the column

  //   return () => clearTimeout(timeout);
  // }, [dispatch, board.id]);

  return (
    <DndContext>
      <div
        className={cn(
          "grid auto-cols-[300px] grid-flow-col items-start gap-6 p-6",
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
