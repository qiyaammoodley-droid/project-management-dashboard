import {
  FolderKanban,
  CheckSquare,
  Users,
  Clock3,
  Plus,
  Upload,
} from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import StatCard from "../components/ui/StatCard";
import useProjects from "../hooks/useProjects";

import ProjectAnalytics from "../components/dashboard/ProjectAnalytics";
import RecentProjects from "../components/dashboard/RecentProjects";
import UpcomingTasks from "../components/dashboard/UpcomingTasks";
import TeamPerformance from "../components/dashboard/TeamPerformance";

const Dashboard = () => {
  const navigate = useNavigate();

  const { projects, importProjects } = useProjects();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const importedProjects = JSON.parse(
          reader.result as string
        );

        importProjects(importedProjects);

        alert(
          `${importedProjects.length} projects imported successfully.`
        );
      } catch {
        alert("Invalid JSON file.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <MainLayout>
      <PageHeader
        title="Dashboard"
        subtitle="Plan, prioritize, and accomplish your tasks with ease."
        action={
          <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
            <Button onClick={() => navigate("/projects/new")} className="w-full sm:w-auto">
              <Plus size={16} />
              Add Project
            </Button>

            <Button
              variant="outline"
              onClick={handleImportClick}
              className="w-full sm:w-auto"
            >
              <Upload size={16} />
              Import Data
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json,.csv"
              className="hidden"
              onChange={handleFileSelected}
            />
          </div>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          featured
          title="Total Projects"
          value={projects.length}
          change="Live project count"
          icon={<FolderKanban size={28} />}
        />

        <StatCard
          title="Completed Projects"
          value={
            projects.filter(
              (project) => project.status === "Completed"
            ).length
          }
          change="Completed successfully"
          icon={<CheckSquare size={28} />}
        />

        <StatCard
          title="Running Projects"
          value={
            projects.filter(
              (project) => project.status === "In Progress"
            ).length
          }
          change="Currently active"
          icon={<Users size={28} />}
        />

        <StatCard
          title="Pending Projects"
          value={
            projects.filter(
              (project) =>
                project.status === "To Do" ||
                project.status === "In Review"
            ).length
          }
          change="Awaiting completion"
          positive={false}
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