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
        "flex items-center gap-2 rounded-md bg-gray-800 p-2 transition hover:bg-gray-700",
        isCompleted && "opacity-60",
      )}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={onToggle}
        className="h-4 w-4 cursor-pointer rounded border-gray-600 bg-gray-900 text-blue-500"
      />
      {/* Subtask title */}
      <span
        className={cn(
          "text-sm text-gray-200",
          isCompleted && "text-gray-500 line-through",
        )}
      >
        {title}
      </span>
    </div>
  );
};

export default Subtask;
