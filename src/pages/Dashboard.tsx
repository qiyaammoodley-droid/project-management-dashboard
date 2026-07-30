import {
  FolderKanban,
  CheckSquare,
  Users,
  Clock3,
  Plus,
} from "lucide-react";
import { useMemo } from "react";

import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import StatCard from "../components/ui/StatCard";
import useTasks from "../hooks/useTasks";

import ProjectAnalytics from "../components/dashboard/ProjectAnalytics";
import RecentProjects from "../components/dashboard/RecentProjects";
import UpcomingTasks from "../components/dashboard/UpcomingTasks";
import TeamPerformance from "../components/dashboard/TeamPerformance";

const Dashboard = () => {
  const { tasks } = useTasks();

  const dueThisWeek = useMemo(() => {
    const now = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(now.getDate() + 7);

    return tasks.filter((task) => {
      if (!task.dueDate) {
        return false;
      }

      const due = new Date(task.dueDate);
      return due >= now && due <= weekFromNow;
    }).length;
  }, [tasks]);

  return (
    <MainLayout>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back to Gemini 👋"
        action={
          <Button>
            <Plus size={18} />
            New Project
          </Button>
        }
      />

      <section className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          featured
          title="Projects"
          value="24"
          change="+12% this month"
          icon={<FolderKanban size={28} />}
        />

        <StatCard
          title="Tasks"
          value={tasks.length}
          change={tasks.length ? "Live task count" : "No tasks yet"}
          icon={<CheckSquare size={28} />}
        />

        <StatCard
          title="Team Members"
          value="16"
          change="+3 new members"
          icon={<Users size={28} />}
        />

        <StatCard
          title="Due This Week"
          value={dueThisWeek}
          change={dueThisWeek ? "Upcoming deadlines" : "No upcoming deadlines"}
          positive={dueThisWeek > 0}
          icon={<Clock3 size={28} />}
        />
      </section>

      <section className="mt-10 grid gap-8 xl:grid-cols-3">
        <div className="space-y-8 xl:col-span-2">
          <ProjectAnalytics />
          <RecentProjects />
        </div>

        <div className="space-y-8">
          <TeamPerformance />
          <UpcomingTasks />
        </div>
      </section>
    </MainLayout>
  );
};

export default Dashboard;