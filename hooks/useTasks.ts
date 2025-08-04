import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, ApiTask } from "../services/api";

export const useTasks = (userId: string) => {
  return useQuery({
    queryKey: ["tasks", userId],
    queryFn: () => api.getTasks(userId),
    enabled: !!userId,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createTask,
    onSuccess: (newTask) => {
      queryClient.setQueryData(
        ["tasks", newTask.userId],
        (old: ApiTask[] = []) => [...old, newTask]
      );
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      updates,
    }: {
      taskId: string;
      updates: Partial<ApiTask>;
    }) => api.updateTask(taskId, updates),
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(
        ["tasks", updatedTask.userId],
        (old: ApiTask[] = []) =>
          old.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteTask,
    onSuccess: (_, taskId) => {
      queryClient.setQueryData(["tasks"], (old: ApiTask[] = []) =>
        old.filter((task) => task.id !== taskId)
      );
    },
  });
};
