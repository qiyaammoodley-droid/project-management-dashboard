interface ProgressCircleProps {
  value: number;
}

const ProgressCircle = ({ value }: ProgressCircleProps) => {
  const radius = 60;
  const stroke = 10;

  const normalizedRadius = radius - stroke * 0.5;

  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (value / 100) * circumference;

  return (
    <div className="flex justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="-rotate-90"
      >
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          stroke="#0F766E"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      <div className="absolute flex h-[120px] w-[120px] items-center justify-center">
        <span className="text-2xl font-bold text-gray-900">
          {value}%
        </span>
      </div>
    </div>
  );
};

export default ProgressCircle;