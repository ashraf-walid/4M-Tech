"use client";

import { create } from "zustand";

const useProductsStore = create((set, get) => ({
  products: [],
  newProducts: [],          
  bestSellerProducts: [],   
  loading: true,
  error: null,



  deleteProduct: async (_id) => {
    const res = await fetch(`/api/products/${_id}`, { method: "DELETE" });
    if (res.ok) {
      set((state) => ({
        products: state.products.filter((p) => p._id !== _id),
      }));
    }
  },
  



  // updateProduct: async (_id, updatedData) => {
  //   const res = await fetch(`/api/products/${_id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(updatedData),
  //   });
  // },

  // --- Fetch products from API ---
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();

      const newProducts = data.filter((p) =>
        p.tags?.some((tag) => tag.includes("new"))
      );
      const bestSellerProducts = data.filter((p) =>
        p.tags?.some((tag) => tag.includes("bestSeller"))
      );

      set({
        products: data,
        newProducts,
        bestSellerProducts,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  ensureProductsLoaded: async () => {
    const { products, fetchProducts } = get();
    if (products.length === 0) {
      await fetchProducts();
    }
  },

  getBestSellerProducts: () => get().bestSellerProducts,
  getNewProducts: () => get().newProducts,
}));

export default useProductsStore;
