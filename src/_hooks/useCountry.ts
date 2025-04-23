"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export const useCountry = () => {
  const getCountry = async () => {
    const { data } = await api.get(`/countries/all`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["country"], // Ensures the query runs only once
    queryFn: getCountry,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    country: data?.data || null,
    isLoading,
    isError,
    refetchCountry: refetch,
  };
};
