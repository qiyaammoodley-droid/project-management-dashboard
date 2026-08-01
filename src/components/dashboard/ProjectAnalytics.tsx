import Card from "../ui/Card";
import useProjects from "../../hooks/useProjects";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

const ProjectAnalytics = () => {
  const { projects } = useProjects();

  const data = projects.length
    ? projects.map((project) => ({
        name:
          project.name.length > 10
            ? `${project.name.slice(0, 10)}...`
            : project.name,
        progress: project.progress,
      }))
    : [
        {
          name: "No Projects",
          progress: 0,
        },
      ];

  return (
    <Card className="border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900">
        Project Analytics
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Live project progress
      </p>

      <div className="mt-5 h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip />

            <Bar
              dataKey="progress"
              radius={[16, 16, 0, 0]}
              fill="#0f7a57"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ProjectAnalytics;