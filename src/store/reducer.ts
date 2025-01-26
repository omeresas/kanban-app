import { Board, Column, Task } from "./types";

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

export const kanbanReducer = (
  state: Board[],
  action: KanbanAction,
): Board[] => {
  switch (action.type) {
    case "addBoard":
      return [...state, action.payload];

    case "removeBoard":
      return state.filter((board) => board.id !== action.payload);

    case "addColumn":
      return state.map((board) =>
        board.id === action.payload.boardId
          ? { ...board, columns: [...board.columns, action.payload.column] }
          : board,
      );

    case "removeColumn":
      return state.map((board) =>
        board.id === action.payload.boardId
          ? {
              ...board,
              columns: board.columns.filter(
                (col) => col.id !== action.payload.columnId,
              ),
            }
          : board,
      );

    case "addTask":
      return state.map((board) =>
        board.id === action.payload.boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === action.payload.columnId
                  ? { ...column, tasks: [...column.tasks, action.payload.task] }
                  : column,
              ),
            }
          : board,
      );

    case "updateTask":
      return state.map((board) =>
        board.id === action.payload.boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === action.payload.columnId
                  ? {
                      ...column,
                      tasks: column.tasks.map((task) =>
                        task.id === action.payload.taskId
                          ? { ...task, ...action.payload.updatedTask }
                          : task,
                      ),
                    }
                  : column,
              ),
            }
          : board,
      );

    case "removeTask":
      return state.map((board) =>
        board.id === action.payload.boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === action.payload.columnId
                  ? {
                      ...column,
                      tasks: column.tasks.filter(
                        (task) => task.id !== action.payload.taskId,
                      ),
                    }
                  : column,
              ),
            }
          : board,
      );

    case "toggleSubtask":
      return state.map((board) =>
        board.id === action.payload.boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === action.payload.columnId
                  ? {
                      ...column,
                      tasks: column.tasks.map((task) =>
                        task.id === action.payload.taskId
                          ? {
                              ...task,
                              subtasks: task.subtasks.map((subtask, index) =>
                                index === action.payload.subtaskIndex
                                  ? {
                                      ...subtask,
                                      isCompleted: !subtask.isCompleted,
                                    }
                                  : subtask,
                              ),
                            }
                          : task,
                      ),
                    }
                  : column,
              ),
            }
          : board,
      );

    default:
      throw new Error(`Unknown action: ${action}`);
  }
};
