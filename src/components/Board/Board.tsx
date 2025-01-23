import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

import { BoardColumn, NewColumnButton } from "./BoardColumn";

type BoardProps = ComponentPropsWithoutRef<"div">;

const Board = ({ className, ...props }: BoardProps) => {
  return (
    <div
      className={cn(
        "grid auto-cols-[300px] grid-flow-col gap-6 overflow-x-auto p-6",
        className,
      )}
      {...props}
    >
      {/* Example columns */}
      <BoardColumn title="To Do" tasks={["Task 1", "Task 2", "Task 3"]} />
      <BoardColumn title="Doing" tasks={["Task 4", "Task 5"]} />
      <BoardColumn title="Done" tasks={["Task 6", "Task 7", "Task 8"]} />
      <NewColumnButton />
    </div>
  );
};

export default Board;
