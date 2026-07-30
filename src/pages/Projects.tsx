import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, FolderKanban, Plus } from "lucide-react";

import useProjects from "../hooks/useProjects";
import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const Projects = () => {
  const navigate = useNavigate();
  const { projects, isReady } = useProjects();

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
          <Link
            to="/projects/new"
            className="mt-5 inline-flex rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Create Project
          </Link>
        </Card>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => {
            return (
              <Card
                key={project.id}
                className="border-emerald-100 p-5 hover:shadow-emerald-100"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {project.description || "No description"}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {project.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <FolderKanban size={15} className="text-emerald-600" />
                    <span>Progress: {project.progress}%</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays size={15} className="text-emerald-600" />
                    <span>{project.deadline || "No deadline"}</span>
                  </div>
                </div>

                <Link
                  to={`/projects/${project.id}`}
                  className="mt-5 inline-flex text-sm font-semibold text-emerald-700 underline"
                >
                  Open Project
                </Link>
              </Card>
            );
          })}
        </section>
      )}
    </MainLayout>
  );
};

export default Projects;