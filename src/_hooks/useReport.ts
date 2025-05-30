"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import useModalStore from "@/_lib/store/modal-store";
import { useRouter } from "next/navigation";
import { useGenselectors } from "@/_lib/store/general-store";

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

export const usePostReport = () => {
  const getReport = async () => {
    const { data } = await api.get(`/admin/report/post`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-postreport"], // Ensures the query runs only once
    queryFn: getReport,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    postReports: data?.data?.reports || null,
    isLoading,
    isError,
    refetchPostReport: refetch,
  };
};

export const usePostReportId = (id: string) => {
  const getReport = async () => {
    const { data } = await api.get(`/admin/report/post/${id}`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-postreport-id", id], // Ensures the query runs only once
    queryFn: getReport,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true,
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    postReportId: data?.data || null,
    isLoading,
    isError,
    refetchPostReportId: refetch,
  };
};

export const usePostReportAction = () => {
  const openToast = useGenselectors.use.openToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { closeModal } = useModalStore();

  const unpublishMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/admin/report/post/${id}`);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-postreport"] });
      await queryClient.refetchQueries({ queryKey: ["admin-postreport"] });
      router.push("/admin/posts/reports");
      closeModal();
      openToast("News unpublished successfully", 3000);
    },
    onError: (err: any) => {
      // closeModal();
      openToast(err?.response?.data.message, 3000);
    },
  });

  return {
    unpublishMutation,
  };
};
