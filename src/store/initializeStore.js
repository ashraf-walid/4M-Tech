'use client';

import { useEffect } from 'react';
import useCartStore from './cartStore';
import useProductsStore from './productsStore';

function StoreInitializer() {
  useEffect(() => {
    // Initialize cart first
    useCartStore.getState().initializeCart();

    // Initialize products
    // const unsubscribeProducts = useProductsStore.getState().initializeProducts();

    // Subscribe to cart and products changes
    const unsubscribeCart = useCartStore.subscribe(
      (state) => [state.cartItem, useProductsStore.getState().products],
      () => {
        useCartStore.getState().updateCartDetails(useProductsStore.getState().products);
      }
    );

    // Combine cleanup functions
    const cleanup = () => {
      if (typeof unsubscribeCart === 'function') unsubscribeCart();
      // if (typeof unsubscribeProducts === 'function') unsubscribeProducts();
    };

    // Return cleanup function
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  return null;
}

export default StoreInitializer;