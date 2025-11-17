"use client";

export const dynamic = "force-dynamic";

import { useState, useMemo, useEffect, Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import FilterSection from "@/components/FilterSection";
import { X } from "lucide-react";
import useCartStore from "@/store/cartStore";
import useProductsStore from "@/store/productsStore";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/feedback/Loading";
import ErrorState from "@/components/feedback/ErrorState";
import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";

function ProductsPageContent() {
  const { cartItem } = useCartStore();
  const { products, ensureProductsLoaded, loading, error } = useProductsStore();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    priceRange: [0, 100000],
    condition: [],
    search: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  ensureProductsLoaded();

  useEffect(() => {
    const categoryFromURL = searchParams.get("category");
    if (categoryFromURL) {
      setFilters((prev) => ({
        ...prev,
        category: [categoryFromURL],
      }));
    }
  }, [searchParams]);

  const isInCart = (productId) => !!cartItem[productId];
  const getProductQuantity = (productId) => cartItem[productId] || 0;
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        filters.category.length === 0 ||
        filters.category.includes(product.category);
      const matchesBrand =
        filters.brand.length === 0 || filters.brand.includes(product.brand);
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      const matchesCondition =
        filters.condition.length === 0 ||
        filters.condition.includes(product.condition);
      const matchesSearch =
        filters.search === "" ||
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.brand?.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description
          ?.toLowerCase()
          .includes(filters.search.toLowerCase());

      return (
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesCondition &&
        matchesSearch
      );
    });
  }, [filters, products]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category.length > 0) count++;
    if (filters.brand.length > 0) count++;
    if (filters.condition.length > 0) count++;
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 100000)
      count++;
    return count;
  }, [filters]);

  const clearAllFilters = () => {
    setFilters({
      category: [],
      brand: [],
      priceRange: [0, 100000],
      condition: [],
      search: "",
    });
  };

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} />;

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              جميع المنتجات
            </h1>
            <p className="text-gray-600">
              اكتشف مجموعتنا الواسعة من المنتجات عالية الجودة
            </p>
          </div>
          <div className="flex flex-col max-sm:items-center lg:flex-row gap-8">
            <aside
              className={`lg:w-80 ${showFilters
                  ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto"
                  : "hidden lg:block"
                }`}
            >
              <div className="lg:sticky lg:top-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">الفلاتر</h2>
                  {showFilters && (
                    <button
                      onClick={() => setShowFilters(false)}
                      className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="إغلاق الفلاتر"
                    >
                      <X size={24} />
                    </button>
                  )}
                </div>

                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="w-full mb-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-semibold"
                  >
                    مسح جميع الفلاتر ({activeFiltersCount})
                  </button>
                )}

                <FilterSection
                  filters={filters}
                  setFilters={setFilters}
                  products={products}
                />
              </div>
            </aside>

            <main className="flex-1">
              <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden px-4 py-2 bg-[#fdf407] hover:bg-[#dfd93e] text-[#393405] font-semibold rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                    الفلاتر
                    {activeFiltersCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {filteredProducts.length}
                    </span>{" "}
                    منتج متاح
                  </p>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    لم نجد أي منتجات
                  </h3>
                  <p className="text-gray-600 mb-6">
                    جرب تغيير الفلاتر أو البحث عن شيء آخر
                  </p>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="px-6 py-3 bg-[#fdf407] hover:bg-[#dfd93e] text-[#393405] font-semibold rounded-lg transition-colors"
                    >
                      مسح جميع الفلاتر
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      isInCart={isInCart(product._id)}
                      getProductQuantity={getProductQuantity}
                    />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">جار التحميل...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
