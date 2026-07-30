import {
  Plus,
} from "lucide-react";

import Card from "../ui/Card";
import Badge from "../ui/Badge";

const projects = [
  {
    name: "Alexandra Deff",
    client: "Working on Github Project Repository",
    progress: 100,
    status: "Completed",
  },
  {
    name: "Edwin Adenike",
    client: "Working on Integrate User Authentication System",
    progress: 75,
    status: "In Progress",
  },
  {
    name: "Isaac Oluwatemiorun",
    client: "Working on Develop Search and Filter Functionality",
    progress: 40,
    status: "Pending",
  },
  {
    name: "David Oshodi",
    client: "Working on Responsive Layout for Homepage",
    progress: 68,
    status: "In Progress",
  },
];

const RecentProjects = () => {
  return (
    <Card className="border-slate-200">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Team Collaboration
          </h2>

          <p className="text-gray-500 text-sm">
            Current member tasks
          </p>
        </div>

        <button className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700">
          <Plus size={14} />
          Add Member
        </button>
      </div>

      <div className="space-y-5">
        {projects.map((project) => (
          <div
            key={project.name}
            className="rounded-2xl border border-slate-200 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {project.name}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {project.client}
                </p>
              </div>

              <Badge status={project.status as any} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentProjects;