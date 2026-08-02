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

type TaskInput = Omit<Task, "id" | "projectId"> & { projectId?: number | string };

type TaskContextValue = {
  tasks: Task[];
  isReady: boolean;
  addTask: (task: TaskInput) => Task;
  deleteTask: (taskId: number | string) => void;
  deleteTasksByProjectId: (projectId: number | string) => void;
  updateTaskStatus: (taskId: number | string, status: Task["status"]) => void;
  toggleTaskComplete: (taskId: number | string) => void;
  getTaskById: (taskId: number | string) => Task | undefined;
};

const STORAGE_KEY = "project_dashboard_tasks";

const shiftDateByRecurrence = (
  sourceDate: string,
  recurrence: Task["recurrence"],
  offset: number
) => {
  const base = new Date(sourceDate);

  if (Number.isNaN(base.getTime())) {
    return sourceDate;
  }

  if (recurrence === "Daily") {
    base.setDate(base.getDate() + offset);
  }

  if (recurrence === "Weekly") {
    base.setDate(base.getDate() + offset * 7);
  }

  if (recurrence === "Monthly") {
    base.setMonth(base.getMonth() + offset);
  }

  return base.toISOString().slice(0, 10);
};

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setTasks(JSON.parse(stored));
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
    if (!isReady) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, isReady]);

  const addTask = useCallback((taskInput: TaskInput): Task => {
    const occurrenceCount =
      taskInput.recurrence && taskInput.recurrence !== "None" && taskInput.dueDate
        ? Math.max(1, Number(taskInput.recurrenceCount || 1))
        : 1;

    const baseId = Date.now();

    const generatedTasks: Task[] = Array.from(
      { length: occurrenceCount },
      (_, index) => ({
        id: baseId - index,
        projectId: taskInput.projectId ?? 1,
        title: taskInput.title,
        description: taskInput.description,
        priority: taskInput.priority,
        status: taskInput.status,
        recurrence: taskInput.recurrence ?? "None",
        recurrenceCount: taskInput.recurrenceCount ?? 1,
        assignedTo: taskInput.assignedTo,
        dueDate:
          taskInput.dueDate && taskInput.recurrence && taskInput.recurrence !== "None"
            ? shiftDateByRecurrence(taskInput.dueDate, taskInput.recurrence, index)
            : taskInput.dueDate,
        createdAt: new Date().toISOString(),
      })
    );

    setTasks((current) => [...generatedTasks, ...current]);

    return generatedTasks[0];
  }, []);

  const deleteTask = useCallback((taskId: number | string) => {
    setTasks((current) =>
      current.filter((task) => Number(task.id) !== Number(taskId))
    );
  }, []);

  const deleteTasksByProjectId = useCallback((projectId: number | string) => {
    setTasks((current) =>
      current.filter((task) => Number(task.projectId) !== Number(projectId))
    );
  }, []);

  const updateTaskStatus = useCallback(
    (taskId: number | string, status: Task["status"]) => {
      setTasks((current) =>
        current.map((task) =>
          task.id === taskId ? { ...task, status } : task
        )
      );
    },
    []
  );

  const toggleTaskComplete = useCallback((taskId: number | string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === "Completed"
                  ? "To Do"
                  : "Completed",
            }
          : task
      )
    );
  }, []);

  const getTaskById = useCallback(
    (taskId: number | string) =>
      tasks.find((task) => task.id === taskId),
    [tasks]
  );

  const value = useMemo(
    () => ({
      tasks,
      isReady,
      addTask,
      deleteTask,
      deleteTasksByProjectId,
      updateTaskStatus,
      toggleTaskComplete,
      getTaskById,
    }),
    [
      tasks,
      isReady,
      addTask,
      deleteTask,
      deleteTasksByProjectId,
      updateTaskStatus,
      toggleTaskComplete,
      getTaskById,
    ]
  );

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }

  return context;
};