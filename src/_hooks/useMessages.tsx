"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useGenselectors } from "@/_lib/store/general-store";

export const useMessages = () => {
  const getMessages = async () => {
    const { data } = await api.get(`/messages/messages/all`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["messages"], // Ensures the query runs only once
    queryFn: getMessages,
    staleTime: 0, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    messages: data?.data?.messages || null,
    isLoading,
    isError,
    refetchMessages: refetch,
  };
};

export const useMsgById = (id: string) => {
  const getMsg = async () => {
    const { data } = await api.get(`/messages/message/${id}`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["msg-id", id], // Ensures the query runs only once
    queryFn: getMsg,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true,
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    msgid: data?.data || null,
    isLoading,
    isError,
    refetchMsg: refetch,
  };
};

export const useReadMessage = (refetchMsg: () => void) => {
  const openToast = useGenselectors.use.openToast();
  const readmsgMutation = useMutation({
    mutationFn: async (id) => {
      const res = await api.get(`/messages/message/${id}/read`);
      return res.data;
    },
    onSuccess: () => {
      refetchMsg();
      // openToast("Your message has been read", 3000);
    },
    onError: (err: any) => {
      openToast(err?.response?.data.message, 3000);
    },
  });

  return {
    readmsgMutation,
  };
};
