// Mock API service - replace with real API endpoints
export interface ApiTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: "work" | "personal" | "shopping" | "health";
  priority: "low" | "medium" | "high";
  createdAt: string;
  dueDate?: string;
  userId: string;
}

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Mock data storage
let mockTasks: ApiTask[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Write and submit the Q1 project proposal",
    completed: false,
    category: "work",
    priority: "high",
    createdAt: new Date().toISOString(),
    userId: "user1",
  },
  {
    id: "2",
    title: "Buy groceries",
    description: "Milk, bread, eggs, fruits",
    completed: false,
    category: "shopping",
    priority: "medium",
    createdAt: new Date().toISOString(),
    userId: "user1",
  },
];

let mockUser: ApiUser = {
  id: "user1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://via.placeholder.com/100",
};

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Auth endpoints
  async login(email: string, password: string): Promise<ApiUser> {
    await delay(1000);
    if (email === "demo@example.com" && password === "password") {
      return mockUser;
    }
    throw new Error("Invalid credentials");
  },

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<ApiUser> {
    await delay(1000);
    const newUser: ApiUser = {
      id: Date.now().toString(),
      name,
      email,
    };
    mockUser = newUser;
    return newUser;
  },

  // Task endpoints
  async getTasks(userId: string): Promise<ApiTask[]> {
    await delay(500);
    return mockTasks.filter((task) => task.userId === userId);
  },

  async createTask(task: Omit<ApiTask, "id" | "createdAt">): Promise<ApiTask> {
    await delay(500);
    const newTask: ApiTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    mockTasks.push(newTask);
    return newTask;
  },

  async updateTask(
    taskId: string,
    updates: Partial<ApiTask>
  ): Promise<ApiTask> {
    await delay(500);
    const taskIndex = mockTasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) throw new Error("Task not found");

    mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...updates };
    return mockTasks[taskIndex];
  },

  async deleteTask(taskId: string): Promise<void> {
    await delay(500);
    mockTasks = mockTasks.filter((task) => task.id !== taskId);
  },

  // User endpoints
  async getProfile(userId: string): Promise<ApiUser> {
    await delay(500);
    return mockUser;
  },

  async updateProfile(
    userId: string,
    updates: Partial<ApiUser>
  ): Promise<ApiUser> {
    await delay(500);
    mockUser = { ...mockUser, ...updates };
    return mockUser;
  },
};
