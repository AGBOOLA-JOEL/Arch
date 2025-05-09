"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGenselectors } from "@/_lib/store/general-store";
import axios from "axios";
import { api } from "@/services/api";
import { useNavselectors } from "@/_lib/store/nav-store";
import { useEffect } from "react";

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
  });

  useEffect(() => {
    if (data?.data?.cart) {
      setCartLength(data.data.cart.length);
    }
  }, [data?.data?.cart?.length, setCartLength]);

  const addToCart = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.get(`/projects/add-to-cart/${id}`);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      const { data } = await api.get(`/cart`); // ✅ manually fetch cart data after adding
      setCartLength(data?.data?.cart?.length || null);
      openToast("Project added to cart", 3000);
    },
    onError: (err: any) => {
      openToast(err?.response?.data?.message, 3000);
    },
  });

  const deleteCart = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/cart/item/${id}`);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      const { data } = await api.get(`/cart`); // ✅ manually fetch cart data after adding
      setCartLength(data?.data?.cart?.length || null);
      openToast("Project removed from cart", 3000);
    },
    onError: (err: any) => {
      openToast(err?.response?.data?.message, 3000);
    },
  });

  return {
    cart: data?.data?.cart || null,
    isLoading,
    isError,
    refetchCart: refetch,
    addToCart,
    deleteCart,
  };
};
