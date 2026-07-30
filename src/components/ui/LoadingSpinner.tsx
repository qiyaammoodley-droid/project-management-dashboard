type LoadingSpinnerProps = {
	label?: string;
	size?: "sm" | "md" | "lg";
	className?: string;
};

const sizeClasses: Record<NonNullable<LoadingSpinnerProps["size"]>, string> = {
	sm: "h-4 w-4 border-2",
	md: "h-6 w-6 border-2",
	lg: "h-10 w-10 border-4",
};

const LoadingSpinner = ({
	label = "Loading...",
	size = "md",
	className = "",
}: LoadingSpinnerProps) => {
	return (
		<div
			className={`inline-flex items-center gap-3 text-emerald-700 ${className}`}
			role="status"
			aria-live="polite"
		>
			<span
				className={`inline-block animate-spin rounded-full border-emerald-200 border-t-emerald-600 ${sizeClasses[size]}`}
				aria-hidden="true"
			/>
			<span className="text-sm font-medium">{label}</span>
		</div>
	);
};

export default LoadingSpinner;
