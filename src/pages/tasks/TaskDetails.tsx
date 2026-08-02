import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();
  const { tasks, isReady, addTask, deleteTask, updateTaskStatus } = useTasks();
  const { projects } = useProjects();

  const [error] = useState<string | null>(null);
  const selectedTaskId = id ? Number(id) : null;
  const activeQuery = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return (params.get("q") || "").trim().toLowerCase();
  }, [location.search]);

  const rowTasks = useMemo(
    () => [...tasks].sort((a: Task, b: Task) => Number(b.id) - Number(a.id)),
    [tasks]
  );

  const filteredTasks = useMemo(() => {
    if (!activeQuery) {
      return rowTasks;
    }

    return rowTasks.filter((task) => {
      const assigneeName =
        users.find((user) => user.id === task.assignedTo)?.name.toLowerCase() || "";

      return (
        task.title.toLowerCase().includes(activeQuery) ||
        (task.description || "").toLowerCase().includes(activeQuery) ||
        task.status.toLowerCase().includes(activeQuery) ||
        task.priority.toLowerCase().includes(activeQuery) ||
        assigneeName.includes(activeQuery)
      );
    });
  }, [activeQuery, rowTasks]);

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

  const handleDeleteTask = (taskId: number | string) => {
    const shouldDelete = window.confirm("Delete this task?");

    if (!shouldDelete) {
      return;
    }

    deleteTask(taskId);
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
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5 xl:gap-6">
        <section className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-5 xl:col-span-3 xl:p-6">
          <div className="mb-4">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Task List</h1>
            <p className="mt-1 text-sm text-slate-500">
              All added tasks appear here as rows.
            </p>
          </div>

          {activeQuery ? (
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-100 bg-emerald-50/40 px-3 py-2 text-xs text-emerald-800">
              <p>
                Filtered by: <span className="font-semibold">{activeQuery}</span>
              </p>
              <button
                type="button"
                onClick={() => navigate("/tasks")}
                className="rounded-full border border-emerald-200 px-3 py-1 font-semibold hover:bg-emerald-100"
              >
                Clear
              </button>
            </div>
          ) : null}

          <div className="mt-3 space-y-2 xl:hidden">
            {filteredTasks.map((task) => {
              const assignee = users.find((user) => user.id === task.assignedTo);

              return (
                <div
                  key={task.id}
                  className={`grid grid-cols-1 gap-2 rounded-xl border px-3 py-3 sm:px-4 ${
                    selectedTaskId === task.id
                      ? "border-emerald-300 bg-emerald-50/30"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => navigate(`/tasks/${task.id}`)}
                    className="text-left"
                  >
                    <p className="font-semibold text-slate-900">{task.title}</p>
                    <p className="text-xs text-slate-500">
                      {assignee?.name || "Unassigned"} · {formatShortDate(task.dueDate)}
                    </p>
                  </button>

                  <div className="min-w-0">
                    <select
                      value={task.status}
                      onChange={(event) =>
                        handleRowStatusChange(task, event.target.value as Task["status"])
                      }
                      className={`w-full rounded-lg border border-emerald-100 bg-white px-2 py-1.5 text-xs font-semibold outline-none ${statusStyles[task.status]}`}
                    >
                      {getAllowedStatuses(task).map((status) => (
                        <option key={`${task.id}-${status}`} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full border px-2 py-1 text-[11px] font-semibold ${priorityStyles[task.priority]}`}
                    >
                      {task.priority}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleDeleteTask(task.id)}
                      className="rounded-full border border-rose-200 px-2 py-1 text-[11px] font-semibold text-rose-600 transition hover:bg-rose-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 hidden xl:block">
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-[760px] w-full table-fixed bg-white">
                <thead>
                  <tr className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-3 text-left w-[32%]">Task</th>
                    <th className="px-3 py-3 text-left w-[20%]">Assignee</th>
                    <th className="px-3 py-3 text-left w-[14%]">Due Date</th>
                    <th className="px-3 py-3 text-left w-[20%]">Status</th>
                    <th className="px-3 py-3 text-left w-[14%]">Priority</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTasks.map((task) => {
                    const assignee = users.find((user) => user.id === task.assignedTo);

                    return (
                      <tr
                        key={task.id}
                        className={`border-t border-slate-200 align-middle ${
                          selectedTaskId === task.id ? "bg-emerald-50/40" : "bg-white"
                        }`}
                      >
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => navigate(`/tasks/${task.id}`)}
                            className="line-clamp-2 text-left font-semibold text-slate-900 hover:text-emerald-700"
                          >
                            {task.title}
                          </button>
                        </td>

                        <td className="truncate px-3 py-3 text-sm text-slate-700">
                          {assignee?.name || "Unassigned"}
                        </td>

                        <td className="px-3 py-3 text-sm text-slate-700">
                          {formatShortDate(task.dueDate)}
                        </td>

                        <td className="px-3 py-3">
                          <select
                            value={task.status}
                            onChange={(event) =>
                              handleRowStatusChange(task, event.target.value as Task["status"])
                            }
                            className={`w-full rounded-lg border border-emerald-100 bg-white px-2 py-1.5 text-xs font-semibold outline-none ${statusStyles[task.status]}`}
                          >
                            {getAllowedStatuses(task).map((status) => (
                              <option key={`${task.id}-${status}`} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="px-3 py-3">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`inline-flex whitespace-nowrap rounded-full border px-2 py-1 text-[11px] font-semibold ${priorityStyles[task.priority]}`}
                            >
                              {task.priority}
                            </span>

                            <button
                              type="button"
                              onClick={() => handleDeleteTask(task.id)}
                              className="rounded-full border border-rose-200 px-2 py-1 text-[11px] font-semibold text-rose-600 transition hover:bg-rose-50"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/40 p-3 text-xs text-emerald-800">
            Total tasks: {filteredTasks.length}
          </div>
        </section>

        <section className="xl:col-span-2">
          <TaskForm users={users} projects={projects} onSubmit={handleCreateTask} />
        </section>
      </div>
    </MainLayout>
  );
};

export default TaskDetails;
