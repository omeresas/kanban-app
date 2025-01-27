import { create } from "zustand";
import { redux, devtools } from "zustand/middleware";
import initialState from "./initialState.json";
import { kanbanReducer } from "./reducer";
import type { Board, Column, Task } from "./types";

export type KanbanState = {
  boards: Board[];
};

export type KanbanAction =
  | { type: "addBoard"; payload: Board }
  | { type: "removeBoard"; payload: number }
  | { type: "addColumn"; payload: { boardId: number; column: Column } }
  | { type: "removeColumn"; payload: { boardId: number; columnId: number } }
  | {
      type: "addTask";
      payload: { boardId: number; columnId: number; task: Task };
    }
  | {
      type: "updateTask";
      payload: {
        boardId: number;
        columnId: number;
        taskId: number;
        updatedTask: Partial<Task>;
      };
    }
  | {
      type: "removeTask";
      payload: { boardId: number; columnId: number; taskId: number };
    }
  | {
      type: "toggleSubtask";
      payload: {
        boardId: number;
        columnId: number;
        taskId: number;
        subtaskIndex: number;
      };
    };

const useKanbanStore = create(devtools(redux(kanbanReducer, initialState)));

export default useKanbanStore;
