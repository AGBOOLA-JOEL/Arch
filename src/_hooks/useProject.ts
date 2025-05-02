"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export const useProject = (pageSize: number) => {
  const getProject = async () => {
    const { data } = await api.get(`/projects/public/all?pageSize=${pageSize}`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["project"], // Ensures the query runs only once
    queryFn: getProject,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    projects: data?.data?.projects || null,
    isLoading,
    isError,
    refetchProject: refetch,
  };
};

export const useProjectById = (
  type: string,
  id: string,
  enabled: boolean = true
) => {
  const getProjectById = async () => {
    const { data } = await api.get(`/projects/public/${type}/${id}`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["project-id", type, id],
    queryFn: getProjectById,
    enabled: !!type && !!id && enabled,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    project: data?.data || null,
    isLoading,
    isError,
    refetchProject: refetch,
  };
};
