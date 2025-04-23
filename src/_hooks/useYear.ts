"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export const useYear = () => {
  const getYear = async () => {
    const { data } = await api.get(`/year`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["year"], // Ensures the query runs only once
    queryFn: getYear,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    year: data || null,
    isLoading,
    isError,
    refetchYear: refetch,
  };
};
