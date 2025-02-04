import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
// import { useDraggable } from "@dnd-kit/core";
// import { CSS } from "@dnd-kit/utilities";

import { type Task } from "@/store/types";
import TaskDialog from "@/components/Board/TaskDialog";

type TaskProps = ComponentPropsWithoutRef<"div"> & {
  task: Task;
};

const TaskItem = ({ task, className, ...props }: TaskProps) => {
  // const { attributes, listeners, setNodeRef, transform } = useDraggable({
  //   id: `task-${task.id}`,
  // });

  // const style = {
  //   transform: transform ? CSS.Translate.toString(transform) : undefined,
  // };

  return (
    <div
      // ref={setNodeRef}
      // style={style}
      // {...listeners}
      // {...attributes}
      className={cn(
        "bg-task-background text-task-foreground rounded-md p-3 shadow-md",
        className,
      )}
      {...props}
    >
      {task.id}: {task.title}
    </div>
  );
};

const TaskCard = (props: TaskProps) => {
  return (
    <TaskDialog task={props.task}>
      <TaskItem {...props} />
    </TaskDialog>
  );
};

export default TaskCard;
