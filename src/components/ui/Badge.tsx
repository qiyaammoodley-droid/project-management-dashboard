import clsx from "clsx";
import type { Task } from "../../types/task";
import type { Project } from "../../types/project";

export type BadgeStatus = Task["status"] | Project["status"] | "Pending";

interface BadgeProps {
  status: BadgeStatus;
  className?: string;
}

const styles: Record<BadgeStatus, string> = {
  "To Do": "bg-slate-100 text-slate-600",
  "In Progress": "bg-violet-100 text-violet-700",
  "In Review": "bg-amber-100 text-amber-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
};

const Badge = ({ status, className }: BadgeProps) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        styles[status] || "bg-slate-100 text-slate-600",
        className
      )}
    >
      {status}
    </span>
  );
};

export default Badge;