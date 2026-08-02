import { useMemo, useState } from "react";

import Card from "../ui/Card";
import useProjects from "../../hooks/useProjects";
import useTasks from "../../hooks/useTasks";
import {
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { ProjectStatus } from "../../types/project";

type StatusFilter = "All" | ProjectStatus;

const statusFilters: StatusFilter[] = [
  "All",
  "To Do",
  "In Progress",
  "In Review",
  "Completed",
];

const clampProgress = (value: unknown) => {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return null;
  }

  return Math.min(100, Math.max(0, numeric));
};

const truncateName = (name: string) =>
  name.length > 14 ? `${name.slice(0, 14)}...` : name;

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { fullName: string; progress: number; status: string } }> }) => {
  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0].payload;

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-sm font-semibold text-slate-900">{point.fullName}</p>
      <p className="text-xs text-slate-500">Status: {point.status}</p>
      <p className="mt-1 text-sm font-semibold text-emerald-700">{point.progress}% progress</p>
    </div>
  );
};

const ProjectAnalytics = () => {
  const { projects } = useProjects();
  const { tasks } = useTasks();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const todayKey = new Date().toISOString().slice(0, 10);

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (project) => statusFilter === "All" || project.status === statusFilter
      ),
    [projects, statusFilter]
  );

  const analyticsRows = useMemo(() => {
    return filteredProjects.map((project) => {
      const directProgress = clampProgress(project.progress);
      const relatedTasks = tasks.filter(
        (task) => Number(task.projectId) === Number(project.id)
      );

      const derivedProgress = relatedTasks.length
        ? Math.round(
            (relatedTasks.filter((task) => task.status === "Completed").length /
              relatedTasks.length) *
              100
          )
        : 0;

      const progress =
        relatedTasks.length > 0
          ? derivedProgress
          : directProgress ?? 0;

      const overdue =
        Boolean(project.deadline) &&
        String(project.deadline) < todayKey &&
        project.status !== "Completed";

      return {
        id: project.id,
        fullName: project.name,
        name: truncateName(project.name),
        status: project.status,
        progress,
        overdue,
      };
    });
  }, [filteredProjects, tasks, todayKey]);

  const chartData: Array<{
    id: number | string;
    fullName: string;
    name: string;
    status: ProjectStatus;
    progress: number;
    overdue: boolean;
  }> = analyticsRows.length
    ? analyticsRows
    : [
        {
          id: "empty",
          fullName: "No Projects",
          name: "No Projects",
          status: "To Do",
          progress: 0,
          overdue: false,
        },
      ];

  const averageProgress = analyticsRows.length
    ? Math.round(
        analyticsRows.reduce((sum, item) => sum + item.progress, 0) /
          analyticsRows.length
      )
    : 0;

  const completedCount = analyticsRows.filter(
    (item) => item.status === "Completed"
  ).length;

  const overdueCount = analyticsRows.filter((item) => item.overdue).length;

  return (
    <Card className="border-slate-200">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Project Analytics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Live project progress and risk signals
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setStatusFilter(filter)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                statusFilter === filter
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Projects</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{analyticsRows.length}</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Avg Progress</p>
          <p className="mt-1 text-xl font-bold text-emerald-700">{averageProgress}%</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Completed</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{completedCount}</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Overdue</p>
          <p className="mt-1 text-xl font-bold text-rose-600">{overdueCount}</p>
        </div>
      </div>

      <div className="mt-5 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />

            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />

            <Tooltip cursor={{ fill: "rgba(15, 118, 110, 0.08)" }} content={<CustomTooltip />} />

            <Bar
              dataKey="progress"
              radius={[16, 16, 0, 0]}
              fill="#0f7a57"
              minPointSize={4}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {!analyticsRows.length ? (
        <p className="mt-2 text-sm text-slate-500">
          No projects available for the selected status filter.
        </p>
      ) : null}
    </Card>
  );
};

export default ProjectAnalytics;