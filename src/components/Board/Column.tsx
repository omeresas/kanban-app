import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";

import TaskCard from "./Task";
import { type Column } from "@/store/types";

type ColumnProps = ComponentPropsWithoutRef<"div"> & {
  column: Column;
};

const Column = ({ column, className, ...props }: ColumnProps) => {
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
    <Button className="bg-gray-700 p-4 text-gray-400 shadow-md transition hover:bg-gray-600">
      + New Column
    </Button>
  );
};

export { Column, NewColumnButton };
