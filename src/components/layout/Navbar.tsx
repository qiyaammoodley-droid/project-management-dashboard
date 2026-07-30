import {
  Bell,
  Mail,
  Plus,
  Search,
} from "lucide-react";

const Navbar = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8">
      {/* Left Side */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Welcome back to Gemini 👋
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-teal-600 focus:bg-white"
          />
        </div>

        {/* Notifications */}
        <button className="rounded-xl bg-gray-100 p-3 transition hover:bg-gray-200">
          <Bell size={20} />
        </button>

        {/* Messages */}
        <button className="rounded-xl bg-gray-100 p-3 transition hover:bg-gray-200">
          <Mail size={20} />
        </button>

        {/* New Project */}
        <button className="flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-medium text-white transition hover:bg-teal-800">
          <Plus size={18} />
          New Project
        </button>

        {/* User */}
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-700 font-semibold text-white">
            G
          </div>

          <div className="hidden lg:block">
            <h4 className="font-semibold text-gray-900">
              Gemini Team
            </h4>

            <p className="text-sm text-gray-500">
              Project Manager
            </p>
          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;