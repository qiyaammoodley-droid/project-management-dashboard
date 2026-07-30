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
          "bg-green-100 text-green-700":
            status === "Completed",

          "bg-yellow-100 text-yellow-700":
            status === "Pending",

          "bg-blue-100 text-blue-700":
            status === "In Progress",
        }
      )}
    >
      {status}
    </span>
  );
};

export default Badge;