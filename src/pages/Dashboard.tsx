import {
  FolderKanban,
  CheckSquare,
  Users,
  Clock3,
  Plus,
  Upload,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import StatCard from "../components/ui/StatCard";
import useProjects from "../hooks/useProjects";
import useTasks from "../hooks/useTasks";

import ProjectAnalytics from "../components/dashboard/ProjectAnalytics";
import RecentProjects from "../components/dashboard/RecentProjects";
import UpcomingTasks from "../components/dashboard/UpcomingTasks";
import TeamPerformance from "../components/dashboard/TeamPerformance";

const Dashboard = () => {
  const navigate = useNavigate();
  const { projects } = useProjects();
  const { tasks } = useTasks();

  return (
    <MainLayout>
      <PageHeader
        title="Dashboard"
        subtitle="Plan, prioritize, and accomplish your tasks with ease."
        action={
          <div className="flex items-center gap-3">
            <Button onClick={() => navigate("/projects/new")}>
              <Plus size={16} />
              Add Project
            </Button>
            <Button variant="outline">
              <Upload size={16} />
              Import Data
            </Button>
          </div>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          featured
          title="Total Projects"
          value={projects.length}
          change={projects.length ? "Live project count" : "No projects yet"}
          icon={<FolderKanban size={28} />}
        />

        <StatCard
          title="Ended Projects"
          value={10}
          change="Increased from last month"
          icon={<CheckSquare size={28} />}
        />

        <StatCard
          title="Running Projects"
          value="12"
          change="Increased from last month"
          icon={<Users size={28} />}
        />

        <StatCard
          title="Pending Project"
          value={tasks.length}
          change={tasks.length ? "Live task count" : "On Discuss"}
          positive
          icon={<Clock3 size={28} />}
        />
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <ProjectAnalytics />
          <RecentProjects />
        </div>

        <div className="space-y-4">
          <TeamPerformance />
          <UpcomingTasks />
        </div>
      </section>
    </MainLayout>
  );
};

export default Dashboard;