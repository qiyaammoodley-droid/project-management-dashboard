import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import { projects as initialProjects } from "../data/projects";
import type { Project } from "../types/project";

type ProjectInput = {
  name: string;
  description: string;
  deadline: string;
  status?: Project["status"];
  teamMembers?: Project["teamMembers"];
};

type ProjectContextValue = {
  projects: Project[];
  isReady: boolean;
  addProject: (projectInput: ProjectInput) => Project;
  deleteProject: (projectId: number | string) => void;
  importProjects: (projects: Project[]) => void;
  getProjectById: (projectId: number | string) => Project | undefined;
};

const STORAGE_KEY = "project_dashboard_projects";

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

export const ProjectProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setProjects(JSON.parse(stored));
      } else {
        setProjects(initialProjects);
      }
    } catch {
      setProjects(initialProjects);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects, isReady]);

  const addProject = useCallback((projectInput: ProjectInput): Project => {
    const project: Project = {
      id: Date.now(),
      name: projectInput.name,
      description: projectInput.description,
      deadline: projectInput.deadline,
      status: projectInput.status ?? "To Do",
      progress: 0,
      teamMembers: projectInput.teamMembers ?? [],
    };

    setProjects((current) => [project, ...current]);

    return project;
  }, []);

  const deleteProject = useCallback((projectId: number | string) => {
    setProjects((current) =>
      current.filter((project) => Number(project.id) !== Number(projectId))
    );
  }, []);

  const importProjects = useCallback((newProjects: Project[]) => {
    setProjects(newProjects);
  }, []);

  const getProjectById = useCallback(
    (projectId: number | string) =>
      projects.find((project) => project.id === projectId),
    [projects]
  );

  const value = useMemo(
    () => ({
      projects,
      isReady,
      addProject,
      deleteProject,
      importProjects,
      getProjectById,
    }),
    [projects, isReady, addProject, deleteProject, importProjects, getProjectById]
  );

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error(
      "useProjectContext must be used within ProjectProvider"
    );
  }

  return context;
};