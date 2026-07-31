export type TaskStatus = "To Do" | "In Progress" | "In Review" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
  id: number | string;
  projectId: number | string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo?: number;
  dueDate?: string;
  createdAt?: string;
}