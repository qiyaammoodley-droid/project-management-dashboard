import type { Task } from "../types/task";

export const tasks: Task[] = [
	{
		id: 101,
		projectId: 1,
		title: "Design task card interactions",
		description:
			"Create hover states and quick actions for task cards in the dashboard board view.",
		priority: "High",
		status: "In Progress",
		assignedTo: 2,
		dueDate: "2026-08-05",
	},
	{
		id: 102,
		projectId: 1,
		title: "Implement API error handling",
		description:
			"Handle task service failures with user-friendly errors and retry actions.",
		priority: "Medium",
		status: "To Do",
		assignedTo: 3,
		dueDate: "2026-08-09",
	},
	{
		id: 103,
		projectId: 2,
		title: "Write regression tests for status flow",
		description:
			"Add tests to ensure status transitions always follow the approved workflow.",
		priority: "Low",
		status: "In Review",
		assignedTo: 4,
		dueDate: "2026-08-12",
	},
];
