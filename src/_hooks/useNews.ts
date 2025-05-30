"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export const useNews = () => {
  const getNews = async () => {
    const { data } = await api.get(`/news/public/all?page=1`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["news"], // Ensures the query runs only once
    queryFn: getNews,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    news: data?.data?.newsArray || null,
    newsCount: data?.data?.totalNumberOfNews || null,
    isLoading,
    isError,
    refetchNews: refetch,
  };
};

export const useNewsById = (id: string) => {
  const getNews = async () => {
    const { data } = await api.get(`/news/public/${id}`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["news-id", id], // Ensures the query runs only once
    queryFn: getNews,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true,
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    newsid: data?.data || null,
    isLoading,
    isError,
    refetchNews: refetch,
  };
};

export const useNewsUser = () => {
  const getNews = async () => {
    const { data } = await api.get(`/news/user`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["news-user"], // Ensures the query runs only once
    queryFn: getNews,
    staleTime: 0, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    userNewsCount: data?.data?.totalNumberOfNews || null,
    isLoading,
    isError,
    refetchUserNews: refetch,
  };
};
