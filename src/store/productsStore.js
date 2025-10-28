import { create } from 'zustand';
import { NewProducts } from '@/data/NewProducts';
import { BestSellerProducts } from '@/data/BestSeller'; 

const useProductsStore = create((set, get) => ({
  // State
  products: [...NewProducts, ...BestSellerProducts],
  laptopsList: [],
  accessoriesList: [],
  trending: [],
  trendingLoading: true,
  error: null,

  // Actions
  // getProductDetails: (productId) => {
  //   const state = get();
  //   if (state.products.length === 0) {
  //     set({ error: 'No products available.' });
  //     return null;
  //   }
  //   
  //   set({ error: 'Product not found.' });
  //   return null;
  // },
}));

export default useProductsStore;


