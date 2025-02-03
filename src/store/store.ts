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
  | {
      type: "addBoard";
      payload: { name: string };
    }
  | {
      type: "deleteBoard";
      payload: {
        boardId: UniqueIdentifier;
      };
    }
  | {
      type: "addColumn";
      payload: { boardId: UniqueIdentifier; name: string };
    }
  | {
      type: "deleteColumn";
      payload: { boardId: UniqueIdentifier; columnId: UniqueIdentifier };
    }
  | {
      type: "addTask";
      payload: {
        boardId: UniqueIdentifier;
        columnId: UniqueIdentifier;
        title: string;
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
      type: "deleteTask";
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
