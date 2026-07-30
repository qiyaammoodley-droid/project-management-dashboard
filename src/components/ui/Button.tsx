import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button = ({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "rounded-xl px-5 py-3 font-medium transition duration-200",
        variant === "primary"
          ? "bg-teal-700 text-white hover:bg-teal-800"
          : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;