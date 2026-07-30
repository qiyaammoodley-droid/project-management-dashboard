import Card from "../ui/Card";
import ProgressCircle from "../ui/ProgressCircle";

const ProjectProgress = () => {
  return (
    <Card>
      <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">
            Project Progress
          </h2>

          <p className="mt-2 text-gray-500">
            Overall progress across all active projects
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex justify-between rounded-2xl bg-violet-50 px-5 py-4">
              <span className="text-gray-600">Active Projects</span>
              <span className="font-bold text-violet-700">18</span>
            </div>

            <div className="flex justify-between rounded-2xl bg-pink-50 px-5 py-4">
              <span className="text-gray-600">Completed</span>
              <span className="font-bold text-pink-600">6</span>
            </div>

            <div className="flex justify-between rounded-2xl bg-amber-50 px-5 py-4">
              <span className="text-gray-600">Pending Review</span>
              <span className="font-bold text-amber-600">3</span>
            </div>
          </div>
        </div>

        <ProgressCircle value={78} />
      </div>
    </Card>
  );
};

export default ProjectProgress;