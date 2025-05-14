"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export const useReport = () => {
  const getReport = async () => {
    const { data } = await api.get(`/admin/report/general`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-report"], // Ensures the query runs only once
    queryFn: getReport,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    reports: data?.data?.reports || null,
    isLoading,
    isError,
    refetchReport: refetch,
  };
};
