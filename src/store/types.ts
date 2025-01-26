export type Subtask = {
  title: string;
  isCompleted: boolean;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  statusId: number;
  subtasks: Subtask[];
};

export type Column = {
  id: number;
  name: string;
  tasks: Task[];
};

export type Board = {
  id: number;
  name: string;
  columns: Column[];
};
