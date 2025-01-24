import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type TaskProps = ComponentPropsWithoutRef<"div"> & {
  id: string; // Unique string ID for the task
  text: string; // Task content
};

const Task = ({ id, text, className, ...props }: TaskProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `task-${id}`,
    });

  console.log("isDragging", isDragging);
  console.log("transform", transform);

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    zIndex: isDragging ? 1000 : "auto", // Apply high z-index while dragging
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "z-40 cursor-move rounded-md bg-gray-700 p-3 text-gray-200 hover:bg-gray-600",
        className,
      )}
      {...props}
    >
      {text}
    </div>
  );
};

export default Task;
