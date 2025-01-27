import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";

import TaskCard from "./Task";
import { type Column } from "@/store/types";

type BoardColumnProps = ComponentPropsWithoutRef<"div"> & {
  column: Column;
};

const BoardColumn = ({ column, className, ...props }: BoardColumnProps) => {
  const { isOver, setNodeRef } = useDroppable({ id: `column-${column.id}` });
  console.log("isOver", isOver);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col bg-gray-800 p-4 shadow-md transition",
        isOver && "bg-gray-700",
        className,
      )}
      {...props}
    >
      <h2 className="mb-4 text-lg font-bold text-gray-200">{column.name}</h2>
      <div className="flex flex-col gap-2">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

const NewColumnButton = () => {
  return (
    <button className="flex items-center justify-center rounded-lg bg-gray-700 p-4 text-gray-400 shadow-md transition hover:bg-gray-600">
      + New Column
    </button>
  );
};

export { BoardColumn, NewColumnButton };
