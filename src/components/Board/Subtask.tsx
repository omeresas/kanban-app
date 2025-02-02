import { cn } from "@/lib/utils";

interface SubtaskProps {
  title: string; // Subtask title
  isCompleted: boolean; // Completion status of the subtask
  onToggle: () => void; // Callback to toggle completion status
}

const Subtask = ({ title, isCompleted, onToggle }: SubtaskProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md p-2 transition-colors",
        isCompleted && "opacity-60",
      )}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={onToggle}
        className="h-4 w-4 cursor-pointer rounded border-gray-600"
      />
      {/* Subtask title */}
      <span className={cn(isCompleted && "line-through")}>{title}</span>
    </div>
  );
};

export default Subtask;
