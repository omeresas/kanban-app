import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import type { Task, Subtask } from "@/store/types";

type TaskDialogProps = {
  children: React.ReactNode;
  task: Task;
  onSave?: (updatedTask: Task) => void;
};

const TaskDialog = ({ task, onSave, children }: TaskDialogProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [subtasks, setSubtasks] = useState<Subtask[]>(task.subtasks || []);

  // New state flags for editing modes
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { title: "", isCompleted: false }]);
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
  };

  const handleSave = () => {
    const updatedTask: Task = {
      ...task,
      title,
      description,
      subtasks,
    };
    if (onSave) onSave(updatedTask);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <div className="flex flex-col items-stretch justify-start gap-4 py-4">
          {/* Title field */}
          {isEditingTitle ? (
            <Input
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              onBlur={() => setIsEditingTitle(false)}
              autoFocus
              variant="edit_task_title"
            />
          ) : (
            <div
              onClick={() => setIsEditingTitle(true)}
              className="text-task-foreground hover:bg-accent/50 cursor-text self-start px-2 py-1 text-lg font-semibold"
            >
              {title}
            </div>
          )}

          {/* Description field */}
          <div className="flex flex-col gap-2">
            {isEditingDescription ? (
              <Textarea
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
                onBlur={() => setIsEditingDescription(false)}
                autoFocus
                placeholder="Task description"
                rows={5}
              />
            ) : (
              <div
                onClick={() => setIsEditingDescription(true)}
                className="cursor-pointer rounded border p-2"
              >
                {description || "Add description"}
              </div>
            )}
          </div>

          {/* Subtasks field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Subtasks</label>
            {subtasks.map((subtask, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={subtask.isCompleted}
                  onChange={() => handleToggleSubtask(index)}
                  className="h-4 w-4"
                />
                <Input
                  value={subtask.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSubtaskChange(index, e.target.value)
                  }
                  placeholder="Subtask title"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteSubtask(index)}
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
            <Button onClick={handleSave}>Save changes</Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
