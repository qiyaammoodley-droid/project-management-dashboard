import type { ReactNode } from "react";
import Card from "./Card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change: string;
  positive?: boolean;
  featured?: boolean;
}

const StatCard = ({
  title,
  value,
  icon,
  change,
  positive = true,
  featured = false,
}: StatCardProps) => {
  return (
    <Card
      className={`transition-all duration-300 ${
        featured
          ? "border-0 bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-500 text-white"
          : "bg-white"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className={`text-sm font-medium ${
              featured ? "text-emerald-100" : "text-gray-500"
            }`}
          >
            {title}
          </p>

          <h2
            className={`mt-3 text-4xl font-bold ${
              featured ? "text-white" : "text-gray-900"
            }`}
          >
            {value}
          </h2>

          <p
            className={`mt-4 text-sm font-medium ${
              featured
                ? "text-emerald-100"
                : positive
                ? "text-emerald-600"
                : "text-rose-500"
            }`}
          >
            {change}
          </p>
        </div>

        <div
          className={`rounded-2xl p-4 ${
            featured
              ? "bg-white/20 text-white"
              : "border border-slate-200 bg-white text-slate-700"
          }`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;