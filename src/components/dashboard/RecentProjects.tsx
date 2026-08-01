import { Plus } from "lucide-react";
import { useState } from "react";

import useProjects from "../../hooks/useProjects";
import Card from "../ui/Card";
import Badge, { type BadgeStatus } from "../ui/Badge";

const RecentProjects = () => {
  const { projects } = useProjects();

  const [extraMembers, setExtraMembers] = useState<
    {
      name: string;
      client: string;
      status: BadgeStatus;
    }[]
  >([]);

  const handleAddMember = () => {
    const name = prompt("Enter member name");

    if (!name?.trim()) return;

    setExtraMembers((current) => [
      ...current,
      {
        name,
        client: "No project assigned",
        status: "Pending",
      },
    ]);
  };

  const projectMembers = projects.flatMap((project) =>
    project.teamMembers.map((member) => ({
      name: member.name,
      client: project.name,
      status: (
        project.status === "To Do"
          ? "Pending"
          : project.status
      ) as BadgeStatus,
    }))
  );

  const members = [...projectMembers, ...extraMembers];

  return (
    <Card className="border-slate-200">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Team Collaboration
          </h2>

          <p className="text-sm text-gray-500">
            Live team members across projects
          </p>
        </div>

        <button
          onClick={handleAddMember}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
        >
          <Plus size={15} />
          Add Member
        </button>
      </div>

      <div className="space-y-4">
        {members.length === 0 ? (
          <p className="text-sm text-slate-500">
            No team members available.
          </p>
        ) : (
          members.map((member, index) => (
            <div
              key={`${member.name}-${index}`}
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-4"
            >
              <div>
                <h3 className="font-semibold text-slate-900">
                  {member.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {member.client}
                </p>
              </div>

              <Badge status={member.status} />
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default RecentProjects;