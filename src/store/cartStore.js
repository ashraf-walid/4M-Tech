'use client';

import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  // State
  cartItem: (() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cartItems') || null;
      return storedCart ? JSON.parse(storedCart) : {};
    }
    return {};
  })(),
  cartProducts: [],
  subtotal: 0,
  cartItemCount: 0,
  error: null,

  // Actions
  setCartItem: (newCart) => {
    set({ cartItem: newCart });
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(newCart));
    }
  },

  addToCart: (itemId) => {
    if (!itemId) {
      set({ error: 'Invalid itemId provided' });
      return;
    }
    set((state) => {
      const newCart = {
        ...state.cartItem,
        [itemId]: (state.cartItem[itemId] || 0) + 1,
      };
      const newCount = Object.values(newCart).filter(value => value > 0).length;
      localStorage.setItem('cartItems', JSON.stringify(newCart));
      return {
        cartItem: newCart,
        cartItemCount: newCount,
        error: null,
      };
    });
  },

  removeFromCart: (itemId) => {
    set((state) => {
      const updatedCart = { ...state.cartItem };
      delete updatedCart[itemId];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      const newCount = Object.values(updatedCart).filter(value => value > 0).length;
      return {
        cartItem: updatedCart,
        cartItemCount: newCount,
        error: null,
      };
    });
  },

  DecreaseTheQuantityOfProduct: (itemId) => {
    set((state) => {
      const updatedCart = { ...state.cartItem };
      const currentQuantity = updatedCart[itemId] || 0;
      const newQuantity = Math.max(currentQuantity - 1, 0);
      updatedCart[itemId] = newQuantity;
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return {
        cartItem: updatedCart,
        error: null,
      };
    });
  },

  updateQuantityCartItem: (itemId, newAmount) => {
    const updatedCart = { ...get().cartItem, [itemId]: newAmount };
    if (newAmount === 0) {
      delete updatedCart[itemId];
    }
    get().setCartItem(updatedCart);
    set({ error: null });
  },

  clearCart: () => {
    set({ cartItem: {}, cartItemCount: 0, error: null });
    localStorage.removeItem('cartItems');
  },

  updateCartDetails: (products) => {
    const { cartItem } = get();
    const productsInCart = products
      .filter((product) => cartItem[product._id] > 0)
      .map((product) => ({
        ...product,
        quantity: cartItem[product._id],
      }));
    const total = productsInCart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    set({
      cartProducts: productsInCart,
      subtotal: total,
      cartItemCount: Object.values(cartItem).filter(value => value > 0).length,
      error: null,
    });
  },

  initializeCart: () => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      set({ cartItem: parsedCart });
      const count = Object.values(parsedCart).filter(value => value > 0).length;
      set({ cartItemCount: count, error: null });
    }
  },
}));

export default useCartStore;