"use client";

import { create } from "zustand";

const useProductsStore = create((set, get) => ({
  products: [],
  loading: true,
  error: null,

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      set({ products: data, loading: false, error: null });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  ensureProductsLoaded: async () => {
    const { products, fetchProducts, loading } = get();
    if (products.length === 0 && loading) {
      await fetchProducts();
    }
  },
}));

export default useProductsStore;
