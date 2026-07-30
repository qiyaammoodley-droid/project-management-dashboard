import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
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
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-medium transition-all duration-300",

        variant === "primary" &&
          "bg-emerald-700 text-white shadow-sm hover:bg-emerald-800",

        variant === "secondary" &&
          "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",

        variant === "outline" &&
          "border border-emerald-700 bg-white text-emerald-800 hover:bg-emerald-50",

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;