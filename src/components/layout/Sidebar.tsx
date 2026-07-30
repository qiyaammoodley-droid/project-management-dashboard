import {
  LayoutDashboard,
  FolderKanban,
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

const Sidebar = () => {
  const navItem =
    "flex items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-teal-700";

  const activeNav =
    "bg-teal-700 text-white shadow-md hover:bg-teal-700 hover:text-white";

  return (
    <aside className="flex h-full w-72 flex-col justify-between border-r border-gray-200 bg-white p-6">
      {/* Logo */}
      <div>
        <div className="mb-12 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-700 text-xl font-bold text-white">
            G
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Gemini
            </h1>

            <p className="text-sm text-gray-500">
              Project Manager
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Main Menu
          </p>

          <nav className="space-y-2">

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeNav : ""}`
              }
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeNav : ""}`
              }
            >
              <FolderKanban size={20} />
              Projects
            </NavLink>

            <NavLink
              to="/tasks/1"
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeNav : ""}`
              }
            >
              <CheckSquare size={20} />
              Tasks
            </NavLink>

            <button className={navItem}>
              <CalendarDays size={20} />
              Calendar
            </button>

            <button className={navItem}>
              <BarChart3 size={20} />
              Analytics
            </button>

            <button className={navItem}>
              <Users size={20} />
              Team
            </button>

          </nav>
        </div>

        {/* General */}
        <div className="mt-10">
          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
            General
          </p>

          <div className="space-y-2">

            <button className={navItem}>
              <Settings size={20} />
              Settings
            </button>

            <button className={navItem}>
              <HelpCircle size={20} />
              Help
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-50">
              <LogOut size={20} />
              Logout
            </button>

          </div>
        </div>
      </div>

      {/* Download Card */}
      <div className="rounded-3xl bg-gradient-to-br from-teal-700 to-teal-600 p-6 text-white shadow-lg">
        <Download className="mb-5" size={30} />

        <h2 className="text-lg font-bold">
          Gemini Desktop
        </h2>

        <p className="mt-2 text-sm leading-6 text-teal-100">
          Install the desktop version and manage your team's projects from anywhere.
        </p>

        <button className="mt-6 w-full rounded-xl bg-white py-3 font-semibold text-teal-700 transition hover:bg-gray-100">
          Download
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;