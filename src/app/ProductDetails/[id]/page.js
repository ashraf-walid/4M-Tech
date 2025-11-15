"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import useCartStore from "@/store/cartStore";
import useProductsStore from "@/store/productsStore";
import Header from "@/components/Header/index";
import Footer from "@/components/footer/Footer";

import ImageGallery from "@/components/productDetail/ImageGallery";
import ProductInfo from "@/components/productDetail/ProductInfo";
import ProductActions from "@/components/productDetail/ProductActions";
import SpecificationTable from "@/components/productDetail/SpecificationTable";

export default function ProductDetails() {
  const router = useRouter();
  const params = useParams();
  const _id = params.id;

  const [product, setProduct] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const { addToCart, cartItem } = useCartStore();
  const { products, loading, ensureProductsLoaded, error } = useProductsStore();

  useEffect(() => {
    const loadProduct = async () => {
      // await ensureProductsLoaded();

      if (!_id) {
        setErrorMsg("معرف المنتج غير صحيح");
        setTimeout(() => router.push("/"), 2000);
        return;
      }

      if (loading) return;

      if (!products || products.length === 0) {
        setErrorMsg("تعذر تحميل المنتج");
        return;
      }

      const foundProduct = products.find((p) => String(p._id) === String(_id));

      if (foundProduct) {
        setProduct(foundProduct);
        setErrorMsg("");
      } else {
        setErrorMsg("المنتج غير موجود");
        setTimeout(() => router.push("/"), 2000);
      }
    };

    loadProduct();
  }, [_id, products, router, ensureProductsLoaded, loading]);

  const handleAddToCart = () => {
    addToCart(_id);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) return <p className="text-center text-red-500 my-20">{error}</p>;

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
    <>
      <Header />
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
                mainImage={product.image || null}
                productName={product.name || "Product image"}
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
                    cartItemCount={cartItem[product._id] || 0}
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-xl text-end font-semibold text-gray-900 mb-6">
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
      </div>
      <Footer />
    </>
  );
}
