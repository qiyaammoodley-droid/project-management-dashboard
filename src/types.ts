// Shared type definitions for the Project Details module.
// Built by Tshwarelo Madonsela (Member 3) — Project Details feature.

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  workloadPercent: number; // 0-100, how loaded this member currently is
}

export interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  assigneeId: string;
}

export interface RawDeadline {
  id: string;
  label: string;
  dueDate: string; // ISO date string, e.g. "2026-08-15"
}

export interface ParsedDeadline extends RawDeadline {
  daysRemaining: number;
  urgency: "overdue" | "due-soon" | "upcoming";
}

export interface RawActivityItem {
  id: string;
  memberId: string;
  message: string;
  timestamp: string; // ISO datetime string
}

export interface ParsedActivityItem extends RawActivityItem {
  relativeTime: string;
  memberName: string;
  memberInitials: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  client: string;
  status: "on-track" | "at-risk" | "delayed" | "completed";
  startDate: string;
  endDate: string;
  team: TeamMember[];
  tasks: Task[];
  deadlines: RawDeadline[];
  activity: RawActivityItem[];
}
