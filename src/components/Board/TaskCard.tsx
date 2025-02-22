import { useState, ComponentPropsWithoutRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogPortal,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

import type { Task } from "@/store/types";
import useKanbanStore from "@/store/store";

type TaskProps = ComponentPropsWithoutRef<"div"> & {
  task: Task;
};

const TaskCard = ({ task }: TaskProps) => {
  return (
    <Dialog>
      <TaskTrigger task={task} />
      <DialogPortal>
        <DialogContent>
          <TaskForm task={task} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
TaskCard.displayName = "TaskCard";

const TaskTrigger = ({ task }: { task: Task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `task-${task.id}`,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <DialogTrigger asChild>
      <Button
        variant="task_card"
        size="auto"
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
        {task.id}: {task.title}
      </Button>
    </DialogTrigger>
  );
};
TaskTrigger.displayName = "TaskTrigger";

const TaskForm = ({ task }: { task: Task }) => {
  const { dispatch } = useKanbanStore();
  const [taskDraft, setTaskDraft] = useState<Task>(task);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editingSubtaskIndex, setEditingSubtaskIndex] = useState<number | null>(
    null,
  );

  const handleAddSubtask = () => {
    const newIndex = taskDraft.subtasks.length;
    setTaskDraft((prevTask) => ({
      ...prevTask,
      subtasks: [...prevTask.subtasks, { title: "", isCompleted: false }],
    }));
    setEditingSubtaskIndex(newIndex);
  };

  const handleSubtaskChange = (index: number, value: string) => {
    setTaskDraft((prevTask) => ({
      ...prevTask,
      subtasks: prevTask.subtasks.map((subtask, i) =>
        i === index ? { ...subtask, title: value } : subtask,
      ),
    }));
  };

  const handleDeleteSubtask = (index: number) => {
    setTaskDraft((prevTask) => ({
      ...prevTask,
      subtasks: prevTask.subtasks.filter((_, i) => i !== index),
    }));

    if (editingSubtaskIndex === index) {
      setEditingSubtaskIndex(null);
    }
  };

  const handleToggleSubtask = (index: number) => {
    setTaskDraft((prevTask) => ({
      ...prevTask,
      subtasks: prevTask.subtasks.map((subtask, i) =>
        i === index
          ? { ...subtask, isCompleted: !subtask.isCompleted }
          : subtask,
      ),
    }));
  };

  const onSave = () => {
    dispatch({
      type: "updateTask",
      payload: {
        taskId: task.id,
        updatedTask: taskDraft,
      },
    });
  };

  return (
    <div className="flex flex-col items-stretch justify-start gap-4 py-3">
      <DialogTitle asChild>
        {isEditingTitle ? (
          <Input
            value={taskDraft.title}
            onChange={(e) =>
              setTaskDraft((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            onBlur={() => {
              if (!taskDraft.title.trim()) {
                setTaskDraft((prev) => ({
                  ...prev,
                  title: task.title,
                }));
              }
              setIsEditingTitle(false);
            }}
            autoFocus
            onFocus={(e) => e.target.select()}
            variant="edit_task_title"
          />
        ) : (
          <div
            onClick={() => setIsEditingTitle(true)}
            className="text-task-foreground hover:bg-accent/80 cursor-text rounded-xs px-3 py-2 text-xl font-semibold"
          >
            {taskDraft.title}
          </div>
        )}
      </DialogTitle>

      <DialogDescription asChild className="text-task-foreground">
        {isEditingDescription ? (
          <Textarea
            value={taskDraft.description}
            onChange={(e) =>
              setTaskDraft((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            onBlur={() => setIsEditingDescription(false)}
            autoFocus
            onFocus={(e) => {
              e.target.setSelectionRange(
                e.target.value.length,
                e.target.value.length,
              );
            }}
            placeholder="Add description..."
            rows={2}
            variant="edit_task_description"
          />
        ) : (
          <div
            onClick={() => setIsEditingDescription(true)}
            className="text-task-foreground hover:bg-accent/80 cursor-text rounded-xs px-3 py-2 text-base font-normal"
          >
            {taskDraft.description || "Add description..."}
          </div>
        )}
      </DialogDescription>

      <div className="px-3">
        <label className="mb-1 inline-block text-sm font-medium">
          Subtasks
        </label>
        {taskDraft.subtasks.map((subtask, index) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <div className="flex grow items-center gap-2">
              <input
                type="checkbox"
                checked={subtask.isCompleted}
                onChange={() => handleToggleSubtask(index)}
                className="h-4 w-4 shrink-0"
              />
              {editingSubtaskIndex === index ? (
                <Input
                  value={subtask.title}
                  onChange={(e) => handleSubtaskChange(index, e.target.value)}
                  onBlur={() => setEditingSubtaskIndex(null)}
                  autoFocus
                  placeholder="New subtask"
                  className="bg-accent/80 h-auto w-full border-none shadow-none"
                />
              ) : (
                <div
                  onClick={() => setEditingSubtaskIndex(index)}
                  className="text-task-foreground hover:bg-accent/80 cursor-text rounded-sm px-3 py-1 text-sm"
                >
                  {subtask.title || "New subtask"}
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteSubtask(index)}
              className="shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddSubtask}
          className="mt-2"
        >
          <Plus className="mr-1 h-4 w-4" /> Add Subtask
        </Button>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button onClick={onSave}>Save changes</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
};
TaskForm.displayName = "TaskForm";

export default TaskCard;
