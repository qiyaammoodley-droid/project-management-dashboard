import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import CalendarPage from "../pages/Calendar";
import NewProject from "../pages/NewProject";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";
import TaskDetails from "../pages/tasks/TaskDetails";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect the home page to the dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/projects/new" element={<NewProject />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/tasks" element={<TaskDetails />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;