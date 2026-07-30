import {
  MoreHorizontal,
  FolderKanban,
} from "lucide-react";

import Card from "../ui/Card";
import Badge from "../ui/Badge";

const projects = [
  {
    name: "Gemini Dashboard",
    client: "Internal",
    progress: 85,
    status: "In Progress",
  },
  {
    name: "Mobile Banking App",
    client: "FNB",
    progress: 100,
    status: "Completed",
  },
  {
    name: "E-Commerce Platform",
    client: "Nike",
    progress: 40,
    status: "Pending",
  },
  {
    name: "CRM System",
    client: "Microsoft",
    progress: 72,
    status: "In Progress",
  },
];

const RecentProjects = () => {
  return (
    <Card>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Projects
          </h2>

          <p className="text-gray-500">
            Latest project activity
          </p>
        </div>

        <button className="rounded-xl bg-violet-100 p-3 text-violet-700">
          <FolderKanban size={20} />
        </button>
      </div>

      <div className="space-y-5">
        {projects.map((project) => (
          <div
            key={project.name}
            className="rounded-2xl border border-violet-100 p-5 transition hover:border-violet-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {project.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {project.client}
                </p>
              </div>

              <button>
                <MoreHorizontal
                  size={20}
                  className="text-gray-400"
                />
              </button>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-violet-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-pink-500"
                  style={{
                    width: `${project.progress}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-5">
              <Badge status={project.status as any} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentProjects;