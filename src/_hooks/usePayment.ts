"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useGenselectors } from "@/_lib/store/general-store";
import { useRouter } from "next/navigation";
import useModalStore from "@/_lib/store/modal-store";
import { UpgradePaymentData } from "@/types/forms.type";

export const usePaymentStatus = () => {
  const getPayStatus = async () => {
    const { data } = await api.get(`/payment/history`);
    return data;
  };

  const { data, isLoading, isError, refetch, isSuccess } = useQuery({
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
    isSuccess,
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
export const usePaymentReceipt = () => {
  const openToast = useGenselectors.use.openToast();
  const router = useRouter();

  const confirmMutation = useMutation({
    mutationFn: async (data: UpgradePaymentData) => {
      const res = await api.post(`/payment/confirmation`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: (res) => {
      // openToast(res?.data?.message, 3000);
      setTimeout(() => {
        router.push(`/dashboard/payment/${res?.paymentId}`);
      }, 4000);
    },
    onError: (err: any) => {
      openToast(err?.response?.data.message, 3000);
    },
  });

  return {
    confirmMutation,
  };
};
export const useAdminPayment = () => {
  const getPayment = async () => {
    const { data } = await api.get(`/admin/payments`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-payment"], // Ensures the query runs only once
    queryFn: getPayment,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    payments: data?.data?.payments || null,
    pendingPayments: data?.data?.payments?.filter(
      (data: any) =>
        data?.paymentStatus === "PENDING" ||
        data?.paymentStatus === "UNDER-REVIEW"
    ),
    rejectedPayments: data?.data?.payments?.filter(
      (data: any) => data.paymentStatus === "REJECTED"
    ),
    isLoading,
    isError,
    refetchPayment: refetch,
  };
};

export const useAdminReference = (ref: any) => {
  const getAdminRef = async () => {
    const { data } = await api.get(`/admin/payments/details/${ref}`);
    return data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-statusref", ref], // Ensures the query runs only once
    queryFn: getAdminRef,
    staleTime: Infinity, // Prevents automatic background refetching
    enabled: true, // Ensures it runs only once on mount
    refetchOnWindowFocus: false, // Prevents refetching when tab is focused
    refetchOnReconnect: false, // Prevents refetching when internet reconnects
  });

  return {
    adminref: data?.data || null,
    status: data?.data?.paymentStatus,
    isLoading,
    isError,
    refetchAdminRef: refetch,
  };
};

export const useActionPayment = () => {
  const openToast = useGenselectors.use.openToast();
  const router = useRouter();
  const { closeModal } = useModalStore();

  const confirmMutation = useMutation({
    mutationFn: async (ref: any) => {
      const res = await api.patch(
        `/admin/payments/confirmation/subscription/${ref}`,
        {
          paymentReference: ref,
        }
      );
      return res.data;
    },
    onSuccess: (res) => {
      // closeModal();

      router.push("/admin/subscription");
      openToast(res?.data?.message, 3000);
    },
    onError: (err: any) => {
      // closeModal();
      openToast(err?.response?.data.message, 3000);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ data, ref }: { data: any; ref: string }) => {
      const res = await api.post(`/admin/payments/reject/${ref}`, {
        rejectionReason: data,
      });
      return res.data;
    },
    onSuccess: () => {
      // closeModal();
      router.push("/admin/payment/rejected");
      closeModal();
      // openToast(res?.data?.message, 3000);
    },
    onError: (err: any) => {
      // closeModal();
      openToast(err?.response?.data.message, 3000);
    },
  });

  return {
    confirmMutation,
    rejectMutation,
  };
};
