import Card from "../ui/Card";
import ProgressCircle from "../ui/ProgressCircle";

const ProjectProgress = () => {
  return (
    <Card>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Project Progress
          </h2>

          <p className="mt-2 text-gray-500">
            Overall completion across all projects
          </p>

          <div className="mt-8 space-y-4">

            <div className="flex justify-between">
              <span className="text-gray-600">
                Active Projects
              </span>

              <span className="font-semibold">
                18
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                Completed
              </span>

              <span className="font-semibold">
                6
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                Pending Review
              </span>

              <span className="font-semibold">
                3
              </span>
            </div>

          </div>
        </div>

        <ProgressCircle value={78} />

      </div>
    </Card>
  );
};

export default ProjectProgress;