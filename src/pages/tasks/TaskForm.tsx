import { useState } from "react";
import type { FormEvent } from "react";
import type { Task, TaskPriority, TaskStatus } from "../../types/task";

interface TaskFormProps {
  initialValues?: Partial<Task>;
  onSubmit: (taskData: Omit<Task, "id" | "createdAt">) => void;
  onCancel?: () => void;
  users?: Array<{ id: number; name: string; role: string }>;
  projects?: Array<{ id: number; name: string }>;
}

const DEFAULT_USERS = [
  { id: 1, name: "Alex Johnson", role: "Developer" },
  { id: 2, name: "Sarah Smith", role: "Designer" },
  { id: 3, name: "Michael Brown", role: "Project Manager" },
];

const DEFAULT_PROJECTS = [
  { id: 1, name: "Website Redesign" },
  { id: 2, name: "Mobile App" },
];

const TaskForm = ({
  initialValues,
  onSubmit,
  onCancel,
  users = DEFAULT_USERS,
  projects = DEFAULT_PROJECTS,
}: TaskFormProps) => {
  const [formValues, setFormValues] = useState({
    title: initialValues?.title || "",
    description: initialValues?.description || "",
    status: (initialValues?.status || "To Do") as TaskStatus,
    priority: (initialValues?.priority || "Medium") as TaskPriority,
    projectId: initialValues?.projectId || (projects[0]?.id ?? 1),
    assignedTo: initialValues?.assignedTo || 0,
    dueDate: initialValues?.dueDate || "",
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!formValues.title.trim()) return;

    onSubmit({
      title: formValues.title.trim(),
      description: formValues.description.trim(),
      status: formValues.status,
      priority: formValues.priority,
      projectId: Number(formValues.projectId),
      assignedTo: formValues.assignedTo ? Number(formValues.assignedTo) : undefined,
      dueDate: formValues.dueDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-slate-700">Task Title</label>
        <input
          type="text"
          required
          value={formValues.title}
          onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
          placeholder="e.g. Design homepage layout"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-400"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-slate-700">Description</label>
        <textarea
          rows={3}
          value={formValues.description}
          onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
          placeholder="Add details about this task..."
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-400"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Project Selector */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Project</label>
          <select
            value={formValues.projectId}
            onChange={(e) => setFormValues({ ...formValues, projectId: Number(e.target.value) })}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-400"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {/* Assignee Selector (Contains the fix) */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Assignee</label>
          <select
            value={formValues.assignedTo || ""}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                assignedTo: event.target.value ? Number(event.target.value) : 0,
              }))
            }
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-400"
          >
            <option value="">Select assignee</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} - {user.role}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Status</label>
          <select
            value={formValues.status}
            onChange={(e) => setFormValues({ ...formValues, status: e.target.value as TaskStatus })}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-400"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Priority</label>
          <select
            value={formValues.priority}
            onChange={(e) => setFormValues({ ...formValues, priority: e.target.value as TaskPriority })}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-400"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-sm font-medium text-slate-700">Due Date</label>
        <input
          type="date"
          value={formValues.dueDate}
          onChange={(e) => setFormValues({ ...formValues, dueDate: e.target.value })}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-400"
        />
      </div>

      {/* Form Buttons */}
      <div className="flex items-center justify-end gap-3 pt-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Save Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;