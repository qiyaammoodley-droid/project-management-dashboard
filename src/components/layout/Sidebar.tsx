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
    "flex items-center gap-3 rounded-2xl px-4 py-3 font-medium text-gray-600 transition-all duration-300 hover:bg-violet-50 hover:text-violet-700";

  const activeNav =
    "bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-lg hover:text-white hover:from-violet-600 hover:to-pink-500";

  return (
    <aside className="flex h-full w-72 flex-col justify-between border-r border-violet-100 bg-white p-6">
      {/* Logo */}
      <div>
        <div className="mb-12 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 text-xl font-bold text-white shadow-lg">
            G
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Gemini
            </h1>

            <p className="text-sm text-gray-500">
              Project Manager
            </p>
          </div>
        </div>

        {/* Main Menu */}
        <div>
          <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
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

            <button className={`${navItem} w-full`}>
              <CalendarDays size={20} />
              Calendar
            </button>

            <button className={`${navItem} w-full`}>
              <BarChart3 size={20} />
              Analytics
            </button>

            <button className={`${navItem} w-full`}>
              <Users size={20} />
              Team
            </button>
          </nav>
        </div>

        {/* General */}
        <div className="mt-12">
          <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
            General
          </p>

          <div className="space-y-2">
            <button className={`${navItem} w-full`}>
              <Settings size={20} />
              Settings
            </button>

            <button className={`${navItem} w-full`}>
              <HelpCircle size={20} />
              Help
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 font-medium text-rose-500 transition-all duration-300 hover:bg-rose-50">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Download Card */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-violet-600 to-pink-500 p-6 text-white shadow-xl">
        <Download size={30} className="mb-5" />

        <h2 className="text-xl font-bold">
          Gemini Desktop
        </h2>

        <p className="mt-3 text-sm leading-6 text-violet-100">
          Install the desktop app and manage your projects from anywhere.
        </p>

        <button className="mt-6 w-full rounded-2xl bg-white py-3 font-semibold text-violet-700 transition-all duration-300 hover:scale-[1.02] hover:bg-violet-50">
          Download
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;