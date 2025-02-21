import { ComponentPropsWithoutRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import TaskCard from "@/components/Board/TaskCard";
import AddTask from "@/components/Board/AddTask";
import type { Column } from "@/store/types";
import ColumnOptions from "@/components/Board/ColumnOptions";

type ColumnProps = ComponentPropsWithoutRef<"div"> & {
  column: Column;
  boardId: UniqueIdentifier;
};

export type ColumnDragData = {
  type: "Column";
  column: Column;
};

const Column = ({ column, boardId, className, ...props }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: `column-${column.id}`,
  });
  const taskIds = useMemo(
    () => column.tasks.map((task) => `task-${task.id}`),
    [column.tasks],
  );
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
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {column.tasks.length > 0 &&
            column.tasks.map((task) => <TaskCard key={task.id} task={task} />)}
        </SortableContext>
        <AddTask boardId={boardId} columnId={column.id} />
      </div>
    </div>
  );
};

export default Column;
