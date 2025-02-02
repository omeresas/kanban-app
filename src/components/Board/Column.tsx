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
  const { setNodeRef } = useDroppable({ id: `column-${column.id}` });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "bg-column-background text-column-foreground flex flex-col rounded-md p-4 shadow-md",
        className,
      )}
      {...props}
    >
      <h2 className="mb-4 text-lg font-bold">{column.name}</h2>
      <div className="flex flex-col gap-2">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

// TODO: Fix + with + icon
const NewColumnButton = () => {
  return <Button>+ New Column</Button>;
};

export { Column, NewColumnButton };
