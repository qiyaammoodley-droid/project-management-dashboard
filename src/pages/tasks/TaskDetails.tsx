import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TaskForm from "../../components/TaskForm";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { users } from "../../data/users";
import useTasks from "../../hooks/useTasks";
import useProjects from "../../hooks/useProjects";
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

const statusStyles: Record<Task["status"], string> = {
  "To Do": "text-slate-600",
  "In Progress": "text-emerald-700",
  "In Review": "text-amber-700",
  Completed: "text-emerald-800",
};

const formatShortDate = (value?: string) => {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "-";
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
};

const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, isReady, addTask, updateTaskStatus } = useTasks();
  const { projects } = useProjects();

  const [error] = useState<string | null>(null);
  const selectedTaskId = id ? Number(id) : null;

  const rowTasks = useMemo(
    () => [...tasks].sort((a: Task, b: Task) => Number(b.id) - Number(a.id)),
    [tasks]
  );

  const getAllowedStatuses = (task: Task): Task["status"][] => {
    const currentIndex = STATUS_FLOW.indexOf(task.status);
    if (currentIndex < 0) {
      return STATUS_FLOW;
    }

    const nextStatus = STATUS_FLOW[currentIndex + 1];
    return nextStatus ? [task.status, nextStatus] : [task.status];
  };

  const handleRowStatusChange = (task: Task, nextStatus: Task["status"]) => {
    const currentIndex = STATUS_FLOW.indexOf(task.status);
    const nextIndex = STATUS_FLOW.indexOf(nextStatus);

    if (nextIndex !== currentIndex && nextIndex !== currentIndex + 1) {
      return;
    }

    const taskId = Number(task.id);
    updateTaskStatus(taskId, nextStatus);
  };

  const handleCreateTask = (
    values: Omit<Task, "id" | "projectId"> & { projectId?: number }
  ) => {
    addTask({ ...values });
  };

  if (!isReady) {
    return (
      <MainLayout>
        <section className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-6">
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
        <section className="rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-red-700">Error loading tasks</h2>
          <p className="mt-2 text-sm text-red-600">{error}</p>
        </section>
      </MainLayout>
    );
  }

  if (!tasks.length) {
    return (
      <MainLayout>
        <section className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Create Your First Task</h1>
            <p className="mt-2 text-sm text-slate-500">
              Start by adding a task and it will appear in rows below.
            </p>
          </div>
          <TaskForm users={users} projects={projects} onSubmit={handleCreateTask} />
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-6">
        <section className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-5 lg:col-span-3 lg:p-6">
          <div className="mb-4">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Task List</h1>
            <p className="mt-1 text-sm text-slate-500">
              All added tasks appear here as rows.
            </p>
          </div>

          <div className="hidden grid-cols-12 gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 md:grid">
            <p className="col-span-4">Task</p>
            <p className="col-span-2">Assignee</p>
            <p className="col-span-2">Due Date</p>
            <p className="col-span-2">Status</p>
            <p className="col-span-2">Priority</p>
          </div>

          <div className="mt-3 space-y-2">
            {rowTasks.map((task) => {
              const assignee = users.find((user) => user.id === task.assignedTo);

              return (
                <div
                  key={task.id}
                  className={`grid grid-cols-1 gap-2 rounded-xl border px-3 py-3 sm:px-4 md:grid-cols-12 md:items-center md:gap-3 ${
                    selectedTaskId === task.id
                      ? "border-emerald-300 bg-emerald-50/30"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => navigate(`/tasks/${task.id}`)}
                    className="col-span-4 text-left"
                  >
                    <p className="font-semibold text-slate-900">{task.title}</p>
                    <p className="text-xs text-slate-500 md:hidden">
                      {assignee?.name || "Unassigned"} · {formatShortDate(task.dueDate)}
                    </p>
                  </button>

                  <p className="col-span-2 hidden text-sm text-slate-700 md:block">
                    {assignee?.name || "Unassigned"}
                  </p>

                  <p className="col-span-2 hidden text-sm text-slate-700 md:block">
                    {formatShortDate(task.dueDate)}
                  </p>

                  <div className="col-span-2 min-w-0 md:max-w-[180px]">
                    <select
                      value={task.status}
                      onChange={(event) =>
                        handleRowStatusChange(task, event.target.value as Task["status"])
                      }
                      className={`w-full rounded-lg border border-emerald-100 bg-white px-2 py-1.5 text-xs font-semibold outline-none md:text-[11px] ${statusStyles[task.status]}`}
                    >
                      {getAllowedStatuses(task).map((status) => (
                        <option key={`${task.id}-${status}`} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2 min-w-0 md:text-right">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full border px-2 py-1 text-[11px] font-semibold ${priorityStyles[task.priority]}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/40 p-3 text-xs text-emerald-800">
            Total tasks: {rowTasks.length}
          </div>
        </section>

        <section className="lg:col-span-2">
          <TaskForm users={users} projects={projects} onSubmit={handleCreateTask} />
        </section>
      </div>
    </MainLayout>
  );
};

export default TaskDetails;
