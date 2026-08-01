import {
  CheckCircle2,
  Clock3,
  Circle,
} from "lucide-react";
import { Link } from "react-router-dom";

import useTasks from "../../hooks/useTasks";
import Card from "../ui/Card";

const UpcomingTasks = () => {
  const {
    tasks,
    isReady,
    toggleTaskComplete,
  } = useTasks();

  const upcomingTasks = tasks.slice(0, 4);

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

      {!isReady ? (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 text-sm text-emerald-700">
          Loading tasks...
        </div>
      ) : !upcomingTasks.length ? (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 text-sm text-slate-700">
          No tasks yet.
          <Link
            to="/tasks/1"
            className="ml-1 font-semibold text-emerald-700 underline"
          >
            Create one
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-2xl border border-emerald-100 p-4 transition hover:border-emerald-300 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleTaskComplete(task.id)}
                  className="transition hover:scale-110"
                >
                  {task.status === "Completed" ? (
                    <CheckCircle2
                      size={22}
                      className="text-emerald-600"
                    />
                  ) : (
                    <Circle
                      size={22}
                      className="text-emerald-500"
                    />
                  )}
                </button>

                <div>
                  <h3
                    className={`font-semibold ${
                      task.status === "Completed"
                        ? "text-gray-400 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                    <Clock3 size={14} />
                    {task.dueDate || "No due date"}
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
      )}
    </Card>
  );
};

export default UpcomingTasks;