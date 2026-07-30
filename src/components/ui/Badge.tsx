import clsx from "clsx";

interface BadgeProps {
  status: "Completed" | "In Progress" | "Pending";
}

const Badge = ({ status }: BadgeProps) => {
  return (
    <span
      className={clsx(
        "rounded-full px-3 py-1 text-xs font-semibold",
        {
          "bg-emerald-100 text-emerald-700":
            status === "Completed",

          "bg-violet-100 text-violet-700":
            status === "In Progress",

          "bg-amber-100 text-amber-700":
            status === "Pending",
        }
      )}
    >
      {status}
    </span>
  );
};

export default Badge;