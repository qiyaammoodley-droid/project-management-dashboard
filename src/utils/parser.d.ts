// Type declarations for parser.js.
// parser.js is kept as plain JavaScript on purpose (see comment in that file),
// so this hand-written .d.ts gives the TypeScript components proper typing
// without converting the module itself.

import type { ParsedDeadline, RawDeadline, ParsedActivityItem, RawActivityItem, Task, TeamMember } from "../types";

export declare function parseDeadlines(rawDeadlines: RawDeadline[], now?: Date): ParsedDeadline[];

export declare function calculateProgress(tasks: Task[]): {
  percent: number;
  done: number;
  inProgress: number;
  todo: number;
  total: number;
};

export declare function relativeTime(timestamp: string, now?: Date): string;

export declare function parseActivityFeed(
  rawActivity: RawActivityItem[],
  team: Pick<TeamMember, "id" | "name" | "initials">[],
  now?: Date
): ParsedActivityItem[];

export declare function calculateTimelineProgress(
  startDate: string,
  endDate: string,
  now?: Date
): {
  daysElapsed: number;
  totalDays: number;
  timeElapsedPercent: number;
};
