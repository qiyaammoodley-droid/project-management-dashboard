import type { StatusFilterOption } from "../../types/project";

interface StatusFilterProps {
  value: StatusFilterOption;
  onChange: (value: StatusFilterOption) => void;
}

const statuses: StatusFilterOption[] = [
  "All",
  "To Do",
  "In Progress",
  "In Review",
  "Completed",
];

const StatusFilter = ({ value, onChange }: StatusFilterProps) => {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as StatusFilterOption)}
      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition-all focus:border-emerald-400 focus:bg-white"
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status === "All" ? "All statuses" : status}
        </option>
      ))}
    </select>
  );
};

export default StatusFilter;