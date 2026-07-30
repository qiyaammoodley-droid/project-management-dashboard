import {
  FolderKanban,
  CheckSquare,
  Users,
  Clock3,
  Plus,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import StatCard from "../components/ui/StatCard";

import ProjectAnalytics from "../components/dashboard/ProjectAnalytics";
import RecentProjects from "../components/dashboard/RecentProjects";
import UpcomingTasks from "../components/dashboard/UpcomingTasks";
import TeamPerformance from "../components/dashboard/TeamPerformance";

const Dashboard = () => {
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
          value="186"
          change="+24 tasks"
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
          value="8"
          change="-2 from last week"
          positive={false}
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