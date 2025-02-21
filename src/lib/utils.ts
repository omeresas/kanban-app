import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { TaskDragData } from "@/components/Board/TaskCard";
import type { ColumnDragData } from "@/components/Board/Column";
import type { Active, DataRef, Over } from "@dnd-kit/core";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasTaskDragData(entry: Active | Over | null): entry is (
  | Active
  | Over
) & {
  data: {
    current: TaskDragData & Record<string, never>;
  };
} {
  if (!entry?.data?.current) {
    return false;
  }

  return entry.data.current.type === "Task";
}

export function hasColumnDragData<T extends Active | Over>(
  entry: T,
): entry is T & {
  data: DataRef<ColumnDragData>;
} {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  return data?.type === "Column";
}
