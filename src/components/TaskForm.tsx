import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { Task } from "../types/task";
import type { User } from "../types/user";
import type { Project } from "../types/project";

type TaskFormValues = Omit<Task, "id" | "projectId">;

type TaskFormProps = {
  users: User[];
  projects?: Project[];
  selectedProjectId?: number;
  initialValues?: Partial<TaskFormValues>;
  onSubmit: (values: TaskFormValues & { projectId?: number }) => void;
  submitLabel?: string;
  className?: string;
};

const defaultValues: TaskFormValues = {
  title: "",
  description: "",
  priority: "Medium",
  status: "To Do",
  recurrence: "None",
  recurrenceCount: 1,
  assignedTo: 0,
  dueDate: "",
};

const TaskForm = ({
  users,
  projects = [],
  selectedProjectId,
  initialValues,
  onSubmit,
  submitLabel = "Create Task",
  className = "",
}: TaskFormProps) => {
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  const startingValues = useMemo<TaskFormValues>(
    () => ({ ...defaultValues, ...initialValues }),
    [initialValues]
  );

  const [formValues, setFormValues] = useState<TaskFormValues>(startingValues);
  const [error, setError] = useState<string>("");
  const [projectId, setProjectId] = useState<number | "">(
    selectedProjectId !== undefined
      ? Number(selectedProjectId)
      : projects[0]?.id !== undefined
      ? Number(projects[0].id)
      : ""
  );
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.title.trim()) {
      setError("Task title is required.");
      titleInputRef.current?.focus();
      return;
    }

    setError("");
    setSuccess("Task added successfully.");
    onSubmit({
      ...formValues,
      title: formValues.title.trim(),
      description: (formValues.description || "").trim(),
      recurrenceCount:
        formValues.recurrence && formValues.recurrence !== "None"
          ? Math.max(1, Number(formValues.recurrenceCount || 1))
          : 1,
      projectId: projectId === "" ? undefined : Number(projectId),
    });

    setFormValues({
      ...defaultValues,
      status: formValues.status,
      priority: formValues.priority,
      recurrence: "None",
      recurrenceCount: 1,
      assignedTo: formValues.assignedTo,
      dueDate: "",
      description: "",
      title: "",
    });

    if (titleInputRef.current) {
      titleInputRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-xl border border-emerald-100 bg-white p-5 shadow-sm ${className}`}
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Create Task</h2>
      </div>

      {error ? (
        <div
          className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {success}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.length > 0 ? (
          <label className="flex flex-col gap-1 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Project</span>
            <select
              value={projectId}
              onChange={(event) =>
                setProjectId(event.target.value === "" ? "" : Number(event.target.value))
              }
              className="rounded-lg border border-emerald-100 bg-white px-3 py-2 outline-none ring-emerald-500 transition focus:ring-2"
            >
              <option value="">No project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Task Title</span>
          <input
            ref={titleInputRef}
            autoFocus
            type="text"
            value={formValues.title}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                title: event.target.value,
              }))
            }
            placeholder="e.g. Build task timeline"
            className="rounded-lg border border-emerald-100 px-3 py-2 outline-none ring-emerald-500 transition focus:ring-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Due Date</span>
          <input
            type="date"
            value={formValues.dueDate}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                dueDate: event.target.value,
              }))
            }
            className="rounded-lg border border-emerald-100 px-3 py-2 outline-none ring-emerald-500 transition focus:ring-2"
          />
        </label>

        <label className="flex flex-col gap-1 md:col-span-2">
          <span className="text-sm font-medium text-slate-700">Description</span>
          <textarea
            value={formValues.description}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            rows={4}
            placeholder="Describe the expected outcome..."
            className="resize-none rounded-lg border border-emerald-100 px-3 py-2 outline-none ring-emerald-500 transition focus:ring-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Priority</span>
          <select
            value={formValues.priority}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                priority: event.target.value as Task["priority"],
              }))
            }
            className="rounded-lg border border-emerald-100 bg-white px-3 py-2 outline-none ring-emerald-500 transition focus:ring-2"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Status</span>
          <select
            value={formValues.status}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                status: event.target.value as Task["status"],
              }))
            }
            className="rounded-lg border border-emerald-100 bg-white px-3 py-2 outline-none ring-emerald-500 transition focus:ring-2"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Completed">Completed</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Recurrence</span>
          <select
            value={formValues.recurrence || "None"}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                recurrence: event.target.value as Task["recurrence"],
                recurrenceCount:
                  event.target.value === "None"
                    ? 1
                    : Math.max(2, Number(current.recurrenceCount || 2)),
              }))
            }
            className="rounded-lg border border-emerald-100 bg-white px-3 py-2 outline-none ring-emerald-500 transition focus:ring-2"
          >
            <option value="None">None</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </label>

        {formValues.recurrence && formValues.recurrence !== "None" ? (
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-slate-700">Occurrences</span>
            <input
              type="number"
              min={2}
              max={30}
              value={Number(formValues.recurrenceCount || 2)}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  recurrenceCount: Math.max(2, Math.min(30, Number(event.target.value || 2))),
                }))
              }
              className="rounded-lg border border-emerald-100 px-3 py-2 outline-none ring-emerald-500 transition focus:ring-2"
            />
          </label>
        ) : null}

        <label className="flex flex-col gap-1 md:col-span-2">
          <span className="text-sm font-medium text-slate-700">Assignee</span>
          <select
            value={formValues.assignedTo || ""}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                assignedTo: Number(event.target.value),
              }))
            }
            className="rounded-lg border border-emerald-100 bg-white px-3 py-2 outline-none ring-emerald-500 transition focus:ring-2"
          >
            <option value="" disabled>
              Select assignee
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} - {user.role}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
