import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import { tasks as initialTasks } from "../data/tasks";
import type { Task } from "../types/task";

type TaskInput = Omit<Task, "id" | "projectId"> & { projectId?: number };

type TaskContextValue = {
  tasks: Task[];
  isReady: boolean;
  addTask: (task: TaskInput) => Task;
  updateTaskStatus: (taskId: number, status: Task["status"]) => void;
  getTaskById: (taskId: number) => Task | undefined;
};

const STORAGE_KEY = "project_dashboard_tasks";

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Task[];
        setTasks(parsed);
      } else {
        setTasks(initialTasks);
      }
    } catch {
      setTasks(initialTasks);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, isReady]);

  const addTask = useCallback((taskInput: TaskInput): Task => {
    const nextTask: Task = {
      id: Date.now(),
      projectId: taskInput.projectId ?? 1,
      title: taskInput.title,
      description: taskInput.description,
      priority: taskInput.priority,
      status: taskInput.status,
      assignedTo: taskInput.assignedTo,
      dueDate: taskInput.dueDate,
    };

    setTasks((current) => [nextTask, ...current]);
    return nextTask;
  }, []);

  const updateTaskStatus = useCallback((taskId: number, status: Task["status"]) => {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
  }, []);

  const getTaskById = useCallback(
    (taskId: number) => tasks.find((task) => task.id === taskId),
    [tasks]
  );

  const value = useMemo<TaskContextValue>(
    () => ({ tasks, isReady, addTask, updateTaskStatus, getTaskById }),
    [tasks, isReady, addTask, updateTaskStatus, getTaskById]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }

  return context;
};
