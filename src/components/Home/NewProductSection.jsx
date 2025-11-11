"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import useCartStore from "@/store/cartStore";
import useProductsStore from "@/store/productsStore";
import Loading from "@/components/feedback/Loading";
import ErrorState from "@/components/feedback/ErrorState";

const NewProductSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { newProducts, ensureProductsLoaded, loading, error } = useProductsStore();

  const { cartItem } = useCartStore();
  const timerRef = useRef(null);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    ensureProductsLoaded();
  }, [ensureProductsLoaded]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newProducts.length);
    resetTimer();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newProducts.length) % newProducts.length);
    resetTimer();
  };

  const SLIDE_INTERVAL = 2000;

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (
      isAutoPlaying &&
      isDocumentVisible &&
      !prefersReducedMotion &&
      newProducts.length > 1
    ) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % newProducts.length);
      }, SLIDE_INTERVAL);
    }
  };

  useEffect(() => {
    if (
      isAutoPlaying &&
      isDocumentVisible &&
      !prefersReducedMotion &&
      newProducts.length > 1
    ) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % newProducts.length);
      }, SLIDE_INTERVAL);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isAutoPlaying, isDocumentVisible, prefersReducedMotion, newProducts.length]);

  // Pause when tab is hidden / resume when visible
  useEffect(() => {
    const handleVisibility = () => {
      setIsDocumentVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    handleVisibility();
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Respect prefers-reduced-motion: reduce
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(!!mql.matches);
    update();
    try {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    } catch {
      // Safari fallback
      mql.addListener(update);
      return () => mql.removeListener(update);
    }
  }, []);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
    resetTimer();
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetTimer();
  };

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} />;
  if (!newProducts || newProducts.length === 0) {
    return (
      <section
        className="w-full py-8 bg-white overflow-hidden"
        aria-label="New products carousel"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#393405]">
              لا توجد منتجات جديدة
            </h2>
          </div>
        </div>
      </section>
    );
  }

  const handleKeyDown = (e) => {
    if (newProducts.length < 1) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    } else if (e.key === " ") {
      e.preventDefault();
      setIsAutoPlaying((p) => !p);
      resetTimer();
    }
  };

  return (
    <section
      className="w-full py-8 bg-white overflow-hidden"
      aria-roledescription="carousel"
      aria-label="New products carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#393405] mb-2 sm:mb-6 md:mb-8 lg:mb-10 leading-[120%] tracking-tight relative inline-block">
            <span className="relative z-10">احدث المنتجات</span>
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[90%] h-3 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-100 rounded-lg opacity-70 -z-0"></span>
          </h2>
        </div>
        <div className="relative px-3 sm:px-8 py-1 md:py-4 lg:py-8">
          <button
            className="absolute left-4 top-1/2 bg-[#fdf407] cursor-pointer -translate-y-1/2 z-10 w-12 h-12 rounded-full  shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            onClick={prevSlide}
            disabled={newProducts.length < 2}
            aria-disabled={newProducts.length < 2}
            aria-label="المنتج السابق"
          >
            <ChevronLeft className=" button-icon" />
          </button>
          {/* Product Card */}
          <div className="relative h-[550px] flex items-center justify-center">
            {newProducts.map((product, index) => {
              const quantity = cartItem[product._id] || 0;
              const isInCart = quantity > 0;
              const getProductQuantity = (_id) => cartItem[_id] || 0;
              return (
                <div
                  key={product._id}
                  className={`absolute top-1/2 left-1/2 transition-all duration-700 ease-in-out`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  // style
                  style={{
                    transform:
                      index === currentSlide
                        ? "translate(-50%, -50%) scale(1)"
                        : index ===
                          (currentSlide - 1 + newProducts.length) % newProducts.length
                        ? "translate(-150%, -50%) scale(0.75)"
                        : index === (currentSlide + 1) % newProducts.length
                        ? "translate(50%, -50%) scale(0.75)"
                        : "translate(-50%, -50%) scale(0.8)",
                    zIndex:
                      index === currentSlide
                        ? 30
                        : index ===
                            (currentSlide - 1 + newProducts.length) %
                            newProducts.length ||
                          index === (currentSlide + 1) % newProducts.length
                        ? 20
                        : 1,
                    opacity: index === currentSlide ? 1 : 0.3,
                    pointerEvents: index === currentSlide ? "auto" : "none",
                    visibility:
                      index === currentSlide ||
                      index ===
                        (currentSlide - 1 + newProducts.length) %
                        newProducts.length ||
                      index === (currentSlide + 1) % newProducts.length
                        ? "visible"
                        : "hidden",
                  }}
                >
                  <ProductCard
                    product={product}
                    isInCart={isInCart}
                    getProductQuantity={getProductQuantity}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="absolute right-4 top-1/2 bg-[#fdf407] cursor-pointer -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            onClick={nextSlide}
            disabled={newProducts.length < 2}
            aria-disabled={newProducts.length < 2}
            aria-label="المنتج التالي"
          >
            <ChevronRight className="button-icon" />
          </button>
        </div>

        {/* Pagination indicators */}
        <div className="flex justify-center space-x-2">
          {newProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 cursor-pointer
                  ${index === currentSlide ? "bg-[#fdf407]" : "bg-gray-300"}`}
              aria-current={index === currentSlide ? "true" : undefined}
              aria-label={`انتقل إلى الشريحة ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewProductSection;
