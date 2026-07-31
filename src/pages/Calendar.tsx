import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import useTasks from "../hooks/useTasks";
import useProjects from "../hooks/useProjects";
import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/ui/PageHeader";
import type { Task, TaskPriority, TaskStatus } from "../types/task";

type StatusFilter = "All" | TaskStatus;
type PriorityFilter = "All" | TaskPriority;
type ProjectFilter = "All" | string;

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CalendarPage = () => {
  const { tasks } = useTasks();
  const { projects } = useProjects();

  const [monthCursor, setMonthCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [selectedDateKey, setSelectedDateKey] = useState<string>(() => toDateKey(new Date()));
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("All");
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("All");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (!task.dueDate) {
        return false;
      }

      const statusPass = statusFilter === "All" || task.status === statusFilter;
      const priorityPass = priorityFilter === "All" || task.priority === priorityFilter;
      const projectPass =
        projectFilter === "All" || String(task.projectId ?? "") === String(projectFilter);

      return statusPass && priorityPass && projectPass;
    });
  }, [tasks, statusFilter, priorityFilter, projectFilter]);

  const tasksByDate = useMemo(() => {
    const map = new Map<string, Task[]>();

    filteredTasks.forEach((task) => {
      const list = map.get(task.dueDate as string) ?? [];
      list.push(task);
      map.set(task.dueDate as string, list);
    });

    return map;
  }, [filteredTasks]);

  const selectedDateTasks = useMemo(
    () => tasksByDate.get(selectedDateKey) ?? [],
    [tasksByDate, selectedDateKey]
  );

  const monthMeta = useMemo(() => {
    const year = monthCursor.getFullYear();
    const month = monthCursor.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const leadingEmpty = firstDay.getDay();
    const cells: Array<{ key: string; day: number; isCurrentMonth: boolean }> = [];

    for (let i = 0; i < leadingEmpty; i += 1) {
      cells.push({ key: `empty-${i}`, day: 0, isCurrentMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const dateKey = toDateKey(new Date(year, month, day));
      cells.push({ key: dateKey, day, isCurrentMonth: true });
    }

    while (cells.length % 7 !== 0) {
      cells.push({ key: `tail-${cells.length}`, day: 0, isCurrentMonth: false });
    }

    return { year, month, cells };
  }, [monthCursor]);

  return (
    <MainLayout>
      <PageHeader
        title="Calendar"
        subtitle="Click any date to see tasks, and filter by status, priority, or project"
      />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setMonthCursor(
                    (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1)
                  )
                }
                className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={() =>
                  setMonthCursor(
                    (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1)
                  )
                }
                className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              {monthCursor.toLocaleString("en-US", { month: "long", year: "numeric" })}
            </h2>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-2">
            {dayLabels.map((label) => (
              <div key={label} className="text-center text-xs font-semibold uppercase text-slate-400">
                {label}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {monthMeta.cells.map((cell) => {
              if (!cell.isCurrentMonth) {
                return (
                  <div
                    key={cell.key}
                    className="min-h-[84px] rounded-xl border border-transparent bg-slate-50/50"
                  />
                );
              }

              const dayTaskCount = (tasksByDate.get(cell.key) ?? []).length;
              const isSelected = selectedDateKey === cell.key;

              return (
                <button
                  type="button"
                  key={cell.key}
                  onClick={() => setSelectedDateKey(cell.key)}
                  className={`min-h-[84px] rounded-xl border p-2 text-left transition ${
                    isSelected
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-slate-200 bg-white hover:border-emerald-200"
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-800">{cell.day}</p>
                  {dayTaskCount > 0 ? (
                    <span className="mt-2 inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      {dayTaskCount} task{dayTaskCount > 1 ? "s" : ""}
                    </span>
                  ) : (
                    <p className="mt-2 text-xs text-slate-400">No tasks</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <aside className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Task Panel</h3>

          <div className="mt-4 space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase text-slate-500">Status</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              >
                <option value="All">All</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase text-slate-500">Priority</span>
              <select
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value as PriorityFilter)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              >
                <option value="All">All</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase text-slate-500">Project</span>
              <select
                value={projectFilter}
                onChange={(event) => setProjectFilter(event.target.value as ProjectFilter)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              >
                <option value="All">All Projects</option>
                {projects.map((project) => (
                  <option key={project.id} value={String(project.id)}>
                    {project.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 p-3">
            <p className="text-sm font-semibold text-slate-800">
              Selected Date: {selectedDateKey}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {selectedDateTasks.length} task{selectedDateTasks.length === 1 ? "" : "s"} found
            </p>
          </div>

          <div className="mt-4 space-y-2">
            {selectedDateTasks.length ? (
              selectedDateTasks.map((task) => (
                <div key={String(task.id)} className="rounded-xl border border-slate-200 px-3 py-2">
                  <p className="text-sm font-semibold text-slate-900">{task.title}</p>
                  <p className="text-xs text-slate-500">
                    {task.status} · {task.priority}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No tasks for this date and filter.</p>
            )}
          </div>
        </aside>
      </section>
    </MainLayout>
  );
};

export default CalendarPage;
