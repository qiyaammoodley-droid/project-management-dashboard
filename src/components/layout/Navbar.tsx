import { useState } from "react";
import {
  Bell,
  Mail,
  Menu,
  Search,
  ChevronDown,
} from "lucide-react";
import useProfile from "../../hooks/useProfile";

type NavbarProps = {
  onMenuClick?: () => void;
};

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [showMail, setShowMail] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { profile } = useProfile();

  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "U";

  const switchAccount = () => {
    alert("Account switching is not enabled in this demo.");
    setShowProfile(false);
  };

  return (
    <header className="flex h-16 items-center justify-between gap-2 border-b border-emerald-50 bg-white px-3 sm:gap-3 sm:px-4 md:h-20 md:px-8">

      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={17} />
      </button>

      {/* Search */}
      <div className="relative hidden w-full max-w-lg sm:block">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search task..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-20 text-sm outline-none transition focus:border-emerald-400 md:py-3 md:pr-24"
        />

        <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-500 md:block">
          Ctrl F
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3 md:gap-4">

        <button className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-50 sm:hidden">
          <Search size={17} />
        </button>

        {/* Mail */}
        <div className="relative">
          <button
            onClick={() => {
              setShowMail(!showMail);
              setShowNotifications(false);
              setShowProfile(false);
            }}
            className="rounded-full border border-slate-200 bg-white p-2 hover:bg-slate-100 sm:p-2.5"
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
            className="rounded-full border border-slate-200 bg-white p-2 hover:bg-slate-100 sm:p-2.5"
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
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 sm:gap-3 sm:px-3 sm:py-1.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-200 text-xs font-semibold sm:h-9 sm:w-9 sm:text-sm">
              {initials}
            </div>

            <div className="hidden xl:block text-left">
              <h4 className="font-semibold">
                {profile.name}
              </h4>

              <p className="text-xs text-gray-500">
                {profile.email}
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