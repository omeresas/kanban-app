import { ComponentPropsWithoutRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import TaskCard from "@/components/Board/TaskCard";
import AddTask from "@/components/Board/AddTask";
import type { Column } from "@/store/types";
import ColumnOptions from "@/components/Board/ColumnOptions";
import { cva } from "class-variance-authority";

type ColumnProps = ComponentPropsWithoutRef<"div"> & {
  column: Column;
  isOverlay?: boolean;
};

const Column = ({ column, isOverlay, className, ...props }: ColumnProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `column-${column.id}`,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const taskIds = useMemo(
    () => column.tasks.map((task) => `task-${task.id}`),
    [column.tasks],
  );

  const variants = cva(
    "bg-column-background text-column-foreground flex flex-col gap-4 rounded-md p-4 shadow-md",
    {
      variants: {
        isDragging: {
          true: "opacity-50",
          false: "opacity-100",
        },
      },
      defaultVariants: {
        isDragging: false,
      },
    },
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(variants({ isDragging }))}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex-1 cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <h2 className="text-lg font-bold">{column.name}</h2>
        </div>
        <ColumnOptions columnId={column.id} />
      </div>

      <div className="flex flex-col gap-2">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {column.tasks.length > 0 &&
            column.tasks.map((task) => <TaskCard key={task.id} task={task} />)}
        </SortableContext>
        <AddTask columnId={column.id} />
      </div>
    </div>
  );
};

export default Column;
