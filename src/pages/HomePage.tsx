import { useNavigate } from "react-router-dom";
import { FolderKanban, LayoutDashboard } from "lucide-react";

import Button from "../components/ui/Button";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <section className="flex w-full max-w-2xl flex-col items-center justify-center rounded-2xl border border-emerald-100 bg-white p-12 text-center shadow-sm">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <FolderKanban size={32} />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900">Welcome to Donezo</h1>
        <p className="mt-2 text-lg text-slate-500">
          Where all your projects are organized in one place.
        </p>

        <p className="mt-8 max-w-md text-sm text-slate-600">
          Donezo helps you plan, prioritize, and accomplish your tasks efficiently. 
          Get started by viewing your dashboard or creating your first project.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button onClick={() => navigate("/dashboard")}>
            <LayoutDashboard size={16} className="mr-2 inline" />
            Go to Dashboard
          </Button>
          
          <Button variant="outline" onClick={() => navigate("/projects/new")}>
            <FolderKanban size={16} className="mr-2 inline" />
            Create a Project
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;