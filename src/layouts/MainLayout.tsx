import type { ReactNode } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#f3f5f8] p-4 md:p-6">
      <div className="flex h-[calc(100vh-32px)] overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:h-[calc(100vh-48px)] md:rounded-[28px]">

        {/* Sidebar */}
        <Sidebar />

        {/* Right Content */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-[#f7f8fb] p-5 md:p-6">
            {children}
          </main>

        </div>

      </div>
    </div>
  );
};

export default MainLayout;