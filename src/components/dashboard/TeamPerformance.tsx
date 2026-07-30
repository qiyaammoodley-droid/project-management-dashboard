import Card from "../ui/Card";

const TeamPerformance = () => {
  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-900">
        Team Performance
      </h2>

      <p className="mt-2 text-gray-500">
        Overall team productivity this week
      </p>

      <div className="mt-8 space-y-6">

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Productivity</span>
          <span className="text-xl font-bold text-teal-700">92%</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Team Members</span>
          <span className="font-semibold">16</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Tasks Completed Today</span>
          <span className="font-semibold">8</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Projects On Track</span>
          <span className="font-semibold text-green-600">
            14 / 18
          </span>
        </div>

      </div>
    </Card>
  );
};

export default TeamPerformance;