# Nexus — Project Details Module (Member 3: Tshwarelo Madonsela)

This is the **Project Details** section of the group's project management
dashboard: project information, team members, progress bar, deadlines, and
recent activity — built in React + TypeScript, styled in green and gray.

It's set up as a small standalone Vite app so it runs and can be marked on
its own. `App.tsx` is just a thin shell (header + the module) — in the
merged group project, `<ProjectDetails />` slots into the shared
router/layout next to everyone else's pages.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To type-check and build for production:

```bash
npm run build
```

## What's in here

```
src/
  types.ts                          shared TypeScript types
  data/mockData.ts                  mock "API response" — project, team, tasks, deadlines, activity
  utils/
    parser.js                       ★ the required parser.js
    parser.d.ts                     type declarations for parser.js (so the .tsx files get typing)
  components/ProjectDetails/
    ProjectDetails.tsx              container — wires mock data through parser.js into the 5 pieces
    ProjectInfo.tsx                 project name, description, client, dates, status
    TeamMembers.tsx                 roster with role + workload
    ProgressBar.tsx                 done / in-progress / to-do breakdown
    Deadlines.tsx                   deadlines sorted by urgency (overdue / due soon / upcoming)
    RecentActivity.tsx              time-sorted activity feed
    ProjectDetails.css              all styling for the module (green/gray theme)
  App.tsx / App.css                 standalone shell for running this module on its own
  styles/theme.css                  shared color tokens, reset, focus styles
```

## parser.js

Plain JavaScript (not TypeScript), as requested. It takes raw data —
the shape a real API would return — and turns it into what the UI needs:

- `parseDeadlines(raw)` — adds `daysRemaining` and an `urgency` bucket
  (`overdue` / `due-soon` / `upcoming`) to each deadline, sorted soonest first.
- `calculateProgress(tasks)` — counts done / in-progress / to-do tasks and
  the overall completion percentage.
- `parseActivityFeed(raw, team)` — resolves each activity entry's member,
  sorts by most recent, and formats a relative time ("2h ago").
- `relativeTime(timestamp)` — the relative-time formatter used above.
- `calculateTimelineProgress(start, end)` — extra helper comparing task
  progress against how much of the project's timeline has elapsed.

Because it's plain JS with no dependency on the component types, it can be
copied into any teammate's part of the app, or pointed at a real API
response later, without any changes.

## Data source

Everything currently comes from `src/data/mockData.ts`. To swap in a real
or mock API later, replace the `project` import in `App.tsx` with a fetch
call (e.g. `useEffect` + `fetch`) that returns data in the same shape as
`Project` in `types.ts` — `parser.js` and the components don't need to change.
