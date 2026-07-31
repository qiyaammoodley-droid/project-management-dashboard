import { useParams } from "react-router-dom";

import useProjects from "../hooks/useProjects";
import useTasks from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";
import { users } from "../data/users";
import MainLayout from "../layouts/MainLayout";

const formatShortDate = (value?: string) => {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "-";
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
};

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, isReady } = useProjects();
  const { tasks, addTask } = useTasks();

  const projectId = Number(id);
  const project = projects.find((item) => Number(item.id) === projectId);
  const projectTasks = tasks.filter((task) => Number(task.projectId) === projectId);

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

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900">Tasks in this project</h2>
          <div className="mt-3 space-y-2">
            {projectTasks.length ? (
              projectTasks.map((task) => (
                <div key={task.id} className="rounded-xl border border-slate-200 px-4 py-3">
                  <p className="font-semibold text-slate-900">{task.title}</p>
                  <p className="text-sm text-slate-500">Due: {formatShortDate(task.dueDate)}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No tasks yet for this project.</p>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/30 p-5">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Add task to this project</h2>
          <TaskForm
            users={users}
            projects={projects}
            selectedProjectId={Number(project.id)}
            onSubmit={(values) => addTask({ ...values, projectId: projectId })}
          />
        </div>
      </section>
    </MainLayout>
  );
};

export default ProjectDetails;