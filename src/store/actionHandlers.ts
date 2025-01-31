import { KanbanState, KanbanAction } from "@/store/store";
import { Board, Column, Task } from "@/store/types";
import { UniqueIdentifier } from "@dnd-kit/core";

// Action Handlers
export const addBoard = (draft: KanbanState, name: string) => {
  const newBoard: Board = {
    id: getNextBoardId(draft.boards),
    name,
    columns: [],
  };
  draft.boards.push(newBoard);
};

// TODO: add caution for non-empty boards
export const removeBoard = (draft: KanbanState, id: UniqueIdentifier) => {
  draft.boards = draft.boards.filter((board) => board.id !== id);
};

export const addColumn = (
  draft: KanbanState,
  boardId: UniqueIdentifier,
  name: string,
) => {
  const board = draft.boards.find((b) => b.id === boardId);
  if (board) {
    const newColumn: Column = {
      id: getNextColumnId(board),
      name,
      tasks: [],
    };
    board.columns.push(newColumn);
  }
};

export const removeColumn = (
  draft: KanbanState,
  boardId: UniqueIdentifier,
  columnId: UniqueIdentifier,
) => {
  const board = draft.boards.find((b) => b.id === boardId);
  if (board) {
    board.columns = board.columns.filter((column) => column.id !== columnId);
  }
};

export const addTask = (
  draft: KanbanState,
  boardId: UniqueIdentifier,
  columnId: UniqueIdentifier,
  title: string,
  description = "",
) => {
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
};

export const removeTask = (
  draft: KanbanState,
  boardId: UniqueIdentifier,
  columnId: UniqueIdentifier,
  taskId: UniqueIdentifier,
) => {
  const column = draft.boards
    .find((b) => b.id === boardId)
    ?.columns.find((c) => c.id === columnId);
  if (column) {
    column.tasks = column.tasks.filter((task) => task.id !== taskId);
  }
};

export const updateTask = (
  draft: KanbanState,
  boardId: UniqueIdentifier,
  columnId: UniqueIdentifier,
  taskId: UniqueIdentifier,
  updatedTask: Partial<Task>,
) => {
  const task = draft.boards
    .find((b) => b.id === boardId)
    ?.columns.find((c) => c.id === columnId)
    ?.tasks.find((t) => t.id === taskId);
  if (task) {
    Object.assign(task, updatedTask);
  }
};

export const toggleSubtask = (
  draft: KanbanState,
  boardId: UniqueIdentifier,
  columnId: UniqueIdentifier,
  taskId: UniqueIdentifier,
  subtaskIndex: number,
) => {
  const subtask = draft.boards
    .find((b) => b.id === boardId)
    ?.columns.find((c) => c.id === columnId)
    ?.tasks.find((t) => t.id === taskId)?.subtasks[subtaskIndex];

  if (subtask) {
    subtask.isCompleted = !subtask.isCompleted;
  }
};

// Utility Functions
const toNumber = (id: UniqueIdentifier): number => {
  if (typeof id === "number") return id;
  const parsed = parseInt(id, 10);
  return isNaN(parsed) ? 0 : parsed;
};

const getNextBoardId = (boards: Board[]): UniqueIdentifier => {
  if (boards.length === 0) return 0;
  return Math.max(...boards.map((board) => toNumber(board.id))) + 1;
};

const getNextColumnId = (board: Board): UniqueIdentifier => {
  if (board.columns.length === 0) return 0;
  return Math.max(...board.columns.map((column) => toNumber(column.id))) + 1;
};

const getNextTaskId = (board: Board): UniqueIdentifier => {
  const allTasks = board.columns.flatMap((column) => column.tasks);
  if (allTasks.length === 0) return 0;
  return Math.max(...allTasks.map((task) => toNumber(task.id))) + 1;
};
