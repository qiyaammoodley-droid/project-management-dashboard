import { Bell, Mail, Search } from "lucide-react";

const Navbar = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-emerald-50 bg-white px-5 md:px-8">
      <div className="relative w-full max-w-lg">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search task"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-24 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-emerald-400 focus:bg-white"
        />

        <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-500">
          Ctrl F
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-50">
          <Mail size={17} />
        </button>

        <button className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-50">
          <Bell size={17} />
        </button>

        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-1.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-200 font-semibold text-slate-800">
            TM
          </div>

          <div className="hidden pr-2 lg:block">
            <h4 className="font-semibold text-gray-900">
              Totok Michael
            </h4>

            <p className="text-xs text-gray-500">
              tmicheal20@mail.com
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;