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
      payload: { boardId: UniqueIdentifier };
    }
  | {
      type: "addColumn";
      payload: { name: string };
    }
  | {
      type: "deleteColumn";
      payload: { columnId: UniqueIdentifier };
    }
  | {
      type: "addTask";
      payload: {
        columnId: UniqueIdentifier;
        title: string;
      };
    }
  | {
      type: "updateTask";
      payload: {
        taskId: UniqueIdentifier;
        updatedTask: Partial<Task>;
      };
    }
  | {
      type: "deleteTask";
      payload: {
        columnId: UniqueIdentifier;
        taskId: UniqueIdentifier;
      };
    }
  | {
      type: "reorderTask";
      payload: {
        columnId: UniqueIdentifier;
        oldIndex: number;
        newIndex: number;
      };
    }
  | {
      type: "moveTask";
      payload: {
        sourceColumnId: UniqueIdentifier;
        destinationColumnId: UniqueIdentifier;
        taskId: UniqueIdentifier;
      };
    }
  | {
      type: "reorderColumn";
      payload: {
        oldIndex: number;
        newIndex: number;
      };
    }
  | {
      type: "renameColumn";
      payload: {
        columnId: UniqueIdentifier;
        name: string;
      };
    };
