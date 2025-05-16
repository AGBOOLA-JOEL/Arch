"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export const useSubscription = () => {
  const getSubscription = async () => {
    const { data } = await api.get(`/admin/subscriptions/all`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-subscribe"], // Ensures the query runs only once
    queryFn: getSubscription,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    subscriptions: data?.data?.usersSubscriptions || null,
    isLoading,
    isError,
    refetchSubscription: refetch,
  };
};
