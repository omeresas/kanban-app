import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";

interface BoardColumnProps {
  title: string;
  tasks: { id: string; text: string }[];
  id: string;
}

const BoardColumn = ({ title, tasks, id }: BoardColumnProps) => {
  const { isOver, setNodeRef } = useDroppable({ id }); // Unique ID for the droppable
  console.log("isOver", isOver);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col bg-gray-800 p-4 shadow-md transition",
        isOver && "bg-gray-700", // Change background when draggable is over
      )}
    >
      <h2 className="mb-4 text-lg font-bold text-gray-200">{title}</h2>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <Task key={task.id} text={task.text} id={task.id} />
        ))}
      </div>
    </div>
  );
};

const NewColumnButton = () => {
  return (
    <button className="flex items-center justify-center rounded-lg bg-gray-700 p-4 text-gray-400 shadow-md transition hover:bg-gray-600">
      + New Column
    </button>
  );
};

export { BoardColumn, NewColumnButton };
