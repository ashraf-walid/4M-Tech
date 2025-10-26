import { useState, useEffect } from 'react';
import { NewProducts } from '@/data/NewProducts';
import { BestSellerProducts } from '@/data/BestSeller'; 

export function useCart(cartItems) {

  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  // Calculate subtotal whenever cart items or products change
  useEffect(() => {
    setProducts([...NewProducts,...BestSellerProducts]);
    const total = products.reduce((sum, product) => {
      const quantity = cartItems[product.id] || 0;
      return sum + product.price * quantity;
    }, 0);
    
    setSubtotal(total);
  }, [cartItems, products]);

  // Get cart items with product details
  const cartProducts = products.filter(
    (product) => cartItems[product.id] > 0
  ).map(product => ({
    ...product,
    quantity: cartItems[product.id]
  }));

  return {
    cartProducts,
    subtotal,
    loading,
    error
  };
}