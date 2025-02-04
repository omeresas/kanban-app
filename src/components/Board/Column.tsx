import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";

import TaskWithDialog from "@/components/Board/TaskWithDialog";
import AddTask from "@/components/Board/AddTask";
import type { Column } from "@/store/types";
import ColumnOptions from "@/components/Board/ColumnOptions";

type ColumnProps = ComponentPropsWithoutRef<"div"> & {
  column: Column;
  boardId: UniqueIdentifier;
};

const Column = ({ column, boardId, className, ...props }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id: `column-${column.id}` });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "bg-column-background text-column-foreground flex flex-col gap-4 rounded-md p-4 shadow-md",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{column.name}</h2>
        <ColumnOptions boardId={boardId} columnId={column.id} />
      </div>
      <div className="flex flex-col gap-2">
        {column.tasks.length > 0 && (
          <>
            {column.tasks.map((task) => (
              <TaskWithDialog key={task.id} task={task} />
            ))}
          </>
        )}
        <AddTask boardId={boardId} columnId={column.id} />
      </div>
    </div>
  );
};

export default Column;
