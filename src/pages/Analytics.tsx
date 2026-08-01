import {
  FolderKanban,
  CheckSquare,
  Users,
  Clock3,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
} from "recharts";

import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import Card from "../components/ui/Card";

import useProjects from "../hooks/useProjects";
import useTasks from "../hooks/useTasks";

const COLORS = ["#10B981", "#8B5CF6", "#F59E0B", "#EF4444"];

const Analytics = () => {
  const { projects = [] } = useProjects();
  const { tasks = [] } = useTasks();

  const completedProjects = projects.filter((p) => p.status === "Completed").length;
  const runningProjects = projects.filter((p) => p.status === "In Progress").length;
  const pendingProjects = projects.filter(
    (p) => p.status === "To Do" || p.status === "In Review"
  ).length;

  const averageProgress =
    projects.length > 0
      ? Math.round(
          projects.reduce((sum, project) => sum + (project.progress || 0), 0) /
            projects.length
        )
      : 0;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const pendingTasks = tasks.filter((t) => t.status !== "Completed").length;

  const totalTeamMembers = projects.reduce(
    (sum, project) => sum + (project.teamMembers?.length || 0),
    0
  );

  const pieData = [
    { name: "Completed", value: completedProjects },
    { name: "Running", value: runningProjects },
    { name: "Pending", value: pendingProjects },
  ];

  const progressData = projects.map((project) => ({
    name:
      project.name && project.name.length > 8
        ? project.name.slice(0, 8) + "..."
        : project.name || "Untitled",
    progress: project.progress || 0,
  }));

  return (
    <MainLayout>
      <PageHeader title="Analytics" subtitle="Live insights into your projects." />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          featured
          title="Projects"
          value={projects.length}
          change="Total projects"
          icon={<FolderKanban size={28} />}
        />
        <StatCard
          title="Completed"
          value={completedProjects}
          change="Successfully delivered"
          icon={<CheckSquare size={28} />}
        />
        <StatCard
          title="Tasks"
          value={totalTasks}
          change={`${completedTasks} completed`}
          icon={<Users size={28} />}
        />
        <StatCard
          title="Average Progress"
          value={`${averageProgress}%`}
          change="Overall completion"
          icon={<Clock3 size={28} />}
        />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <h2 className="text-xl font-bold">Project Status</h2>
          <div className="mt-6 h-72">
            {projects.length === 0 ? (
              <p className="text-sm text-slate-500">No projects created yet.</p>
            ) : (
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={90} label>
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold">Project Progress</h2>
          <div className="mt-6 h-72">
            {projects.length === 0 ? (
              <p className="text-sm text-slate-500">No projects created yet.</p>
            ) : (
              <ResponsiveContainer>
                <BarChart data={progressData}>
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#10B981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <h2 className="text-xl font-bold mb-4">Team Overview</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Members</span>
              <strong>{totalTeamMembers}</strong>
            </div>
            <div className="flex justify-between">
              <span>Completed Tasks</span>
              <strong>{completedTasks}</strong>
            </div>
            <div className="flex justify-between">
              <span>Pending Tasks</span>
              <strong>{pendingTasks}</strong>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {projects.length === 0 ? (
              <p className="text-sm text-slate-500">No recent activity.</p>
            ) : (
              projects.slice(0, 5).map((project) => (
                <div key={project.id} className="rounded-xl border border-slate-200 p-3">
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-sm text-slate-500">{project.status}</p>
                </div>
              ))
            )}
          </div>
        </Card>
      </section>
    </MainLayout>
  );
};

export default Analytics;