"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export const useAnalyticsUser = () => {
  const getAnalytics = async () => {
    const { data } = await api.get(`/admin/analytics/user`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["analytics-user"], // Ensures the query runs only once
    queryFn: getAnalytics,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    userAnalytics: data?.data || null,
    isLoading,
    isError,
    refetchAnalyticsUser: refetch,
  };
};

export const useAnalyticsProject = () => {
  const getAnalytics = async () => {
    const { data } = await api.get(`/admin/analytics/projects`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["analytics-projects"], // Ensures the query runs only once
    queryFn: getAnalytics,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    projectsAnalytics: data?.data || null,
    isLoading,
    isError,
    refetchAnalyticsProjects: refetch,
  };
};
