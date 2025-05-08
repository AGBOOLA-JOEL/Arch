"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export const useProjectStatus = () => {
  const getProStatus = async () => {
    const { data } = await api.get(`/projects/user/all-projects`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["project-status"], // Ensures the query runs only once
    queryFn: getProStatus,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    prostatus: data?.data?.projects || null,
    isLoading,
    isError,
    refetchProStatus: refetch,
  };
};

export const useProjectStatusId = (id: any) => {
  const getProStatus = async () => {
    const { data } = await api.get(`/projects/user/${id}`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["project-statusid", id], // Ensures the query runs only once
    queryFn: getProStatus,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    proid: data?.data || null,
    status: data?.data?.status,
    isLoading,
    isError,
    refetchProStatusId: refetch,
  };
};
