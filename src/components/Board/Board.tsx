import { ComponentPropsWithoutRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn, hasTaskDragData } from "@/lib/utils";
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
import Column from "@/components/Board/Column";
import AddColumn from "@/components/Board/AddColumn";
import TaskCard from "@/components/Board/TaskCard";
import useKanbanStore from "@/store/store";
import type { Task, Board } from "@/store/types";

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
    if (!hasTaskDragData(event.active) || !event.active.data.current) {
      return;
    }

    setActiveTask(event.active.data.current.task);
  };

  // const handleDragOver = (event: DragOverEvent) => {
  //   const { active, over } = event;
  //   if (!over) return;

  //   const activeId = active.id;
  //   const overId = over.id;

  //   if (activeId === overId) return;

  //   if (!hasTaskDragData(active) || !hasTaskDragData(over)) return;

  //   const { task: activeTask, columnId: activeColumnId } = active.data.current;
  //   const { task: overTask, columnId: overColumnId } = over.data.current;

  //   // Only handle reordering if tasks are in the same column
  //   if (activeColumnId === overColumnId) {
  //     const column = selectedBoard.columns.find(
  //       (col) => col.id === activeColumnId,
  //     );
  //     if (!column) return;

  //     const oldIndex = column.tasks.findIndex((t) => t.id === activeTask.id);
  //     const newIndex = column.tasks.findIndex((t) => t.id === overTask.id);

  //     if (oldIndex !== newIndex) {
  //       dispatch({
  //         type: "reorderTask",
  //         payload: {
  //           boardId: selectedBoard.id,
  //           columnId: activeColumnId,
  //           oldIndex,
  //           newIndex,
  //         },
  //       });
  //     }
  //   }
  // };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;

    if (!over || !hasTaskDragData(active)) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const { task } = active.data.current;
    const column = selectedBoard.columns.find(
      (col) => col.id === task.statusId,
    );
    if (!column) return;

    const oldIndex = column.tasks.findIndex((t) => `task-${t.id}` === activeId);
    const newIndex = column.tasks.findIndex((t) => `task-${t.id}` === overId);

    if (oldIndex !== newIndex) {
      dispatch({
        type: "reorderTask",
        payload: {
          boardId: selectedBoard.id,
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
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      // onDragOver={handleDragOver}
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
