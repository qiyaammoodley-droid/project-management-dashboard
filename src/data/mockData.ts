import type { Project } from "../types";

// Mock data standing in for a real/external API response.
// Team roster reflects the actual group project members.
export const project: Project = {
  id: "proj-001",
  name: "Nexus Client Portal Revamp",
  description:
    "A redesign of the client-facing portal, moving from a legacy static site to a component-driven interface with live project tracking, task boards, and a unified activity feed for stakeholders.",
  client: "Horizon Retail Group",
  status: "on-track",
  startDate: "2026-06-01",
  endDate: "2026-09-12",
  team: [
    {
      id: "m1",
      name: "Qiyaam Moodley",
      role: "Frontend Developer — Task Board",
      initials: "QM",
      workloadPercent: 72,
    },
    {
      id: "m2",
      name: "Noluthando Molui",
      role: "UI/UX Designer",
      initials: "NM",
      workloadPercent: 58,
    },
    {
      id: "m3",
      name: "Thandokuhle Maphanga",
      role: "Frontend Developer — Analytics",
      initials: "TM",
      workloadPercent: 65,
    },
    {
      id: "m4",
      name: "Nyiko Vumani",
      role: "QA & Documentation",
      initials: "NV",
      workloadPercent: 40,
    },
    {
      id: "m5",
      name: "Tshwarelo Madonsela",
      role: "Frontend Developer — Project Details",
      initials: "TM",
      workloadPercent: 80,
    },
  ],
  tasks: [
    { id: "t1", title: "Design system tokens", status: "done", assigneeId: "m2" },
    { id: "t2", title: "Task board drag-and-drop", status: "done", assigneeId: "m1" },
    { id: "t3", title: "Project details page", status: "done", assigneeId: "m5" },
    { id: "t4", title: "Progress + deadline widgets", status: "done", assigneeId: "m5" },
    { id: "t5", title: "Analytics charts", status: "in-progress", assigneeId: "m3" },
    { id: "t6", title: "Activity feed real-time polish", status: "in-progress", assigneeId: "m5" },
    { id: "t7", title: "Task board filters", status: "in-progress", assigneeId: "m1" },
    { id: "t8", title: "Accessibility audit", status: "todo", assigneeId: "m4" },
    { id: "t9", title: "Onboarding walkthrough", status: "todo", assigneeId: "m2" },
    { id: "t10", title: "Client review deck", status: "todo", assigneeId: "m4" },
  ],
  deadlines: [
    { id: "d1", label: "Design system freeze", dueDate: "2026-07-20" },
    { id: "d2", label: "Analytics module handoff", dueDate: "2026-08-05" },
    { id: "d3", label: "Internal QA pass", dueDate: "2026-08-18" },
    { id: "d4", label: "Client demo", dueDate: "2026-08-25" },
    { id: "d5", label: "Final delivery", dueDate: "2026-09-12" },
  ],
  activity: [
    {
      id: "a1",
      memberId: "m5",
      message: "Wired up the progress bar to live task counts.",
      timestamp: "2026-07-30T14:20:00",
    },
    {
      id: "a2",
      memberId: "m1",
      message: "Merged drag-and-drop reorder for the task board.",
      timestamp: "2026-07-30T11:05:00",
    },
    {
      id: "a3",
      memberId: "m3",
      message: "Pushed first draft of the burndown chart.",
      timestamp: "2026-07-29T19:40:00",
    },
    {
      id: "a4",
      memberId: "m2",
      message: "Finalised the green/gray design tokens for the shared theme.",
      timestamp: "2026-07-29T16:10:00",
    },
    {
      id: "a5",
      memberId: "m5",
      message: "Added deadline urgency parsing (overdue / due soon / upcoming).",
      timestamp: "2026-07-29T09:15:00",
    },
    {
      id: "a6",
      memberId: "m4",
      message: "Logged 3 accessibility issues from the contrast audit.",
      timestamp: "2026-07-28T15:30:00",
    },
    {
      id: "a7",
      memberId: "m5",
      message: "Set up team members panel with workload indicators.",
      timestamp: "2026-07-27T10:00:00",
    },
  ],
};
