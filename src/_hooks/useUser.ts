"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { useGenselectors } from "@/_lib/store/general-store";
import { UpdateuserData } from "@/types/forms.type";

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

export const useUpdateProfile = () => {
  const openToast = useGenselectors.use.openToast();

  const updateUserMutation = useMutation({
    mutationFn: async ({
      data,
      name,
    }: {
      data: UpdateuserData;
      name: string;
    }) => {
      const res = await api.patch(`/users/${name}/update`, data);
      return res.data;
    },
    onSuccess: () => {
      openToast("Your profile has been updated successfully", 3000);
    },
    onError: () => {
      openToast("Sorry, something went wrong. Please try again later.", 3000);
    },
  });

  return {
    updateUserMutation,
  };
};

export type UpdateUserType = {
  institution: string | null;
  rank: string | null;
};
