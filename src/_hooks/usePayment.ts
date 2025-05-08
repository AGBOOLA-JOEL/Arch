"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export const usePaymentStatus = () => {
  const getPayStatus = async () => {
    const { data } = await api.get(`/payment/history`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["payment-status"], // Ensures the query runs only once
    queryFn: getPayStatus,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    paystatus: data?.data?.payments || null,
    isLoading,
    isError,
    refetchPayStatus: refetch,
  };
};

export const usePaymentStatusId = (id: any) => {
  const getProStatus = async () => {
    const { data } = await api.get(`/payment/${id}`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["payment-statusid", id], // Ensures the query runs only once
    queryFn: getProStatus,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    payid: data?.data || null,
    status: data?.data?.paymentStatus,
    isLoading,
    isError,
    refetchPayStatusId: refetch,
  };
};
