import type { ParsedActivityItem } from "../../types";

interface RecentActivityProps {
  items: ParsedActivityItem[];
}

// Rendered as a connected vertical timeline ("vine") with leaf-shaped
// markers at each entry — the same growth motif as the progress bar,
// applied to the activity feed.
function RecentActivity({ items }: RecentActivityProps) {
  return (
    <section className="card recent-activity" aria-labelledby="recent-activity-heading">
      <h2 id="recent-activity-heading" className="card__heading">
        Recent activity
      </h2>

      <ol className="activity-feed">
        {items.map((item) => (
          <li className="activity-feed__item" key={item.id}>
            <span className="activity-feed__marker" aria-hidden="true" />
            <span className="activity-feed__avatar" aria-hidden="true">
              {item.memberInitials}
            </span>
            <div className="activity-feed__body">
              <p className="activity-feed__text">
                <strong>{item.memberName}</strong> {item.message}
              </p>
              <p className="activity-feed__time">{item.relativeTime}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default RecentActivity;
