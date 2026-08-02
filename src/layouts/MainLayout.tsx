import { useState } from "react";
import type { ReactNode } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3f5f8] p-2 sm:p-3 md:p-6">
      {/* Mobile drawer overlay */}
      {isSidebarOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
        />
      ) : null}

      {/* Mobile drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-[250px] transform transition-transform duration-200 lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar mode="mobile" onNavigate={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex min-h-[calc(100vh-16px)] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:rounded-[28px] lg:h-[calc(100vh-48px)]">

        {/* Sidebar */}
        <div className="hidden lg:flex">
          <Sidebar mode="desktop" />
        </div>

        {/* Right Content */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* Navbar */}
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-[#f7f8fb] p-3 sm:p-4 md:p-6">
            {children}
          </main>

        </div>

      </div>
    </div>
  );
};

export default MainLayout;