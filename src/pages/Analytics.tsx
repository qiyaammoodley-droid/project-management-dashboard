import { useMemo } from "react";
import { BarChart3, CheckCircle2, Clock, FolderKanban, Users } from "lucide-react";

import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import useTasks from "../hooks/useTasks";
import useProjects from "../hooks/useProjects";

const Analytics = () => {
  const { tasks = [] } = useTasks();
  const { projects = [] } = useProjects();

  // Safe metrics calculation
  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter((t) => t.status === "Completed")?.length || 0;
  const inProgressTasks = tasks?.filter((t) => t.status === "In Progress")?.length || 0;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const totalProjects = projects?.length || 0;
  const completedProjects = projects?.filter((p) => p.status === "Completed")?.length || 0;

  return (
    <MainLayout>
      <PageHeader
        title="Project Analytics"
        subtitle="Live project progress, task completion metrics, and team workload."
      />

      {/* Top Metrics Grid */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          icon={<CheckCircle2 size={22} />}
          change={`${completedTasks} completed`}
          positive={true}
        />
        <StatCard
          title="Completion Rate"
          value={`${completionRate}%`}
          icon={<BarChart3 size={22} />}
          change="Overall task output"
          positive={true}
        />
        <StatCard
          title="Active Projects"
          value={totalProjects}
          icon={<FolderKanban size={22} />}
          change={`${completedProjects} finished`}
          positive={true}
        />
        <StatCard
          title="In Progress"
          value={inProgressTasks}
          icon={<Clock size={22} />}
          change="Tasks currently underway"
          positive={true}
        />
      </section>

      {/* Detailed Breakdown Section */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Project Status Breakdown */}
        <Card>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Projects Overview</h3>
          <div className="space-y-4">
            {projects.length === 0 ? (
              <p className="text-sm text-slate-500">No projects created yet.</p>
            ) : (
              projects.map((project) => (
                <div key={String(project.id)} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-slate-800">{project.name}</p>
                    <p className="text-xs text-slate-400">Deadline: {project.deadline || "No deadline"}</p>
                  </div>
                  <Badge status={project.status} />
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Team Activity Summary */}
        <Card>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">AI Engineering Team</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold">
                <Users size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">5 Active AI Engineers</p>
                <p className="text-xs text-slate-500">Noluthando, Qiyaam, Nyiko, Thandokuhle, Tswarelo</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              All team members are assigned across active development pipelines and task boards.
            </p>
          </div>
        </Card>
      </section>
    </MainLayout>
  );
};

export default Analytics;