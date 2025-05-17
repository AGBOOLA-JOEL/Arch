"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useGenselectors } from "@/_lib/store/general-store";
import { useQueryClient } from "@tanstack/react-query";
import useModalStore from "@/_lib/store/modal-store";

export const useProjectStatus = () => {
  const getProStatus = async () => {
    const { data } = await api.get(`/projects/user/all-projects`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["project-status"], // Ensures the query runs only once
    queryFn: getProStatus,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    prostatus: data?.data?.projects || null,
    isLoading,
    isError,
    refetchProStatus: refetch,
  };
};

export const useProjectStatusId = (id: any) => {
  const getProStatus = async () => {
    const { data } = await api.get(`/projects/user/${id}`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["project-statusid", id], // Ensures the query runs only once
    queryFn: getProStatus,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    proid: data?.data || null,
    status: data?.data?.status,
    isLoading,
    isError,
    refetchProStatusId: refetch,
  };
};

export const useAdminProject = () => {
  const getProject = async () => {
    const { data } = await api.get(`/admin/projects/all`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-project"], // Ensures the query runs only once
    queryFn: getProject,
    staleTime: 0, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: true, // Prevents refetching when tab is focused
    refetchOnReconnect: true, // Prevents refetching when internet reconnects
  });

  return {
    adminprojects: data?.data?.projects || null,
    approvedProjects: data?.data?.projects.filter(
      (data: any) => data?.status === "APPROVED"
    ),
    pendingProjects: data?.data?.projects.filter(
      (data: any) => data?.status === "PENDING"
    ),
    rejectedProjects: data?.data?.projects.filter(
      (data: any) => data?.status === "REJECTED"
    ),

    isLoading,
    isError,
    refetchAdminProject: refetch,
  };
};

export const useAdminProjectId = (id: any) => {
  const getProject = async () => {
    const { data } = await api.get(`/admin/projects/single/${id}`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-projectid", id], // Ensures the query runs only once
    queryFn: getProject,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    proid: data?.data || null,
    status: data?.data?.status,
    isLoading,
    isError,
    refetchProStatusId: refetch,
  };
};
export const useActionProject = () => {
  const openToast = useGenselectors.use.openToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { closeModal } = useModalStore();

  const rejectMutation = useMutation({
    mutationFn: async ({ data, id }: { data: any; id: string }) => {
      const res = await api.patch(`/admin/projects/${id}/reject`, {
        reason: data,
      });
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-project"] });
      await queryClient.refetchQueries({ queryKey: ["admin-project"] });
      router.push("/admin/projects/rejected");
      closeModal();
      openToast("Project successfully rejected", 3000);
    },
    onError: (err: any) => {
      // closeModal();
      openToast(err?.response?.data.message, 3000);
    },
  });

  const unpublishMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/admin/projects/${id}/delete`);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-project"] });
      await queryClient.refetchQueries({ queryKey: ["admin-project"] });
      router.push("/admin/projects/approved");
      closeModal();
      openToast("Project unpublished successfully", 3000);
    },
    onError: (err: any) => {
      // closeModal();
      openToast(err?.response?.data.message, 3000);
    },
  });

  return {
    unpublishMutation,
    rejectMutation,
  };
};
