import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Board, Column, Task } from "./types";
import data from "./initialData.json";

type KanbanState = {
  boards: Board[];
};

type KanbanActions = {
  addBoard: (board: Board) => void;
  removeBoard: (boardId: number) => void;
  addColumn: (boardId: number, column: Column) => void;
  removeColumn: (boardId: number, columnId: number) => void;
  addTask: (boardId: number, columnId: number, task: Task) => void;
  updateTask: (
    boardId: number,
    columnId: number,
    taskId: number,
    updatedTask: Partial<Task>,
  ) => void;
  removeTask: (boardId: number, columnId: number, taskId: number) => void;
  toggleSubtask: (
    boardId: number,
    columnId: number,
    taskId: number,
    subtaskIndex: number,
  ) => void;
};

const useKanbanStore = create<KanbanState & KanbanActions>()(
  immer((set) => ({
    boards: data.boards,

    addBoard: (board) =>
      set((state) => {
        state.boards.push(board);
      }),

    removeBoard: (boardId) =>
      set((state) => {
        state.boards = state.boards.filter((board) => board.id !== boardId);
      }),

    addColumn: (boardId, column) =>
      set((state) => {
        const board = state.boards.find((b) => b.id === boardId);
        if (board) {
          board.columns.push(column);
        }
      }),

    removeColumn: (boardId, columnId) =>
      set((state) => {
        const board = state.boards.find((b) => b.id === boardId);
        if (board) {
          board.columns = board.columns.filter((col) => col.id !== columnId);
        }
      }),

    addTask: (boardId, columnId, task) =>
      set((state) => {
        const board = state.boards.find((b) => b.id === boardId);
        const column = board?.columns.find((col) => col.id === columnId);
        if (column) {
          column.tasks.push(task);
        }
      }),

    updateTask: (boardId, columnId, taskId, updatedTask) =>
      set((state) => {
        const board = state.boards.find((b) => b.id === boardId);
        const column = board?.columns.find((col) => col.id === columnId);
        const task = column?.tasks.find((t) => t.id === taskId);
        if (task) {
          Object.assign(task, updatedTask);
        }
      }),

    removeTask: (boardId, columnId, taskId) =>
      set((state) => {
        const board = state.boards.find((b) => b.id === boardId);
        const column = board?.columns.find((col) => col.id === columnId);
        if (column) {
          column.tasks = column.tasks.filter((task) => task.id !== taskId);
        }
      }),

    toggleSubtask: (boardId, columnId, taskId, subtaskIndex) =>
      set((state) => {
        const board = state.boards.find((b) => b.id === boardId);
        const column = board?.columns.find((col) => col.id === columnId);
        const task = column?.tasks.find((t) => t.id === taskId);
        if (task && task.subtasks[subtaskIndex]) {
          const subtask = task.subtasks[subtaskIndex];
          subtask.isCompleted = !subtask.isCompleted;
        }
      }),
  })),
);

export default useKanbanStore;
