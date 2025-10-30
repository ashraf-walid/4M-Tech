"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import useCartStore from "@/store/cartStore";
import useProductsStore from "@/store/productsStore";

import ImageGallery from "@/components/productDetail/ImageGallery";
import ProductInfo from "@/components/productDetail/ProductInfo";
import ProductActions from "@/components/productDetail/ProductActions";
import SpecificationTable from "@/components/productDetail/SpecificationTable";
// import CheckoutModal from "@/components/checkout/CheckoutModal";

export default function ProductDetails() {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [isProcessing, setIsProcessing] = useState(false);
  // const [isBuying, setIsBuying] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const { addToCart, cartItem } = useCartStore();
  const { products } = useProductsStore();

  // get product details
  useEffect(() => {
    const fetchProduct = () => {
      if (!id) {
        setErrorMsg("معرف المنتج غير صحيح");
        setIsLoading(false);
        setTimeout(() => router.push("/"), 2000);
        return;
      }
      setIsLoading(true);
      setErrorMsg("");
      let localProduct = null;
      localProduct = products.find((p) => p.id === id);
      if (localProduct) {
        setProduct(localProduct);
      } else {
        setErrorMsg("المنتج غير موجود");
        setTimeout(() => router.push(config.path), 2000);
      }
      setIsLoading(false);
    };

    fetchProduct();
  }, [id, router]);

  // const handleBuyNow = () => {
  //   setIsBuying(true);
  // };

  const handleAddToCart = () => {
    addToCart(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            المنتج غير موجود
          </h2>
          <p className="mt-2 text-gray-600">
            المنتج الذي تبحث عنه غير موجود أو تم حذفه.
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            العودة إلى الرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="ltr"
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {errorMsg && (
          <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded text-center text-base font-semibold">
            {errorMsg}
          </div>
        )}
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                <Home className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="h-5 w-5 text-gray-400" />
                <Link
                  href="/"
                  className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  الرئيسية
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm font-medium text-gray-500">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <ImageGallery
              images={product.images || []}
              productName={product.name || "غير معروف"}
            />
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
              <ProductInfo
                name={product.name || "غير معروف"}
                description={product.description || "لا يوجد وصف متاح"}
                brand={product.brand || "غير معروف"}
                price={product.price || 0}
              />

              <div className="border-t border-gray-100 pt-6">
                <ProductActions
                  onAddToCart={handleAddToCart}
                  // onToggleFavorite={handleToggleFavorite}
                  // onBuyNow={handleBuyNow}
                  cartItemCount={cartItem[product.id] || 0}
                  // isFavorite={isFavoriteProduct}
                  // isProcessing={isProcessing}
                  // isInBuyingProcess={isBuying}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                المواصفات
              </h2>
              <SpecificationTable
                specifications={Object.entries(product.specs || {}).map(
                  ([key, value]) => ({
                    placeholder: key,
                    value, 
                  })
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* {isBuying && (
        <CheckoutModal onClose={() => setIsBuying(false)} product={product} />
      )} */}
    </div>
  );
}
