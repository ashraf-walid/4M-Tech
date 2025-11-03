'use client';

import { useEffect } from 'react';
import useCartStore from './cartStore';
import useProductsStore from './productsStore';

function StoreInitializer() {
useEffect(() => {
  const cartStore = useCartStore.getState();
  const productsStore = useProductsStore.getState();

  cartStore.initializeCart();
  productsStore.ensureProductsLoaded();

  const unsubscribeCart = useCartStore.subscribe(
    (state) => state.cartItem,
    () => cartStore.updateCartDetails(productsStore.products)
  );

  const unsubscribeProducts = useProductsStore.subscribe(
    (state) => state.products,
    () => console.log('Products updated')
  );

  return () => {
    unsubscribeCart?.();
    unsubscribeProducts?.();
  };
}, []);

  return null;
}

export default StoreInitializer;