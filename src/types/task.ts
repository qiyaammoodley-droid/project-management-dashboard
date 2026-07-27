export interface Task {
  id: number;
  projectId: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "In Review" | "Completed";
  priority: "Low" | "Medium" | "High";
  assignedTo: number;
  dueDate: string;
}