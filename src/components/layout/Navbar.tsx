import { Bell, Mail, Search } from "lucide-react";

const Navbar = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-violet-100 bg-white px-8">
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400"
        />

        <input
          type="text"
          placeholder="Search projects, tasks..."
          className="w-full rounded-2xl border border-violet-100 bg-violet-50 py-3 pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-violet-500 focus:bg-white"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-2xl bg-violet-50 p-3 text-violet-600 transition hover:bg-violet-100">
          <Bell size={20} />
        </button>

        <button className="rounded-2xl bg-pink-50 p-3 text-pink-500 transition hover:bg-pink-100">
          <Mail size={20} />
        </button>

        <div className="flex items-center gap-3 border-l border-violet-100 pl-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-pink-500 font-bold text-white shadow-lg">
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