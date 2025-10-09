import type { Task } from "./task";

export interface List {
  id: string;
  title: string;
  tasks: Task[];
}
