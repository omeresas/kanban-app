import { UniqueIdentifier } from "@dnd-kit/core";

export type Subtask = {
  title: string;
  isCompleted: boolean;
};

export type Task = {
  id: UniqueIdentifier;
  title: string;
  description: string;
  status: string;
  statusId: number;
  subtasks: Subtask[];
};

export type Column = {
  id: UniqueIdentifier;
  name: string;
  tasks: Task[];
};

export type Board = {
  id: UniqueIdentifier;
  name: string;
  columns: Column[];
};
