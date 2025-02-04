// TaskDialog.tsx
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogDescription,
  DialogPortal,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import type { Task, Subtask } from "@/store/types";
import useKanbanStore from "@/store/store";

type TaskDialogProps = {
  children: React.ReactNode;
  task: Task;
};

const TaskDialog = ({ task, children }: TaskDialogProps) => {
  const selectedBoardId = useKanbanStore((state) => state.selectedBoardId)!;
  const dispatch = useKanbanStore((state) => state.dispatch);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [subtasks, setSubtasks] = useState<Subtask[]>(task.subtasks || []);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  // Track the index of the subtask currently in edit mode (only one at a time)
  const [editingSubtaskIndex, setEditingSubtaskIndex] = useState<number | null>(
    null,
  );

  console.log("isEditingSubtaskIndex", editingSubtaskIndex);

  const handleAddSubtask = () => {
    setSubtasks((prevSubtasks) => {
      const newIndex = prevSubtasks.length;
      const updatedSubtasks = [
        ...prevSubtasks,
        { title: "", isCompleted: false },
      ];
      setEditingSubtaskIndex(newIndex);
      return updatedSubtasks;
    });
  };

  const handleSubtaskChange = (index: number, value: string) => {
    const updated = [...subtasks];
    updated[index].title = value;
    setSubtasks(updated);
  };

  const handleToggleSubtask = (index: number) => {
    const updated = [...subtasks];
    updated[index].isCompleted = !updated[index].isCompleted;
    setSubtasks(updated);
  };

  const handleDeleteSubtask = (index: number) => {
    const updated = subtasks.filter((_, i) => i !== index);
    setSubtasks(updated);
    if (editingSubtaskIndex === index) {
      setEditingSubtaskIndex(null);
    }
  };

  const handleSave = () => {
    const updatedTask: Task = {
      ...task,
      title,
      description,
      subtasks,
    };
    dispatch({
      type: "updateTask",
      payload: {
        boardId: selectedBoardId,
        taskId: task.id,
        updatedTask,
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <div className="flex flex-col items-stretch justify-start gap-4 py-3">
            {/* Title field */}
            <DialogTitle asChild>
              {isEditingTitle ? (
                <Textarea
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setTitle(e.target.value)
                  }
                  onBlur={() => {
                    if (!title.trim()) {
                      setTitle(task.title);
                    }
                    setIsEditingTitle(false);
                  }}
                  autoFocus
                  variant="edit_task_title"
                  rows={1}
                />
              ) : (
                <div
                  onClick={() => setIsEditingTitle(true)}
                  className="text-task-foreground hover:bg-accent/80 cursor-text rounded-sm px-3 py-2 text-2xl font-semibold"
                >
                  {title}
                </div>
              )}
            </DialogTitle>

            <DialogDescription asChild>
              {isEditingDescription ? (
                <Textarea
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDescription(e.target.value)
                  }
                  onBlur={() => setIsEditingDescription(false)}
                  autoFocus
                  placeholder="Add description..."
                  rows={3}
                  variant="edit_task_description"
                />
              ) : (
                <div
                  onClick={() => setIsEditingDescription(true)}
                  className="text-task-foreground hover:bg-accent/80 cursor-text rounded-sm px-3 py-2 text-base font-light"
                >
                  {description || "Add description..."}
                </div>
              )}
            </DialogDescription>

            {/* Subtasks field */}
            <div className="px-3">
              <label className="text-sm font-medium">Subtasks</label>
              {subtasks.map((subtask, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2"
                >
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleSubtaskChange(index, e.target.value)
                        }
                        onBlur={() => setEditingSubtaskIndex(null)}
                        autoFocus
                        placeholder="New subtask"
                        className="bg-accent/80 w-full border-none shadow-none"
                      />
                    ) : (
                      <div
                        onClick={() => setEditingSubtaskIndex(index)}
                        className="text-task-foreground hover:bg-accent/80 cursor-text rounded-sm px-3 py-2 text-sm"
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
                <Button onClick={handleSave}>Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default TaskDialog;
