import { Link } from "react-router-dom";
import { CalendarDays, UserRound } from "lucide-react";

import { users } from "../data/users";
import useTasks from "../hooks/useTasks";
import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

const Projects = () => {
  const { tasks, isReady } = useTasks();

  const resolveTaskStatus = (
    status: "To Do" | "In Progress" | "In Review" | "Completed"
  ): "Completed" | "In Progress" | "Pending" => {
    if (status === "Completed") {
      return "Completed";
    }

    if (status === "In Progress") {
      return "In Progress";
    }

    return "Pending";
  };

  return (
    <MainLayout>
      <PageHeader
        title="Projects"
        subtitle="Track all created tasks and progress in one place"
      />

      {!isReady ? (
        <Card className="border-emerald-100">
          <p className="text-sm text-slate-600">Loading projects...</p>
        </Card>
      ) : !tasks.length ? (
        <Card className="border-emerald-100">
          <h2 className="text-xl font-semibold text-slate-900">No Tasks Created Yet</h2>
          <p className="mt-2 text-sm text-slate-500">
            Add tasks from the task page and they will appear here automatically.
          </p>
          <Link
            to="/tasks/1"
            className="mt-5 inline-flex rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Go To Task Form
          </Link>
        </Card>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {tasks.map((task) => {
            const assignee = users.find((user) => user.id === task.assignedTo);

            return (
              <Card
                key={task.id}
                className="border-emerald-100 p-5 hover:shadow-emerald-100"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {task.description || "No description"}
                    </p>
                  </div>
                  <Badge status={resolveTaskStatus(task.status)} />
                </div>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <UserRound size={15} className="text-emerald-600" />
                    <span>
                      {assignee ? `${assignee.name} - ${assignee.role}` : "Unassigned"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays size={15} className="text-emerald-600" />
                    <span>{task.dueDate || "No due date"}</span>
                  </div>
                </div>

                <Link
                  to={`/tasks/${task.id}`}
                  className="mt-5 inline-flex text-sm font-semibold text-emerald-700 underline"
                >
                  Open Task Details
                </Link>
              </Card>
            );
          })}
        </section>
      )}
    </MainLayout>
  );
};

export default Projects;