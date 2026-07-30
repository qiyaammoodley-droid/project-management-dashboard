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
        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-medium transition-all duration-300",

        variant === "primary" &&
          "bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-lg shadow-violet-200 hover:scale-[1.02] hover:shadow-xl",

        variant === "secondary" &&
          "bg-violet-100 text-violet-700 hover:bg-violet-200",

        variant === "outline" &&
          "border border-violet-200 bg-white text-violet-700 hover:bg-violet-50",

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;