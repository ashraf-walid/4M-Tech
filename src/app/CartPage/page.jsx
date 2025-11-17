'use client';

import { ShoppingBag } from 'lucide-react';
import CartEmpty from '@/components/cart/CartEmpty';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import CartError from '@/components/cart/CartError';
import CartLoading from '@/components/cart/CartLoading';
import useCartStore from '@/store/cartStore';
import useProductsStore from '@/store/productsStore';
import Header from "@/components/Header/index";
import Footer from "@/components/footer/Footer";
import { useEffect } from 'react';

export default function CartPage() {
  const { 
    cartItem, 
    cartProducts,
    subtotal,
    loading,
    error
  } = useCartStore();
  const { products } = useProductsStore();

  useEffect(() => {
    // Update cart products and subtotal when cart or products change
    const updateCartDetails = () => {
      const productsInCart = (products || [])
        .filter((product) => cartItem[product?._id] > 0)
        .map(product => ({
          ...product,
          quantity: cartItem[product._id]
        }));

      const newSubtotal = productsInCart.reduce(
        (total, product) => total + (product.price || 0) * (product.quantity || 0),
        0
      );

      useCartStore.setState({ 
        cartProducts: productsInCart,
        subtotal: newSubtotal
      });
    };

    updateCartDetails();
  }, [cartItem, products]);

  if (loading) return <CartLoading />;
  if (error) return <CartError message={error} />;
  if (cartProducts.length === 0) return <CartEmpty />;

  return (
    <>
      <Header/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">سلة المشتريات</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartProducts.map((product) => (
              <CartItem
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                image={product.image}
                quantity={product.quantity}
                category={product.category || product.collection}
              />
            ))}
          </div>

          <div className="lg:col-span-1">
            <CartSummary 
              subtotal={subtotal} 
              itemCount={cartProducts.length} 
            />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}