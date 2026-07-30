import type { ReactNode } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">
      <div className="flex h-[calc(100vh-48px)] overflow-hidden rounded-[30px] bg-white shadow-lg">

        {/* Sidebar */}
        <Sidebar />

        {/* Right Content */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-[#F5F7FA] p-8">
            {children}
          </main>

        </div>

      </div>
    </div>
  );
};

export default MainLayout;