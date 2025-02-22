import { useRef, useState } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useKanbanStore from "@/store/store";
import { useOnClickOutside } from "usehooks-ts";

type AddTaskProps = {
  columnId: UniqueIdentifier;
};

const AddTask = ({ columnId }: AddTaskProps) => {
  const dispatch = useKanbanStore((state) => state.dispatch);
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  const handleAddTask = () => {
    if (!taskName.trim()) return;
    dispatch({
      type: "addTask",
      payload: { columnId, title: taskName },
    });
    setTaskName("");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTaskName("");
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTask();
    } else if (event.key === "Escape") {
      event.preventDefault();
      handleCancel();
    }
  };

  useOnClickOutside(containerRef, () => {
    if (isEditing) {
      handleCancel();
    }
  });

  if (!isEditing) {
    return (
      <Button onClick={() => setIsEditing(true)} variant="add_task" size="auto">
        <Plus strokeWidth={3} className="pt-[1px]" /> Add Task
      </Button>
    );
  }

  return (
    <div
      ref={containerRef}
      className="bg-task-background text-task-foreground flex flex-col gap-2 rounded-md p-3 shadow-md"
    >
      <Input
        placeholder="Enter task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <div className="flex justify-start gap-2">
        <Button onClick={handleAddTask}>Add Task</Button>
        <Button onClick={handleCancel} variant="add_task_cancel">
          <X strokeWidth={3} />
        </Button>
      </div>
    </div>
  );
};

export default AddTask;
