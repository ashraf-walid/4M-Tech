"use client";

import { create } from "zustand";

const useProductsStore = create((set, get) => ({
  products: [],
  newProducts: [],          
  bestSellerProducts: [],   
  loading: false,
  error: null,

  // Delete product
  deleteProduct: async (_id) => {
    const res = await fetch(`/api/products/${_id}`, { method: "DELETE" });
    if (res.ok) {
      set((state) => {
        const updatedProducts = state.products.filter((p) => p._id !== _id);

        return {
          products: updatedProducts,
          newProducts: updatedProducts.filter((p) =>
            p.tags?.some((tag) => tag.includes("new"))
          ),
          bestSellerProducts: updatedProducts.filter((p) =>
            p.tags?.some((tag) => tag.includes("bestseller"))
          ),
        };
      });
    }
  },
  
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
        p.tags?.some((tag) => tag.includes("bestseller"))
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

  // Ensure loaded only once
  ensureProductsLoaded: async () => {
    const { products, loading, fetchProducts } = get();

    if (products.length > 0) return;   // already loaded
    if (loading) return;              // prevent double fetch

    set({ loading: true });
    await fetchProducts();
  },
  
  getBestSellerProducts: () => get().bestSellerProducts,
  getNewProducts: () => get().newProducts,
}));

export default useProductsStore;
