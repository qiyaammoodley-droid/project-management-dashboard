import type { ReactNode } from "react";
import Card from "./Card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change: string;
  positive?: boolean;
}

const StatCard = ({
  title,
  value,
  icon,
  change,
  positive = true,
}: StatCardProps) => {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold text-gray-900">
            {value}
          </h2>

          <p
            className={`mt-3 text-sm font-medium ${
              positive
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {change}
          </p>
        </div>

        <div className="rounded-2xl bg-teal-100 p-4 text-teal-700">
          {icon}
        </div>

      </div>
    </Card>
  );
};

export default StatCard;