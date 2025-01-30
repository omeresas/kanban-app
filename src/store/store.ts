import { create } from "zustand";
import { redux, devtools } from "zustand/middleware";
import { UniqueIdentifier } from "@dnd-kit/core";

import initialState from "./initialState.json";
import { kanbanReducer } from "./reducer";
import type { Board, Column, Task } from "./types";

export type KanbanState = {
  boards: Board[];
};

export type KanbanAction =
  | { type: "addBoard"; payload: Board }
  | { type: "removeBoard"; payload: UniqueIdentifier }
  | {
      type: "addColumn";
      payload: { boardId: UniqueIdentifier; column: Column };
    }
  | {
      type: "removeColumn";
      payload: { boardId: UniqueIdentifier; columnId: UniqueIdentifier };
    }
  | {
      type: "addTask";
      payload: {
        boardId: UniqueIdentifier;
        columnId: UniqueIdentifier;
        task: Task;
      };
    }
  | {
      type: "updateTask";
      payload: {
        boardId: UniqueIdentifier;
        columnId: UniqueIdentifier;
        taskId: UniqueIdentifier;
        updatedTask: Partial<Task>;
      };
    }
  | {
      type: "removeTask";
      payload: {
        boardId: UniqueIdentifier;
        columnId: UniqueIdentifier;
        taskId: UniqueIdentifier;
      };
    }
  | {
      type: "toggleSubtask";
      payload: {
        boardId: UniqueIdentifier;
        columnId: UniqueIdentifier;
        taskId: UniqueIdentifier;
        subtaskIndex: number;
      };
    };

const useKanbanStore = create(devtools(redux(kanbanReducer, initialState)));

export default useKanbanStore;
