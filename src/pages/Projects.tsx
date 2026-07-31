import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import useProjects from "../hooks/useProjects";
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
  const { projects, isReady } = useProjects();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>("All");

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
          <Button onClick={() => navigate("/projects/new")}>
            <Plus size={16} />
            Add Project
          </Button>
        }
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search projects by name..."
        />
        <StatusFilter value={statusFilter} onChange={setStatusFilter} />
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
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
      )}
    </MainLayout>
  );
};

export default Projects;