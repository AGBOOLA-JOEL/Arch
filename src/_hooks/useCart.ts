"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGenselectors } from "@/_lib/store/general-store";
import axios from "axios";
import { api } from "@/services/api";
import { useNavselectors } from "@/_lib/store/nav-store";

export const useCart = () => {
  const openToast = useGenselectors.use.openToast();
  const setCartLength = useNavselectors.use.setCartLength();

  const queryClient = useQueryClient(); // ✅ Add this

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await api.get(`/cart`);
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    select: (data) => {
      // cartData is the result of queryFn
      setCartLength(data?.data?.cart?.length); // ✅ Immediately set cart length
      return data;
    },
  });

  const addToCart = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.get(`/projects/add-to-cart/${id}`);
      return res.data;
    },
    onSuccess: async () => {
      openToast("Project added to cart", 3000);
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      const { data } = await api.get(`/cart`); // ✅ manually fetch cart data after adding
      setCartLength(data?.data?.cart?.length || null);
    },
    onError: (err: any) => {
      openToast(err?.response?.data?.message, 3000);
    },
  });

  return {
    cart: data?.data?.data?.cart || null,
    isLoading,
    isError,
    refetchCart: refetch,
    addToCart,
  };
};
