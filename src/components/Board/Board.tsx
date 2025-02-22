import { ComponentPropsWithoutRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import {
  DndContext,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import AddColumn from "@/components/Board/AddColumn";
import TaskCard from "@/components/Board/TaskCard";
import Column from "@/components/Board/Column";
import useKanbanStore from "@/store/store";
import type { Task, Board } from "@/store/types";
import type { Column as ColumnType } from "@/store/types";

type BoardProps = ComponentPropsWithoutRef<"div"> & {
  selectedBoard: Board;
};

const Board = ({ className, selectedBoard, ...props }: BoardProps) => {
  const { dispatch } = useKanbanStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required before drag starts
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTask(event.active.data.current?.task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeTask = active.data.current?.task as Task;
    const overType = over.data.current?.type;

    // Get the destination column id based on over element type
    const destinationColumnId =
      overType === "Task"
        ? (over.data.current?.task as Task).statusId // Use task's statusId
        : (over.data.current?.column as ColumnType).id; // Use column's id

    if (activeTask.statusId !== destinationColumnId) {
      dispatch({
        type: "moveTask",
        payload: {
          sourceColumnId: activeTask.statusId,
          destinationColumnId,
          taskId: activeTask.id,
        },
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const task = active.data.current?.task as Task;
    const column = selectedBoard.columns.find(
      (col) => col.id === task.statusId,
    ) as ColumnType;

    const oldIndex = column.tasks.findIndex((t) => `task-${t.id}` === activeId);
    const newIndex = column.tasks.findIndex((t) => `task-${t.id}` === overId);

    if (oldIndex !== newIndex) {
      dispatch({
        type: "reorderTask",
        payload: {
          columnId: column.id,
          oldIndex,
          newIndex,
        },
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      // There are also other collision detection strategies like rectIntersection and pointerWithin
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div
        className={cn(
          "from-board-gradient-start via-board-gradient-middle to-board-gradient-end grid auto-cols-[18rem] grid-flow-col items-start gap-6 bg-gradient-to-br from-20% via-60% p-6",
          className,
        )}
        {...props}
      >
        {selectedBoard.columns.map((column) => (
          <Column key={column.id} column={column} boardId={selectedBoard.id} />
        ))}
        <AddColumn />
      </div>
      {createPortal(
        <DragOverlay>
          {activeTask && <TaskCard task={activeTask} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};

export default Board;
