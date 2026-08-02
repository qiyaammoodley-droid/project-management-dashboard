import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  Mail,
  Menu,
  Search,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import useProjects from "../../hooks/useProjects";
import useTasks from "../../hooks/useTasks";
import useProfile from "../../hooks/useProfile";
import { users } from "../../data/users";

type NavbarProps = {
  onMenuClick?: () => void;
};

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const navigate = useNavigate();
  const { projects } = useProjects();
  const { tasks } = useTasks();

  const [showMail, setShowMail] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
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

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleCommandShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
        setShowSearchResults(true);
      }
    };

    window.addEventListener("keydown", handleCommandShortcut);

    return () => {
      window.removeEventListener("keydown", handleCommandShortcut);
    };
  }, []);

  const query = searchQuery.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!query) {
      return {
        projectResults: [] as Array<{ id: number | string; label: string; subLabel: string }>,
        taskResults: [] as Array<{ id: number | string; label: string; subLabel: string }>,
        assigneeResults: [] as Array<{ label: string; subLabel: string }>,
        statusResults: [] as Array<{ label: string; subLabel: string }>,
      };
    }

    const projectResults = projects
      .filter(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          (project.description || "").toLowerCase().includes(query) ||
          project.status.toLowerCase().includes(query)
      )
      .slice(0, 4)
      .map((project) => ({
        id: project.id,
        label: project.name,
        subLabel: `Project • ${project.status}`,
      }));

    const taskResults = tasks
      .filter((task) => {
        const assigneeName =
          users.find((user) => user.id === task.assignedTo)?.name.toLowerCase() || "";

        return (
          task.title.toLowerCase().includes(query) ||
          (task.description || "").toLowerCase().includes(query) ||
          task.status.toLowerCase().includes(query) ||
          task.priority.toLowerCase().includes(query) ||
          assigneeName.includes(query)
        );
      })
      .slice(0, 6)
      .map((task) => ({
        id: task.id,
        label: task.title,
        subLabel: `Task • ${task.status}`,
      }));

    const assigneeResults = users
      .filter((user) => user.name.toLowerCase().includes(query))
      .slice(0, 4)
      .map((user) => ({
        label: user.name,
        subLabel: "Assignee • Open task list filter",
      }));

    const uniqueStatuses = Array.from(new Set(tasks.map((task) => task.status)));

    const statusResults = uniqueStatuses
      .filter((status) => status.toLowerCase().includes(query))
      .slice(0, 4)
      .map((status) => ({
        label: status,
        subLabel: "Status • Open task list filter",
      }));

    return {
      projectResults,
      taskResults,
      assigneeResults,
      statusResults,
    };
  }, [projects, query, tasks]);

  const hasSearchResults =
    searchResults.projectResults.length > 0 ||
    searchResults.taskResults.length > 0 ||
    searchResults.assigneeResults.length > 0 ||
    searchResults.statusResults.length > 0;

  const openTaskFilter = (value: string) => {
    navigate(`/tasks?q=${encodeURIComponent(value)}`);
    setShowSearchResults(false);
    setSearchQuery("");
  };

  const openTask = (taskId: number | string) => {
    navigate(`/tasks/${taskId}`);
    setShowSearchResults(false);
    setSearchQuery("");
  };

  const openProject = (projectId: number | string) => {
    navigate(`/projects/${projectId}`);
    setShowSearchResults(false);
    setSearchQuery("");
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
      <div ref={searchContainerRef} className="relative hidden w-full max-w-2xl sm:block">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setShowSearchResults(true);
          }}
          onFocus={() => setShowSearchResults(true)}
          placeholder="Search projects, tasks, assignees, status..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-20 text-sm outline-none transition focus:border-emerald-400 md:py-3 md:pr-24"
        />

        <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-500 md:block">
          Ctrl K
        </span>

        {showSearchResults ? (
          <div className="absolute left-0 right-0 z-50 mt-2 max-h-[380px] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
            {query ? (
              hasSearchResults ? (
                <div className="space-y-2">
                  {searchResults.projectResults.length ? (
                    <div>
                      <p className="px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        Projects
                      </p>
                      {searchResults.projectResults.map((result) => (
                        <button
                          key={`project-${result.id}`}
                          type="button"
                          onClick={() => openProject(result.id)}
                          className="flex w-full items-start justify-between rounded-lg px-2 py-2 text-left hover:bg-slate-50"
                        >
                          <span className="text-sm font-medium text-slate-800">{result.label}</span>
                          <span className="text-xs text-slate-500">{result.subLabel}</span>
                        </button>
                      ))}
                    </div>
                  ) : null}

                  {searchResults.taskResults.length ? (
                    <div>
                      <p className="px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        Tasks
                      </p>
                      {searchResults.taskResults.map((result) => (
                        <button
                          key={`task-${result.id}`}
                          type="button"
                          onClick={() => openTask(result.id)}
                          className="flex w-full items-start justify-between rounded-lg px-2 py-2 text-left hover:bg-slate-50"
                        >
                          <span className="text-sm font-medium text-slate-800">{result.label}</span>
                          <span className="text-xs text-slate-500">{result.subLabel}</span>
                        </button>
                      ))}
                    </div>
                  ) : null}

                  {searchResults.assigneeResults.length ? (
                    <div>
                      <p className="px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        Assignees
                      </p>
                      {searchResults.assigneeResults.map((result) => (
                        <button
                          key={`assignee-${result.label}`}
                          type="button"
                          onClick={() => openTaskFilter(result.label)}
                          className="flex w-full items-start justify-between rounded-lg px-2 py-2 text-left hover:bg-slate-50"
                        >
                          <span className="text-sm font-medium text-slate-800">{result.label}</span>
                          <span className="text-xs text-slate-500">{result.subLabel}</span>
                        </button>
                      ))}
                    </div>
                  ) : null}

                  {searchResults.statusResults.length ? (
                    <div>
                      <p className="px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        Statuses
                      </p>
                      {searchResults.statusResults.map((result) => (
                        <button
                          key={`status-${result.label}`}
                          type="button"
                          onClick={() => openTaskFilter(result.label)}
                          className="flex w-full items-start justify-between rounded-lg px-2 py-2 text-left hover:bg-slate-50"
                        >
                          <span className="text-sm font-medium text-slate-800">{result.label}</span>
                          <span className="text-xs text-slate-500">{result.subLabel}</span>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <p className="px-2 py-3 text-sm text-slate-500">No results found.</p>
              )
            ) : (
              <p className="px-2 py-3 text-sm text-slate-500">
                Type to search across projects, tasks, assignees, and statuses.
              </p>
            )}
          </div>
        ) : null}
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