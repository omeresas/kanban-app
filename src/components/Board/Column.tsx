import { ComponentPropsWithoutRef, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Textarea } from "@/components/ui/textarea";

import TaskCard from "@/components/Board/TaskCard";
import AddTask from "@/components/Board/AddTask";
import type { Column } from "@/store/types";
import ColumnOptions from "@/components/Board/ColumnOptions";
import { cva } from "class-variance-authority";
import useKanbanStore from "@/store/store";

type ColumnProps = ComponentPropsWithoutRef<"div"> & {
  column: Column;
};

const Column = ({ column, className, ...props }: ColumnProps) => {
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

  const { dispatch } = useKanbanStore();
  const onTitleSave = (name: string) => {
    const trimmedName = name.trim();
    if (trimmedName && trimmedName !== column.name) {
      dispatch({
        type: "renameColumn",
        payload: { columnId: column.id, name: trimmedName },
      });
    }
  };

  const variants = cva(
    "bg-column-background text-column-foreground flex flex-col gap-2 rounded-md p-4 shadow-md",
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
      className={cn(variants({ isDragging }), className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex-1 cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <ColumnName
            name={column.name}
            onSave={onTitleSave}
            key={column.name}
          />
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

const ColumnName = ({
  name,
  onSave,
}: {
  name: string;
  onSave: (name: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(name);

  const handleSubmit = () => {
    onSave(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      setValue(name);
      setIsEditing(false);
    }
  };

  return isEditing ? (
    <Textarea
      value={value}
      variant="edit_column_title"
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleSubmit}
      onKeyDown={handleKeyDown}
      onFocus={(e) => e.target.select()}
      autoFocus
    />
  ) : (
    <h2
      className="p-1 text-lg font-bold break-words break-all"
      onClick={() => setIsEditing(true)}
    >
      {value}
    </h2>
  );
};

export default Column;
