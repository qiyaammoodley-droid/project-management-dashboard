export interface Project {
  id: number;
  name: string;
  description: string;
  status: "To Do" | "In Progress" | "In Review" | "Completed";
  progress: number;
  deadline: string;
  teamMembers: number[];
}