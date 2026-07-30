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
import ProjectProgress from "../components/dashboard/ProjectProgress";
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

      {/* Stats */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
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

      {/* Dashboard Widgets */}
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <ProjectProgress />
        <TeamPerformance />
      </section>
    </MainLayout>
  );
};

export default Dashboard;