import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import useProjects from "../hooks/useProjects";
import useTasks from "../hooks/useTasks";
import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import StatusFilter from "../components/projects/StatusFilter";
import ProjectCard from "../components/projects/ProjectCard";
import type { StatusFilterOption } from "../types/project";

const Projects = () => {
  const navigate = useNavigate();
  const { projects, isReady, deleteProject } = useProjects();
  const { deleteTasksByProjectId } = useTasks();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>("All");

  const handleDeleteProject = (projectId: number | string) => {
    const shouldDelete = window.confirm(
      "Delete this project? All tasks linked to it will also be deleted."
    );

    if (!shouldDelete) {
      return;
    }

    deleteProject(projectId);
    deleteTasksByProjectId(projectId);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());

      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  return (
    <MainLayout>
      <PageHeader
        title="Projects"
        subtitle="Create and manage your project containers"
        action={
          <Button onClick={() => navigate("/projects/new")} className="w-full sm:w-auto">
            <Plus size={16} />
            Add Project
          </Button>
        }
      />

      <div className="mb-5 flex flex-col gap-3">
        <div className="w-full">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search projects by name..."
          />
        </div>
        <div className="w-full sm:w-auto">
          <StatusFilter value={statusFilter} onChange={setStatusFilter} />
        </div>
      </div>

      {!isReady ? (
        <Card className="border-emerald-100">
          <p className="text-sm text-slate-600">Loading projects...</p>
        </Card>
      ) : !projects.length ? (
        <Card className="border-emerald-100">
          <h2 className="text-xl font-semibold text-slate-900">No Projects Yet</h2>
          <p className="mt-2 text-sm text-slate-500">
            Create a project first, then add tasks under that project.
          </p>
          <Button onClick={() => navigate("/projects/new")} className="mt-5">
            Create Project
          </Button>
        </Card>
      ) : !filteredProjects.length ? (
        <Card className="border-emerald-100">
          <h2 className="text-xl font-semibold text-slate-900">No matching projects</h2>
          <p className="mt-2 text-sm text-slate-500">
            Try a different search term or status filter.
          </p>
        </Card>
      ) : (
        <section className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDeleteProject}
            />
          ))}
        </section>
      )}
    </MainLayout>
  );
};

export default Projects;