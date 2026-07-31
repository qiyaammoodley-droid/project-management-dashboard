import type { Project } from "../../types";

interface ProjectInfoProps {
  project: Project;
}

const STATUS_LABEL: Record<Project["status"], string> = {
  "on-track": "On track",
  "at-risk": "At risk",
  delayed: "Delayed",
  completed: "Completed",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ProjectInfo({ project }: ProjectInfoProps) {
  return (
    <section className="card project-info" aria-labelledby="project-info-heading">
      <div className="project-info__top">
        <div>
          <p className="eyebrow">Project</p>
          <h1 id="project-info-heading" className="project-info__name">
            {project.name}
          </h1>
        </div>
        <span className={`status-pill status-pill--${project.status}`}>
          {STATUS_LABEL[project.status]}
        </span>
      </div>

      <p className="project-info__description">{project.description}</p>

      <dl className="project-info__meta">
        <div className="project-info__meta-item">
          <dt>Client</dt>
          <dd>{project.client}</dd>
        </div>
        <div className="project-info__meta-item">
          <dt>Start date</dt>
          <dd>{formatDate(project.startDate)}</dd>
        </div>
        <div className="project-info__meta-item">
          <dt>Due date</dt>
          <dd>{formatDate(project.endDate)}</dd>
        </div>
        <div className="project-info__meta-item">
          <dt>Team size</dt>
          <dd>{project.team.length} members</dd>
        </div>
      </dl>
    </section>
  );
}

export default ProjectInfo;
