import { useState } from "react";
import {
  Bell,
  Mail,
  Search,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const [showMail, setShowMail] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [user, setUser] = useState({
    initials: "TM",
    name: "Totok Michael",
    email: "tmicheal20@mail.com",
  });

  const switchAccount = () => {
    if (user.initials === "TM") {
      setUser({
        initials: "GP",
        name: "Gemini Project",
        email: "gemini@dashboard.com",
      });
    } else {
      setUser({
        initials: "TM",
        name: "Totok Michael",
        email: "tmicheal20@mail.com",
      });
    }

    setShowProfile(false);
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-emerald-50 bg-white px-5 md:px-8">

      {/* Search */}
      <div className="relative w-full max-w-lg">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search task..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-24 text-sm outline-none transition focus:border-emerald-400"
        />

        <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-500">
          Ctrl F
        </span>
      </div>

      <div className="flex items-center gap-4">

        {/* Mail */}
        <div className="relative">
          <button
            onClick={() => {
              setShowMail(!showMail);
              setShowNotifications(false);
              setShowProfile(false);
            }}
            className="rounded-full border border-slate-200 bg-white p-2.5 hover:bg-slate-100"
          >
            <Mail size={17} />
          </button>

          {showMail && (
            <div className="absolute right-0 mt-3 w-64 rounded-2xl border bg-white p-4 shadow-xl z-50">
              <h3 className="font-semibold mb-2">
                Inbox
              </h3>

              <p className="text-sm text-gray-500">
                No new messages.
              </p>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMail(false);
              setShowProfile(false);
            }}
            className="rounded-full border border-slate-200 bg-white p-2.5 hover:bg-slate-100"
          >
            <Bell size={17} />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 rounded-2xl border bg-white p-4 shadow-xl z-50">
              <h3 className="font-semibold mb-3">
                Notifications
              </h3>

              <ul className="space-y-2 text-sm">
                <li>✅ Project created</li>
                <li>👤 Team member added</li>
                <li>📋 Task completed</li>
              </ul>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">

          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowMail(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-1.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-200 font-semibold">
              {user.initials}
            </div>

            <div className="hidden lg:block text-left">
              <h4 className="font-semibold">
                {user.name}
              </h4>

              <p className="text-xs text-gray-500">
                {user.email}
              </p>
            </div>

            <ChevronDown size={16} />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl border bg-white p-3 shadow-xl z-50">

              <button className="w-full rounded-lg px-3 py-2 text-left hover:bg-slate-100">
                My Profile
              </button>

              <button className="w-full rounded-lg px-3 py-2 text-left hover:bg-slate-100">
                Settings
              </button>

              <button
                onClick={switchAccount}
                className="w-full rounded-lg px-3 py-2 text-left hover:bg-slate-100"
              >
                Switch Account
              </button>

              <button
                onClick={() => alert("Logged Out")}
                className="w-full rounded-lg px-3 py-2 text-left text-red-500 hover:bg-red-50"
              >
                Logout
              </button>

            </div>
          )}
        </div>

      </div>

    </header>
  );
};

export default Navbar;