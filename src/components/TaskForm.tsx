import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { Task } from "../types/task";
import type { User } from "../types/user";

type TaskFormValues = Omit<Task, "id" | "projectId">;

type TaskFormProps = {
  users: User[];
  initialValues?: Partial<TaskFormValues>;
  onSubmit: (values: TaskFormValues) => void;
  submitLabel?: string;
  className?: string;
};

const defaultValues: TaskFormValues = {
  title: "",
  description: "",
  priority: "Medium",
  status: "To Do",
  assignedTo: 0,
  dueDate: "",
};

const TaskForm = ({
  users,
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
    onSubmit({
      ...formValues,
      title: formValues.title.trim(),
      description: formValues.description.trim(),
    });
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                {user.name} ({user.role})
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
