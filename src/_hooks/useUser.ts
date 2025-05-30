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

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["user"], // Ensures the query runs only once
    queryFn: getUser,
    staleTime: 0, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    user: data?.data || null,
    isLoading,
    isError,
    isFetching,
    refetchUser: refetch,
  };
};

export const useUpdateProfile = (refetchUser: () => void) => {
  const openToast = useGenselectors.use.openToast();

  const updateUserMutation = useMutation({
    mutationFn: async (data: UpdateuserData) => {
      const res = await api.patch(`/users/update`, data);
      return res.data;
    },
    onSuccess: () => {
      refetchUser();
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
