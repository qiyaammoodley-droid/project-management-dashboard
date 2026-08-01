import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Download,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import useTasks from "../../hooks/useTasks";

const Sidebar = () => {
  const { tasks } = useTasks();

  const navItem =
    "group flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-slate-500 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700";

  const activeNav =
    "bg-emerald-50 text-emerald-700";

  return (
    <aside className="flex h-full w-[250px] flex-col justify-between border-r border-slate-100 bg-white p-5">
      {/* Logo */}
      <div>
        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-emerald-500 text-emerald-600">
            <LayoutDashboard size={17} />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-slate-900">Donezo</h1>
          </div>
        </div>

        {/* Main Menu */}
        <div>
          <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Menu
          </p>

          <nav className="space-y-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeNav : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`h-5 w-1 rounded-full ${isActive ? "bg-emerald-600" : "bg-transparent"}`}
                  />
                  <LayoutDashboard size={17} />
                  Dashboard
                </>
              )}
            </NavLink>

            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeNav : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`h-5 w-1 rounded-full ${isActive ? "bg-emerald-600" : "bg-transparent"}`}
                  />
                  <CheckSquare size={17} />
                  Tasks
                  <span className="ml-auto rounded bg-emerald-600/10 px-1.5 py-0.5 text-[10px] text-emerald-700">
                    {tasks.length}
                  </span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeNav : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`h-5 w-1 rounded-full ${isActive ? "bg-emerald-600" : "bg-transparent"}`}
                  />
                  <CalendarDays size={17} />
                  Calendar
                </>
              )}
            </NavLink>

            <button className={`${navItem} w-full`}>
              <span className="h-5 w-1 rounded-full bg-transparent" />
              <BarChart3 size={17} />
              Analytics
            </button>

            <NavLink
              to="/team"
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeNav : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`h-5 w-1 rounded-full ${isActive ? "bg-emerald-600" : "bg-transparent"}`}
                  />
                  <Users size={17} />
                  Team
                </>
              )}
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeNav : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`h-5 w-1 rounded-full ${isActive ? "bg-emerald-600" : "bg-transparent"}`}
                  />
                  <BarChart3 size={17} />
                  Projects
                </>
              )}
            </NavLink>
          </nav>
        </div>

        {/* General */}
        <div className="mt-10">
          <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            General
          </p>

          <div className="space-y-1.5">
            <button className={`${navItem} w-full`}>
              <span className="h-5 w-1 rounded-full bg-transparent" />
              <Settings size={17} />
              Settings
            </button>

            <button className={`${navItem} w-full`}>
              <span className="h-5 w-1 rounded-full bg-transparent" />
              <HelpCircle size={17} />
              Help
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-slate-500 transition-all duration-200 hover:bg-slate-100">
              <span className="h-5 w-1 rounded-full bg-transparent" />
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Download Card */}
      <div className="overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_20%_0%,#0d4f36_0%,#08251a_70%)] p-4 text-white shadow-sm">
        <Download size={22} className="mb-3 text-emerald-300" />

        <h2 className="text-lg font-semibold">
          Download our
          <br />
          Mobile App
        </h2>

        <p className="mt-2 text-xs leading-5 text-emerald-100">
          Get updates on the go.
        </p>

        <button className="mt-4 w-full rounded-xl bg-emerald-500 py-2 text-sm font-semibold text-white transition-all hover:bg-emerald-400">
          Download
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;