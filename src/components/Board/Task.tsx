import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { type Task } from "@/store/types";

type TaskProps = ComponentPropsWithoutRef<"div"> & {
  task: Task;
};

const Task = ({ task, className, ...props }: TaskProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `task-${task.id}`,
    });

  console.log("isDragging", isDragging);
  console.log("transform", transform);

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "cursor-move rounded-md bg-gray-700 p-3 text-gray-200 hover:bg-gray-600",
        className,
      )}
      {...props}
    >
      {task.id}: {task.title}
    </div>
  );
};

export default Task;
