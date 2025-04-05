"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export const useUser = () => {
  const getUser = async () => {
    const { data } = await api.get(`/users/details`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["user"], // Ensures the query runs only once
    queryFn: getUser,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    user: data?.data || null,
    isLoading,
    isError,
    refetchUser: refetch,
  };
};
