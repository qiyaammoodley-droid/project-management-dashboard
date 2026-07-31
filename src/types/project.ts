export type ProjectStatus = "To Do" | "In Progress" | "In Review" | "Completed";

// This is the missing export:
export type StatusFilterOption = "All" | ProjectStatus;

export interface Project {
  id: number | string;
  name: string;
  description?: string;
  status: ProjectStatus;
  progress: number;
  deadline?: string;
  teamMembers: Array<{ id: number; name: string; role?: string }>;
}