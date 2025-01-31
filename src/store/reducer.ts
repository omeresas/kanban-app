import { produce } from "immer";
import { UniqueIdentifier } from "@dnd-kit/core";
import type { KanbanState, KanbanAction } from "@/store/store";
import type { Board, Column, Task } from "@/store/types";

export const kanbanReducer = (
  state: KanbanState,
  action: KanbanAction,
): KanbanState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "addBoard":
        addBoard(draft, action.payload.name);
        break;

      case "removeBoard":
        removeBoard(draft, action.payload);
        break;

      case "addColumn":
        addColumn(draft, action.payload.boardId, action.payload.name);
        break;

      case "removeColumn":
        removeColumn(draft, action.payload.boardId, action.payload.columnId);
        break;

      case "addTask":
        addTask(
          draft,
          action.payload.boardId,
          action.payload.columnId,
          action.payload.title,
          action.payload.description,
        );
        break;

      case "removeTask":
        removeTask(
          draft,
          action.payload.boardId,
          action.payload.columnId,
          action.payload.taskId,
        );
        break;

      case "updateTask":
        updateTask(
          draft,
          action.payload.boardId,
          action.payload.columnId,
          action.payload.taskId,
          action.payload.updatedTask,
        );
        break;

      case "toggleSubtask":
        toggleSubtask(
          draft,
          action.payload.boardId,
          action.payload.columnId,
          action.payload.taskId,
          action.payload.subtaskIndex,
        );
        break;

      default:
        throw new Error(`Unknown action: ${action.type}`);
    }
  });
};

function addBoard(draft: KanbanState, name: string) {
  const newBoard: Board = {
    id: getNextBoardId(draft.boards),
    name,
    columns: [],
  };
  draft.boards.push(newBoard);
}

function removeBoard(draft: KanbanState, id: UniqueIdentifier) {
  draft.boards = draft.boards.filter((board) => board.id !== id);
}

function addColumn(
  draft: KanbanState,
  boardId: UniqueIdentifier,
  name: string,
) {
  const board = draft.boards.find((b) => b.id === boardId);
  if (board) {
    const newColumn: Column = { id: getNextColumnId(board), name, tasks: [] };
    board.columns.push(newColumn);
  }
}

function removeColumn(
  draft: KanbanState,
  boardId: UniqueIdentifier,
  columnId: UniqueIdentifier,
) {
  const board = draft.boards.find((b) => b.id === boardId);
  if (board) {
    board.columns = board.columns.filter((column) => column.id !== columnId);
  }
}

function addTask(
  draft: KanbanState,
  boardId: UniqueIdentifier,
  columnId: UniqueIdentifier,
  title: string,
  description = "",
) {
  const board = draft.boards.find((b) => b.id === boardId);
  const column = board?.columns.find((c) => c.id === columnId);
  if (column) {
    const newTask: Task = {
      id: getNextTaskId(board),
      title,
      description,
      status: column.name,
      statusId: column.id,
      subtasks: [],
    };
    column.tasks.push(newTask);
  }
}

function removeTask(
  draft: KanbanState,
  boardId: UniqueIdentifier,
  columnId: UniqueIdentifier,
  taskId: UniqueIdentifier,
) {
  const column = draft.boards
    .find((b) => b.id === boardId)
    ?.columns.find((c) => c.id === columnId);
  if (column) {
    column.tasks = column.tasks.filter((task) => task.id !== taskId);
  }
}

function updateTask(
  draft: KanbanState,
  boardId: UniqueIdentifier,
  columnId: UniqueIdentifier,
  taskId: UniqueIdentifier,
  updatedTask: Partial<Task>,
) {
  const task = draft.boards
    .find((b) => b.id === boardId)
    ?.columns.find((c) => c.id === columnId)
    ?.tasks.find((t) => t.id === taskId);
  if (task) {
    Object.assign(task, updatedTask);
  }
}

function toggleSubtask(
  draft: KanbanState,
  boardId: UniqueIdentifier,
  columnId: UniqueIdentifier,
  taskId: UniqueIdentifier,
  subtaskIndex: number,
) {
  const subtask = draft.boards
    .find((b) => b.id === boardId)
    ?.columns.find((c) => c.id === columnId)
    ?.tasks.find((t) => t.id === taskId)?.subtasks[subtaskIndex];
  if (subtask) {
    subtask.isCompleted = !subtask.isCompleted;
  }
}

// Helper functions
function toNumber(id: UniqueIdentifier): number {
  return typeof id === "number" ? id : parseInt(id, 10) || 0;
}

function getNextBoardId(boards: Board[]): UniqueIdentifier {
  if (boards.length === 0) return 0;
  return Math.max(...boards.map((board) => toNumber(board.id))) + 1;
}

function getNextColumnId(board: Board): UniqueIdentifier {
  if (board.columns.length === 0) return 0;
  return Math.max(...board.columns.map((column) => toNumber(column.id))) + 1;
}

function getNextTaskId(board: Board): UniqueIdentifier {
  const allTasks = board.columns.flatMap((column) => column.tasks);
  if (allTasks.length === 0) return 0;
  return Math.max(...allTasks.map((task) => toNumber(task.id))) + 1;
}
