import { Link } from "react-router-dom";
import { CalendarDays, FolderKanban, Users } from "lucide-react";

import Card from "../ui/Card";
import Badge from "../ui/Badge";
import ProgressBar from "../ui/ProgressBar";
import type { Project } from "../../types/project";

interface ProjectCardProps {
  project: Project;
  onDelete?: (projectId: number | string) => void;
}

const ProjectCard = ({ project, onDelete }: ProjectCardProps) => {
  return (
    <Card className="flex flex-col justify-between border-emerald-100 p-5 transition-shadow hover:shadow-md hover:shadow-emerald-100/50">
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-lg font-semibold text-slate-900">
            {project.name}
          </h3>
          <Badge status={project.status} />
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
          {project.description || "No description"}
        </p>

        <div className="mt-4">
          <ProgressBar progress={project.progress ?? 0} />
        </div>

        <div className="mt-4 space-y-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <FolderKanban size={15} className="flex-shrink-0 text-emerald-600" />
            <span>Progress: {project.progress ?? 0}%</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={15} className="flex-shrink-0 text-emerald-600" />
            <span>{project.deadline || "No deadline"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={15} className="flex-shrink-0 text-emerald-600" />
            <span>{project.teamMembers?.length ?? 0} team member(s)</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <Link
          to={`/projects/${project.id}`}
          className="inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
        >
          Open Project &rarr;
        </Link>

        <button
          type="button"
          onClick={() => onDelete?.(project.id)}
          className="rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
        >
          Delete
        </button>
      </div>
    </Card>
  );
};

export default ProjectCard;