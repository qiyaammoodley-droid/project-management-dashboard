import Card from "../ui/Card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", progress: 65 },
  { day: "Tue", progress: 82 },
  { day: "Wed", progress: 55 },
  { day: "Thu", progress: 90 },
  { day: "Fri", progress: 72 },
  { day: "Sat", progress: 40 },
  { day: "Sun", progress: 68 },
];

const ProjectAnalytics = () => {
  return (
    <Card className="border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900">
        Project Analytics
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Weekly project progress
      </p>

      <div className="mt-5 h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip />

            <Bar
              dataKey="progress"
              radius={[16, 16, 16, 16]}
              fill="#0f7a57"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ProjectAnalytics;