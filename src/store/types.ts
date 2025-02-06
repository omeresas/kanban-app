import { UniqueIdentifier } from "@dnd-kit/core";

export type Board = {
  id: UniqueIdentifier;
  name: string;
  columns: Column[];
};

export type Column = {
  id: UniqueIdentifier;
  name: string;
  tasks: Task[];
};

export type Task = {
  id: UniqueIdentifier;
  title: string;
  description: string;
  status: string;
  statusId: UniqueIdentifier;
  subtasks: Subtask[];
};

export type Subtask = {
  title: string;
  isCompleted: boolean;
};

export type KanbanState = {
  selectedBoardId: UniqueIdentifier | null;
  boards: Board[];
};

export type KanbanAction =
  | {
      type: "addBoard";
      payload: { name: string };
    }
  | { type: "setSelectedBoard"; payload: { boardId: UniqueIdentifier | null } }
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
      //TODO: update task
      type: "updateTask";
      payload: {
        boardId: UniqueIdentifier;
        taskId: UniqueIdentifier;
        updatedTask: Partial<Task>;
      };
    }
  | {
      //TODO: Delete task
      type: "deleteTask";
      payload: {
        boardId: UniqueIdentifier;
        columnId: UniqueIdentifier;
        taskId: UniqueIdentifier;
      };
    };
