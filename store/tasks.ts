import { atom } from "jotai";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: "work" | "personal" | "shopping" | "health";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  dueDate?: Date;
}

export const tasksAtom = atom<Task[]>([]);
export const selectedCategoryAtom = atom<string>("all");

// Derived atoms
export const completedTasksAtom = atom((get) =>
  get(tasksAtom).filter((task) => task.completed)
);

export const pendingTasksAtom = atom((get) =>
  get(tasksAtom).filter((task) => !task.completed)
);

export const filteredTasksAtom = atom((get) => {
  const tasks = get(tasksAtom);
  const category = get(selectedCategoryAtom);

  if (category === "all") return tasks;
  return tasks.filter((task) => task.category === category);
});

// Task actions
export const addTaskAtom = atom(
  null,
  (get, set, newTask: Omit<Task, "id" | "createdAt">) => {
    const tasks = get(tasksAtom);
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    set(tasksAtom, [...tasks, task]);
  }
);

export const toggleTaskAtom = atom(null, (get, set, taskId: string) => {
  const tasks = get(tasksAtom);
  const updatedTasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  set(tasksAtom, updatedTasks);
});

export const deleteTaskAtom = atom(null, (get, set, taskId: string) => {
  const tasks = get(tasksAtom);
  set(
    tasksAtom,
    tasks.filter((task) => task.id !== taskId)
  );
});
