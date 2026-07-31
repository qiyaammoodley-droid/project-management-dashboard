interface ProgressBarProps {
  progress: {
    percent: number;
    done: number;
    inProgress: number;
    todo: number;
    total: number;
  };
}

// Signature element: the bar renders as three stacked "growth rings"
// (done / in progress / todo) rather than a single flat fill — a small,
// deliberate nod to the green "growth" metaphor used across the module.
function ProgressBar({ progress }: ProgressBarProps) {
  const { percent, done, inProgress, todo, total } = progress;
  const donePct = total ? (done / total) * 100 : 0;
  const inProgressPct = total ? (inProgress / total) * 100 : 0;
  const todoPct = total ? (todo / total) * 100 : 0;

  return (
    <section className="card progress-card" aria-labelledby="progress-heading">
      <div className="progress-card__top">
        <h2 id="progress-heading" className="card__heading">
          Progress
        </h2>
        <span className="progress-card__percent">{percent}%</span>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Overall task completion"
      >
        <div className="progress-track__segment progress-track__segment--done" style={{ width: `${donePct}%` }} />
        <div
          className="progress-track__segment progress-track__segment--in-progress"
          style={{ width: `${inProgressPct}%` }}
        />
        <div className="progress-track__segment progress-track__segment--todo" style={{ width: `${todoPct}%` }} />
      </div>

      <ul className="progress-legend">
        <li>
          <span className="progress-legend__dot progress-legend__dot--done" />
          Done <strong>{done}</strong>
        </li>
        <li>
          <span className="progress-legend__dot progress-legend__dot--in-progress" />
          In progress <strong>{inProgress}</strong>
        </li>
        <li>
          <span className="progress-legend__dot progress-legend__dot--todo" />
          To do <strong>{todo}</strong>
        </li>
        <li className="progress-legend__total">
          {total} tasks total
        </li>
      </ul>
    </section>
  );
}

export default ProgressBar;
