import type { Project } from "../../types";
import { calculateProgress, parseDeadlines, parseActivityFeed } from "../../utils/parser.js";
import ProjectInfo from "./ProjectInfo";
import TeamMembers from "./TeamMembers";
import ProgressBar from "./ProgressBar";
import Deadlines from "./Deadlines";
import RecentActivity from "./RecentActivity";
import "./ProjectDetails.css";

interface ProjectDetailsProps {
  project: Project;
}

// Member 3 (Tshwarelo Madonsela) — Project Details feature.
// Composes: project information, team members, progress bar, deadlines,
// and recent activity. All derived values (progress %, deadline urgency,
// relative timestamps) are computed by parser.js so the components below
// only ever deal with display-ready data.
function ProjectDetails({ project }: ProjectDetailsProps) {
  const progress = calculateProgress(project.tasks);
  const deadlines = parseDeadlines(project.deadlines);
  const activity = parseActivityFeed(project.activity, project.team);

  return (
    <div className="project-details">
      <ProjectInfo project={project} />

      <div className="project-details__grid">
        <div className="project-details__col project-details__col--main">
          <ProgressBar progress={progress} />
          <RecentActivity items={activity} />
        </div>

        <div className="project-details__col project-details__col--side">
          <TeamMembers team={project.team} />
          <Deadlines deadlines={deadlines} />
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
