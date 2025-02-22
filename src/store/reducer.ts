import { produce } from "immer";
import { UniqueIdentifier } from "@dnd-kit/core";
import type { KanbanState, KanbanAction } from "@/store/types";
import type { Board, Column, Task } from "@/store/types";
import { arrayMove } from "@dnd-kit/sortable";

export const kanbanReducer = (
  state: KanbanState,
  action: KanbanAction,
): KanbanState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "addBoard":
        addBoard(draft, action.payload.name);
        break;

      case "setSelectedBoard":
        draft.selectedBoardId = action.payload.boardId;
        break;

      case "deleteBoard":
        deleteBoard(draft, action.payload.boardId);
        break;

      case "addColumn":
        addColumn(draft, action.payload.name);
        break;

      case "deleteColumn":
        deleteColumn(draft, action.payload.columnId);
        break;

      case "addTask":
        addTask(draft, action.payload.columnId, action.payload.title);
        break;

      case "deleteTask":
        deleteTask(draft, action.payload.columnId, action.payload.taskId);
        break;

      case "updateTask":
        updateTask(draft, action.payload.taskId, action.payload.updatedTask);
        break;

      case "reorderTask":
        reorderTask(
          draft,
          action.payload.columnId,
          action.payload.oldIndex,
          action.payload.newIndex,
        );
        break;

      case "moveTask":
        moveTask(
          draft,
          action.payload.sourceColumnId,
          action.payload.destinationColumnId,
          action.payload.taskId,
        );
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
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

function deleteBoard(draft: KanbanState, id: UniqueIdentifier) {
  draft.boards = draft.boards.filter((board) => board.id !== id);
  draft.selectedBoardId = draft.boards.length > 0 ? draft.boards[0].id : null;
}

function addColumn(draft: KanbanState, name: string) {
  const board = getBoard(draft);
  const newColumn: Column = { id: getNextColumnId(board), name, tasks: [] };
  board.columns.push(newColumn);
}

function deleteColumn(draft: KanbanState, columnId: UniqueIdentifier) {
  const board = getBoard(draft);
  board.columns = board.columns.filter((column) => column.id !== columnId);
}

function addTask(
  draft: KanbanState,
  columnId: UniqueIdentifier,
  title: string,
) {
  const column = getColumn(draft, columnId);
  const newTask: Task = {
    id: getNextTaskId(draft),
    title,
    description: "",
    status: column.name,
    statusId: column.id,
    subtasks: [],
  };
  column.tasks.push(newTask);
}

function deleteTask(
  draft: KanbanState,
  columnId: UniqueIdentifier,
  taskId: UniqueIdentifier,
) {
  const column = getColumn(draft, columnId);
  column.tasks = column.tasks.filter((task) => task.id !== taskId);
}

function updateTask(
  draft: KanbanState,
  taskId: UniqueIdentifier,
  updatedTask: Partial<Task>,
) {
  const task = getTask(draft, taskId);
  Object.assign(task, updatedTask);
}

function reorderTask(
  draft: KanbanState,
  columnId: UniqueIdentifier,
  oldIndex: number,
  newIndex: number,
) {
  const column = getColumn(draft, columnId);
  column.tasks = arrayMove(column.tasks, oldIndex, newIndex);
}

function moveTask(
  draft: KanbanState,
  sourceColumnId: UniqueIdentifier,
  destinationColumnId: UniqueIdentifier,
  taskId: UniqueIdentifier,
) {
  const sourceColumn = getColumn(draft, sourceColumnId);
  const destinationColumn = getColumn(draft, destinationColumnId);

  const task = getTask(draft, taskId);
  sourceColumn.tasks = sourceColumn.tasks.filter((t) => t.id !== taskId);

  task.statusId = destinationColumnId;
  task.status = destinationColumn.name;

  destinationColumn.tasks.push(task);
}

// Helper functions for accessing state
function getBoard(draft: KanbanState) {
  const board = draft.boards.find((b) => b.id === draft.selectedBoardId);
  if (!board) {
    throw new Error(`Board ${draft.selectedBoardId} not found`);
  }
  return board;
}

function getColumn(draft: KanbanState, columnId: UniqueIdentifier) {
  const board = getBoard(draft);
  const column = board.columns.find((c) => c.id === columnId);
  if (!column) {
    throw new Error(`Column ${columnId} not found in board ${board.id}`);
  }
  return column;
}

function getTask(draft: KanbanState, taskId: UniqueIdentifier) {
  const board = getBoard(draft);
  const task = board.columns
    .flatMap((col) => col.tasks)
    .find((t) => t.id === taskId);
  if (!task) {
    throw new Error(`Task ${taskId} not found in board ${board.id}`);
  }
  return task;
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

function getNextTaskId(draft: KanbanState): UniqueIdentifier {
  const allTasks =
    draft.boards
      .find((b) => b.id === draft.selectedBoardId)
      ?.columns.flatMap((column) => column.tasks) ?? [];
  if (allTasks.length === 0) return 0;
  return Math.max(...allTasks.map((task) => toNumber(task.id))) + 1;
}
