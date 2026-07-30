import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`rounded-3xl bg-white p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;