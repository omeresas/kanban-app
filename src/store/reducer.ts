import { produce } from "immer";
import type { KanbanState, KanbanAction } from "@/store/store";

export const kanbanReducer = (
  state: KanbanState,
  action: KanbanAction,
): KanbanState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "addBoard": {
        draft.boards.push(action.payload);
        break;
      }

      case "removeBoard": {
        draft.boards = draft.boards.filter(
          (board) => board.id !== action.payload,
        );
        break;
      }

      case "addColumn": {
        const boardToAddColumn = draft.boards.find(
          (board) => board.id === action.payload.boardId,
        );
        if (boardToAddColumn) {
          boardToAddColumn.columns.push(action.payload.column);
        }
        break;
      }

      case "removeColumn": {
        const boardToRemoveColumn = draft.boards.find(
          (board) => board.id === action.payload.boardId,
        );
        if (boardToRemoveColumn) {
          boardToRemoveColumn.columns = boardToRemoveColumn.columns.filter(
            (col) => col.id !== action.payload.columnId,
          );
        }
        break;
      }

      case "addTask": {
        draft.boards
          .find((board) => board.id === action.payload.boardId)
          ?.columns.find((column) => column.id === action.payload.columnId)
          ?.tasks.push(action.payload.task);
        break;
      }

      case "removeTask": {
        const columnToRemoveTask = draft.boards
          .find((board) => board.id === action.payload.boardId)
          ?.columns.find((column) => column.id === action.payload.columnId);

        if (columnToRemoveTask) {
          columnToRemoveTask.tasks = columnToRemoveTask.tasks.filter(
            (task) => task.id !== action.payload.taskId,
          );
        }
        break;
      }

      case "updateTask": {
        const taskToUpdate = draft.boards
          .find((board) => board.id === action.payload.boardId)
          ?.columns.find((column) => column.id === action.payload.columnId)
          ?.tasks.find((task) => task.id === action.payload.taskId);

        if (taskToUpdate) {
          Object.assign(taskToUpdate, action.payload.updatedTask);
        }
        break;
      }

      case "toggleSubtask": {
        const subtaskToToggle = draft.boards
          .find((board) => board.id === action.payload.boardId)
          ?.columns.find((column) => column.id === action.payload.columnId)
          ?.tasks.find((task) => task.id === action.payload.taskId)?.subtasks[
          action.payload.subtaskIndex
        ];

        if (subtaskToToggle) {
          subtaskToToggle.isCompleted = !subtaskToToggle.isCompleted;
        }
        break;
      }

      default: {
        throw new Error(`Unknown action: ${action}`);
      }
    }
  });
};
