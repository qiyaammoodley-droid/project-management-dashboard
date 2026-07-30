interface ProgressCircleProps {
  value: number;
}

const ProgressCircle = ({ value }: ProgressCircleProps) => {
  const radius = 60;
  const stroke = 10;

  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (value / 100) * circumference;

  return (
    <div className="relative flex h-[120px] w-[120px] items-center justify-center">
      <svg
        width={120}
        height={120}
        className="-rotate-90"
      >
        {/* Background */}
        <circle
          cx="60"
          cy="60"
          r={normalizedRadius}
          stroke="#F3E8FF"
          strokeWidth={stroke}
          fill="none"
        />

        {/* Progress */}
        <circle
          cx="60"
          cy="60"
          r={normalizedRadius}
          stroke="url(#gradient)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />

        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-gray-900">
          {value}%
        </span>
      </div>
    </div>
  );
};

export default ProgressCircle;