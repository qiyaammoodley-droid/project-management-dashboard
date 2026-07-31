import type { ParsedDeadline } from "../../types";

interface DeadlinesProps {
  deadlines: ParsedDeadline[];
}

const URGENCY_LABEL: Record<ParsedDeadline["urgency"], string> = {
  overdue: "Overdue",
  "due-soon": "Due soon",
  upcoming: "Upcoming",
};

function daysLabel(days: number) {
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return "Due today";
  return `${days}d left`;
}

function Deadlines({ deadlines }: DeadlinesProps) {
  return (
    <section className="card deadlines" aria-labelledby="deadlines-heading">
      <h2 id="deadlines-heading" className="card__heading">
        Deadlines
      </h2>

      <ul className="deadlines__list">
        {deadlines.map((deadline) => (
          <li className="deadline-item" key={deadline.id}>
            <span className={`deadline-item__dot deadline-item__dot--${deadline.urgency}`} />
            <div className="deadline-item__info">
              <p className="deadline-item__label">{deadline.label}</p>
              <p className="deadline-item__date">
                {new Date(deadline.dueDate).toLocaleDateString("en-ZA", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>
            <span className={`status-pill status-pill--${deadline.urgency}`}>
              {URGENCY_LABEL[deadline.urgency]} · {daysLabel(deadline.daysRemaining)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Deadlines;
