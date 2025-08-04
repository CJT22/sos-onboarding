import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import { api } from "../services/api";
import { userAtom, isLoadingAuthAtom } from "../store/auth";

export const useLogin = () => {
  const setUser = useSetAtom(userAtom);
  const setIsLoading = useSetAtom(isLoadingAuthAtom);

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      api.login(email, password),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (user) => {
      setUser(user);
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });
};

export const useRegister = () => {
  const setUser = useSetAtom(userAtom);
  const setIsLoading = useSetAtom(isLoadingAuthAtom);

  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => api.register(name, email, password),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (user) => {
      setUser(user);
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });
};

export const useProfile = (userId: string) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => api.getProfile(userId),
    enabled: !!userId,
  });
};
