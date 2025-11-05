"use client";

import { create } from "zustand";

const useProductsStore = create((set, get) => ({
  products: [],
  loading: true,
  error: null,
  filterProducts: [],

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

  filterProducts: (tags = []) => {
    const { products } = get();
    if (tags.length === 0) return products;
    return products.filter((product) =>
      product.tags.some((tag) => tags.includes(tag))
    );
  },

  ensureProductsLoaded: async () => {
    const { products, fetchProducts, loading } = get();
    if (products.length === 0 && loading) {
      await fetchProducts();
    }
  },
}));

export default useProductsStore;
