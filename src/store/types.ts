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
