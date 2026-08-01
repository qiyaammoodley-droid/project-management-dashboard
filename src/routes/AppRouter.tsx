import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import NewProject from "../pages/NewProject";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";
import TaskDetails from "../pages/tasks/TaskDetails";
import HomePage from "../pages/HomePage";
import Team from "../pages/Team";
import Analytics from "../pages/Analytics";
import Calendar from "../pages/Calendar";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect the home page to the dashboard */}
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/projects/new" element={<NewProject />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/tasks" element={<TaskDetails />} />
        <Route path="/team" element={<Team />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;