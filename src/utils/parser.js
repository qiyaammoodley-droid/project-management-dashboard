/**
 * parser.js
 * ---------------------------------------------------------------------------
 * Project Details module — Member 3 (Tshwarelo Madonsela)
 *
 * Plain-JS utility layer that takes raw project data (the shape you'd get
 * back from a mock/external API) and turns it into the exact shapes the
 * Project Details UI needs: day counts for deadlines, a computed progress
 * percentage from the task list, and a human-readable, time-sorted activity
 * feed.
 *
 * Kept as vanilla JS (not .ts) on purpose so it can be dropped into any
 * teammate's part of the app, or swapped for a real API response later,
 * without any build-step changes.
 * ---------------------------------------------------------------------------
 */

const DAY_IN_MS = 1000 * 60 * 60 * 24;

/**
 * Parses a list of raw deadlines and enriches each with how many days
 * remain and an urgency bucket used for the status pill colour.
 *
 * @param {{id: string, label: string, dueDate: string}[]} rawDeadlines
 * @param {Date} [now] - override "today" for testing
 * @returns {{id: string, label: string, dueDate: string, daysRemaining: number, urgency: "overdue"|"due-soon"|"upcoming"}[]}
 */
export function parseDeadlines(rawDeadlines, now = new Date()) {
  if (!Array.isArray(rawDeadlines)) return [];

  return rawDeadlines
    .map((deadline) => {
      const due = new Date(deadline.dueDate);
      const daysRemaining = Math.ceil((due.getTime() - now.getTime()) / DAY_IN_MS);

      let urgency = "upcoming";
      if (daysRemaining < 0) urgency = "overdue";
      else if (daysRemaining <= 3) urgency = "due-soon";

      return { ...deadline, daysRemaining, urgency };
    })
    .sort((a, b) => a.daysRemaining - b.daysRemaining);
}

/**
 * Calculates overall project progress from a flat task list.
 *
 * @param {{id: string, status: "todo"|"in-progress"|"done"}[]} tasks
 * @returns {{percent: number, done: number, inProgress: number, todo: number, total: number}}
 */
export function calculateProgress(tasks) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return { percent: 0, done: 0, inProgress: 0, todo: 0, total: 0 };
  }

  const done = tasks.filter((t) => t.status === "done").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const todo = tasks.filter((t) => t.status === "todo").length;
  const total = tasks.length;
  const percent = Math.round((done / total) * 100);

  return { percent, done, inProgress, todo, total };
}

/**
 * Formats a timestamp into a short relative-time string ("2h ago", "just now").
 *
 * @param {string} timestamp - ISO datetime string
 * @param {Date} [now] - override "now" for testing
 * @returns {string}
 */
export function relativeTime(timestamp, now = new Date()) {
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.round(diffMs / (1000 * 60));

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return then.toLocaleDateString("en-ZA", { day: "numeric", month: "short" });
}

/**
 * Parses raw activity log entries into a display-ready, time-sorted feed,
 * resolving each entry's member id into a name and initials.
 *
 * @param {{id: string, memberId: string, message: string, timestamp: string}[]} rawActivity
 * @param {{id: string, name: string, initials: string}[]} team
 * @param {Date} [now] - override "now" for testing
 * @returns {Array<Object>}
 */
export function parseActivityFeed(rawActivity, team, now = new Date()) {
  if (!Array.isArray(rawActivity)) return [];
  const teamById = new Map((team || []).map((member) => [member.id, member]));

  return [...rawActivity]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .map((entry) => {
      const member = teamById.get(entry.memberId);
      return {
        ...entry,
        relativeTime: relativeTime(entry.timestamp, now),
        memberName: member ? member.name : "Unknown member",
        memberInitials: member ? member.initials : "?",
      };
    });
}

/**
 * Convenience helper: how many calendar days a project has been running,
 * and what fraction of its total timeline has elapsed. Used to sanity-check
 * the task-based progress percentage against the timeline.
 *
 * @param {string} startDate
 * @param {string} endDate
 * @param {Date} [now]
 * @returns {{daysElapsed: number, totalDays: number, timeElapsedPercent: number}}
 */
export function calculateTimelineProgress(startDate, endDate, now = new Date()) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / DAY_IN_MS));
  const daysElapsed = Math.min(
    totalDays,
    Math.max(0, Math.round((now.getTime() - start.getTime()) / DAY_IN_MS))
  );
  const timeElapsedPercent = Math.round((daysElapsed / totalDays) * 100);

  return { daysElapsed, totalDays, timeElapsedPercent };
}
