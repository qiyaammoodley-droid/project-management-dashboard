import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
}

const PageHeader = ({
  title,
  subtitle,
  action,
}: PageHeaderProps) => {
  return (
    <div className="mb-5 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          {subtitle}
        </p>
      </div>

      {action && <div>{action}</div>}
    </div>
  );
};

export default PageHeader;