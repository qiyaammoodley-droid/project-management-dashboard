import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TaskForm from "../../components/TaskForm";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { users } from "../../data/users";
import useTasks from "../../hooks/useTasks";
import MainLayout from "../../layouts/MainLayout";
import type { Task } from "../../types/task";

const STATUS_FLOW: Task["status"][] = [
  "To Do",
  "In Progress",
  "In Review",
  "Completed",
];

const priorityStyles: Record<Task["priority"], string> = {
  Low: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Medium: "border-amber-200 bg-amber-50 text-amber-700",
  High: "border-rose-200 bg-rose-50 text-rose-700",
};

const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, isReady, addTask, updateTaskStatus } = useTasks();

  const [error] = useState<string | null>(null);

  const selectedTaskId = id ? Number(id) : null;

  const currentTask = useMemo(() => {
    if (!tasks.length) {
      return undefined;
    }

    if (!selectedTaskId) {
      return tasks[0];
    }

    return tasks.find((task) => task.id === selectedTaskId);
  }, [tasks, selectedTaskId]);

  const assignee = useMemo(
    () => users.find((user) => user.id === currentTask?.assignedTo),
    [currentTask]
  );

  const allowedStatuses = useMemo<Task["status"][]>(() => {
    if (!currentTask) {
      return STATUS_FLOW;
    }

    const currentIndex = STATUS_FLOW.indexOf(currentTask.status);
    if (currentIndex < 0) {
      return STATUS_FLOW;
    }

    const nextStatus = STATUS_FLOW[currentIndex + 1];
    return nextStatus ? [currentTask.status, nextStatus] : [currentTask.status];
  }, [currentTask]);

  const handleStatusChange = (nextStatus: Task["status"]) => {
    if (!currentTask) {
      return;
    }

    const currentIndex = STATUS_FLOW.indexOf(currentTask.status);
    const nextIndex = STATUS_FLOW.indexOf(nextStatus);

    if (nextIndex !== currentIndex && nextIndex !== currentIndex + 1) {
      return;
    }

    updateTaskStatus(currentTask.id, nextStatus);
  };

  const handleCreateTask = (values: Omit<Task, "id" | "projectId">) => {
    const newTask = addTask({
      ...values,
      projectId: currentTask?.projectId ?? 1,
    });

    navigate(`/tasks/${newTask.id}`);
  };

  if (!isReady) {
    return (
      <MainLayout>
        <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <LoadingSpinner label="Loading task details..." size="lg" />
          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="h-24 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-24 animate-pulse rounded-xl bg-slate-100" />
          </div>
        </section>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <section className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-red-700">Error loading tasks</h2>
          <p className="mt-2 text-sm text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Retry
          </button>
        </section>
      </MainLayout>
    );
  }

  if (!tasks.length) {
    return (
      <MainLayout>
        <section className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Create Your First Task</h1>
            <p className="mt-2 text-sm text-slate-500">
              Start by adding a task and it will appear on your dashboard.
            </p>
          </div>
          <TaskForm users={users} onSubmit={handleCreateTask} />
        </section>
      </MainLayout>
    );
  }

  if (!currentTask) {
    return (
      <MainLayout>
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-amber-800">Task not found</h2>
          <p className="mt-2 text-sm text-amber-700">
            The task you requested does not exist in the current list.
          </p>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm lg:col-span-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="mt-1 text-2xl font-bold text-slate-900">
                {currentTask.title}
              </h1>
              <p className="mt-2 text-sm text-slate-600">{currentTask.description}</p>
            </div>
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${priorityStyles[currentTask.priority]}`}
            >
              {currentTask.priority} Priority
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </p>
              <select
                value={currentTask.status}
                onChange={(event) =>
                  handleStatusChange(event.target.value as Task["status"])
                }
                className="mt-2 w-full rounded-lg border border-emerald-100 bg-white px-3 py-2 text-sm font-medium text-slate-800 outline-none ring-emerald-500 transition focus:ring-2"
              >
                {allowedStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Due Date
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {new Date(currentTask.dueDate).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Assignee
            </p>
            {assignee ? (
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={assignee.avatar}
                  alt={assignee.name}
                  className="h-11 w-11 rounded-full border border-emerald-100 object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{assignee.name}</p>
                  <p className="text-xs text-slate-500">{assignee.role}</p>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-500">-</p>
            )}
          </div>
        </section>

        <section className="lg:col-span-2">
          <TaskForm users={users} onSubmit={handleCreateTask} />
        </section>
      </div>
    </MainLayout>
  );
};

export default TaskDetails;
