interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({
  progress,
}: ProgressBarProps) => {
  return (
    <div className="mt-3">
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-teal-700 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-gray-500">
        {progress}% Complete
      </p>
    </div>
  );
};

export default ProgressBar;