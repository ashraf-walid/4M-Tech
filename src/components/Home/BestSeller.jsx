"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useRef, useState, useEffect, useCallback } from "react";
import useCartStore from "@/store/cartStore";
import useProductsStore from "@/store/productsStore";
import Loading from "@/components/feedback/Loading";
import ErrorState from "@/components/feedback/ErrorState";

const BestSeller = () => {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(320);

  const { getBestSellerProducts, ensureProductsLoaded, loading, error } = useProductsStore();
  const { cartItem } = useCartStore();

  useEffect(() => {
    ensureProductsLoaded();
  }, [ensureProductsLoaded]);

  const products = getBestSellerProducts();

  useEffect(() => {
    let resizeTimeout;

    function updateScrollAmount() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (sliderRef.current) {
          const width = sliderRef.current.offsetWidth;
          // هذا السطر يسبب reflow لذا نؤجله عبر timeout
          setScrollAmount(width < 500 ? width * 0.8 : 320);
        }
      }, 200);
    }

    updateScrollAmount();
    window.addEventListener("resize", updateScrollAmount);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", updateScrollAmount);
    };
  }, []);

  const checkScroll = useCallback(() => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    // قراءة خصائص DOM أقل عدد ممكن لتفادي layout thrashing
    const scrollLeft = el.scrollLeft;
    const visibleWidth = el.offsetWidth;
    const totalWidth = el.scrollWidth;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + visibleWidth < totalWidth - 1);
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    checkScroll();
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const { scrollLeft } = sliderRef.current;
    sliderRef.current.scrollTo({
      left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} />;

  return (
    <section className="w-full py-20 bg-white">
      <div className="w-full lg:w-[82%] mx-auto px-4 py-10">
        {/* Container */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#393405] mb-4 leading-[120%] tracking-tight relative inline-block">
            <span className="relative z-10">أفضل المبيعات</span>
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[90%] h-3 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-100 rounded-lg opacity-70 -z-0"></span>
          </h2>
        </div>
        {/* Slider */}
        <div className="relative">
          <button
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 shadow hover:bg-yellow-100 rounded-full p-2 transition"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="text-xl text-[#393405]" />
          </button>
          {/* content */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth px-2 py-6"
            style={{
              scrollSnapType: "x mandatory",
              willChange: "scroll-position",
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE and Edge */,
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none; /* Chrome, Safari and Opera */
              }
            `}</style>
            {Array.isArray(products)
              ? products.map((product, index) => {
                  const quantity = cartItem[product._id] || 0;
                  const isInCart = quantity > 0;
                  const getProductQuantity = (_id) => cartItem[_id] || 0;
                  return (
                    <div
                      key={product._id}
                      className="min-w-[280px] max-w-[320px] flex-shrink-0 transition-shadow duration-300 hover:shadow-2xl hover:-translate-y-1.5"
                      style={{ scrollSnapAlign: "start" }}
                    >
                      <ProductCard
                        product={product}
                        isInCart={isInCart}
                        getProductQuantity={getProductQuantity}
                      />
                    </div>
                  );
                })
              : null}
          </div>
          <button
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 shadow hover:bg-yellow-100 rounded-full p-2 transition"
            onClick={() => scroll("right")}
            style={{ display: canScrollRight ? "block" : "none" }}
          >
            <ChevronRight className="text-xl text-[#393405]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
