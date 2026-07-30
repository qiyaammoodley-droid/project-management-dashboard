import {
  CheckCircle2,
  Users,
  FolderKanban,
  TrendingUp,
} from "lucide-react";

import Card from "../ui/Card";

const TeamPerformance = () => {
  return (
    <Card>
      <h2 className="text-2xl font-bold text-gray-900">
        Team Performance
      </h2>

      <p className="mt-2 text-gray-500">
        Weekly productivity overview
      </p>

      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between rounded-2xl bg-violet-50 p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-violet-600" size={22} />
            <span className="text-gray-700">Productivity</span>
          </div>

          <span className="font-bold text-violet-700">92%</span>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-pink-50 p-4">
          <div className="flex items-center gap-3">
            <Users className="text-pink-500" size={22} />
            <span className="text-gray-700">Team Members</span>
          </div>

          <span className="font-bold text-pink-600">16</span>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-emerald-50 p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-emerald-600" size={22} />
            <span className="text-gray-700">Tasks Completed</span>
          </div>

          <span className="font-bold text-emerald-600">8</span>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-indigo-50 p-4">
          <div className="flex items-center gap-3">
            <FolderKanban className="text-indigo-600" size={22} />
            <span className="text-gray-700">Projects On Track</span>
          </div>

          <span className="font-bold text-indigo-700">
            14 / 18
          </span>
        </div>
      </div>
    </Card>
  );
};

export default TeamPerformance;