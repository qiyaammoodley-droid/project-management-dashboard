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
	getProjectById: (projectId: number) => Project | undefined;
};

const STORAGE_KEY = "project_dashboard_projects";

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		try {
			const stored = window.localStorage.getItem(STORAGE_KEY);

			if (stored) {
				setProjects(JSON.parse(stored) as Project[]);
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
		if (!isReady) {
			return;
		}

		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
	}, [projects, isReady]);

	const addProject = useCallback((projectInput: ProjectInput): Project => {
		const newProject: Project = {
			id: Date.now(),
			name: projectInput.name,
			description: projectInput.description,
			deadline: projectInput.deadline,
			status: projectInput.status ?? "To Do",
			progress: 0,
			teamMembers: projectInput.teamMembers ?? [],
		};

		setProjects((current) => [newProject, ...current]);
		return newProject;
	}, []);

	const getProjectById = useCallback(
		(projectId: number) => projects.find((project) => project.id === projectId),
		[projects]
	);

	const value = useMemo<ProjectContextValue>(
		() => ({ projects, isReady, addProject, getProjectById }),
		[projects, isReady, addProject, getProjectById]
	);

	return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjectContext = () => {
	const context = useContext(ProjectContext);

	if (!context) {
		throw new Error("useProjectContext must be used within ProjectProvider");
	}

	return context;
};
