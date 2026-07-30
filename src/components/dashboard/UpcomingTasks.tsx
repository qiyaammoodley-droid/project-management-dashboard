import {
  CheckCircle2,
  Clock3,
  Circle,
} from "lucide-react";

import Card from "../ui/Card";

const tasks = [
  {
    title: "Finish Dashboard UI",
    due: "Today",
    priority: "High",
    completed: false,
  },
  {
    title: "Create Projects Page",
    due: "Tomorrow",
    priority: "Medium",
    completed: false,
  },
  {
    title: "Setup Context API",
    due: "Friday",
    priority: "High",
    completed: false,
  },
  {
    title: "Deploy to Vercel",
    due: "Next Week",
    priority: "Low",
    completed: true,
  },
];

const UpcomingTasks = () => {
  return (
    <Card>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Upcoming Tasks
        </h2>

        <p className="text-gray-500">
          Tasks due soon
        </p>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.title}
            className="flex items-center justify-between rounded-2xl border border-violet-100 p-4 transition hover:border-violet-300 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              {task.completed ? (
                <CheckCircle2
                  size={22}
                  className="text-emerald-500"
                />
              ) : (
                <Circle
                  size={22}
                  className="text-violet-500"
                />
              )}

              <div>
                <h3 className="font-semibold text-gray-900">
                  {task.title}
                </h3>

                <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                  <Clock3 size={14} />
                  {task.due}
                </div>
              </div>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                task.priority === "High"
                  ? "bg-rose-100 text-rose-600"
                  : task.priority === "Medium"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UpcomingTasks;