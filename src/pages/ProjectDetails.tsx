import { useParams } from "react-router-dom";

import useProjects from "../hooks/useProjects";
import MainLayout from "../layouts/MainLayout";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, isReady } = useProjects();

  const project = projects.find((item) => item.id === Number(id));

  if (!isReady) {
    return (
      <MainLayout>
        <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">Loading project...</p>
        </section>
      </MainLayout>
    );
  }

  if (!project) {
    return (
      <MainLayout>
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-amber-800">Project not found</h1>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">{project.name}</h1>
        <p className="mt-2 text-sm text-slate-600">
          {project.description || "No description"}
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 p-3 text-sm">
            <p className="text-slate-500">Status</p>
            <p className="font-semibold text-slate-900">{project.status}</p>
          </div>

          <div className="rounded-xl border border-slate-200 p-3 text-sm">
            <p className="text-slate-500">Deadline</p>
            <p className="font-semibold text-slate-900">{project.deadline || "No deadline"}</p>
          </div>

          <div className="rounded-xl border border-slate-200 p-3 text-sm">
            <p className="text-slate-500">Progress</p>
            <p className="font-semibold text-slate-900">{project.progress}%</p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProjectDetails;