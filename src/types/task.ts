export type TaskStatus = "To Do" | "In Progress" | "In Review" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High";
export type TaskRecurrence = "None" | "Daily" | "Weekly" | "Monthly";

export interface Task {
  id: number | string;
  projectId: number | string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  recurrence?: TaskRecurrence;
  recurrenceCount?: number;
  assignedTo?: number;
  dueDate?: string;
  createdAt?: string;
}