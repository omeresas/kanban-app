import { produce } from "immer";
import { UniqueIdentifier } from "@dnd-kit/core";
import type { KanbanState, KanbanAction } from "@/store/store";
import type { Board, Column, Task } from "@/store/types";
import { addBoard, removeBoard } from "@/store/actionHandlers";

export const kanbanReducer = (
  state: KanbanState,
  action: KanbanAction,
): KanbanState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "addBoard":
        addBoard(draft, action.payload.name);
        break;

      case "removeBoard": {
        removeBoard(draft, action.payload.id);
        break;
      }

      case "addColumn": {
        const boardToAddColumn = draft.boards.find(
          (board) => board.id === action.payload.boardId,
        );
        if (boardToAddColumn) {
          const newColumn: Column = {
            id: getNextColumnId(boardToAddColumn),
            name: action.payload.name,
            tasks: [],
          };
          boardToAddColumn.columns.push(newColumn);
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
