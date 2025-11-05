"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import useCartStore from "@/store/cartStore";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import useProductsStore from "@/store/productsStore";
import Loading from "@/components/feedback/Loading";
import ErrorState from "@/components/feedback/ErrorState";
import Link from "next/link";

const NewProductSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { filterProducts, ensureProductsLoaded, loading, error } = useProductsStore();

  const { cartItem, addToCart, removeFromCart } = useCartStore();
  const timerRef = useRef(null);

  useEffect(() => {
    ensureProductsLoaded();
  }, [ensureProductsLoaded]);
  
  const filteredProducts = filterProducts(["new"]);

  // Transform NewProducts data to match new structure
  const products = useMemo(
    () =>
      filteredProducts.map((p, index) => {
        // Compose specs for display (flatten nested specs object)
        const specs = [];
        if (p.specs) {
          if (p.specs.gpu)
            specs.push(`${p.specs.gpu.brand} ${p.specs.gpu.model}`);
          if (p.specs.ram)
            specs.push(`${p.specs.ram.size}GB ${p.specs.ram.type}`);
          if (p.specs.storage)
            specs.push(
              `${p.specs.storage.capacity}${p.specs.storage.unit} ${p.specs.storage.type}`
            );
          if (p.specs.screen)
            specs.push(
              `${p.specs.screen.size}${p.specs.screen.unit} ${p.specs.screen.resolution}`
            );
        }
        if (Array.isArray(p.extraFeatures)) specs.push(...p.extraFeatures);

        return {
          _id: p._id,
          name: p.name,
          brand: p.brand,
          model: p.model,
          category: p.category,
          subCategory: p.subCategory,
          description: p.description,
          image: p.image,
          images: p.images,
          price: p.price ? formatPrice(p.price) : "السعر عند الطلب",
          discount: p.discount,
          stock: p.stock,
          warranty: p.warranty,
          condition: p.condition,
          badge: p.badge || (index < 3 ? "جديد" : "مميز"),
          releaseYear: p.releaseYear,
          specs: specs,
          ports: p.specs && p.specs.ports ? p.specs.ports : [],
          color: p.specs && p.specs.color ? p.specs.color : undefined,
        };
      }),
    [filteredProducts]
  );

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
    resetTimer();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
    resetTimer();
  };

  const SLIDE_INTERVAL = 2000;

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (isAutoPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % products.length);
      }, SLIDE_INTERVAL);
    }
  };

  useEffect(() => {
    if (isAutoPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % products.length);
      }, SLIDE_INTERVAL);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isAutoPlaying, products.length]);

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

  return (
    <section className="w-full py-8 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#393405] mb-2 sm:mb-6 md:mb-8 lg:mb-10 leading-[120%] tracking-tight relative inline-block">
            <span className="relative z-10">احدث المنتجات</span>
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[90%] h-3 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-100 rounded-lg opacity-70 -z-0"></span>
          </h2>
        </div>
        <div className="relative px-3 sm:px-8 py-1 md:py-4 lg:py-8">
          <button
            className="absolute left-4 top-1/2 bg-[#fdf407] cursor-pointer -translate-y-1/2 z-10 w-12 h-12 rounded-full  shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            onClick={prevSlide}
            aria-label="المنتج السابق"
          >
            <ChevronLeft className=" button-icon" />
          </button>
          {/* Product Card */}
          <div className="relative h-[600px] flex items-center justify-center">
            {filteredProducts.map((product, index) => {
              const quantity = cartItem[product._id] || 0;
              const isInCart = quantity > 0;
              const getProductQuantity = (_id) => cartItem[_id] || 0;
              return (
                <div
                  key={product._id}
                  className={`absolute top-1/2 left-1/2 transition-all duration-700 ease-in-out`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transform:
                      index === currentSlide
                        ? "translate(-50%, -50%) scale(1)"
                        : index ===
                          (currentSlide - 1 + products.length) % products.length
                        ? "translate(-150%, -50%) scale(0.75)"
                        : index === (currentSlide + 1) % products.length
                        ? "translate(50%, -50%) scale(0.75)"
                        : "translate(-50%, -50%) scale(0.8)",
                    zIndex:
                      index === currentSlide
                        ? 30
                        : index ===
                            (currentSlide - 1 + products.length) %
                              products.length ||
                          index === (currentSlide + 1) % products.length
                        ? 20
                        : 1,
                    opacity: index === currentSlide ? 1 : 0.3,
                    pointerEvents: index === currentSlide ? "auto" : "none",
                    visibility:
                      index === currentSlide ||
                      index ===
                        (currentSlide - 1 + products.length) %
                          products.length ||
                      index === (currentSlide + 1) % products.length
                        ? "visible"
                        : "hidden",
                  }}
                >
                  <div
                    className={`w-[350px] sm:w-[400px] md:w-[430px] lg:w-[450px]  bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                      index === currentSlide ? "shadow-2xl" : ""
                    }`}
                  >
                    <Link href={`/ProductDetailsPage/${product._id}`}> 
                      <div className="relative h-60 md:h-80 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                        {product.badge && (
                          <span className="absolute top-5 left-5 bg-[#fdf407] text-[#393405] px-4 py-2 rounded-lg text-xs font-bold shadow-md z-10">
                            {product.badge}
                          </span>
                        )}
                        {product.discount > 0 && (
                          <span className="absolute top-5 right-5 bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md z-10">
                            {product.discount}% خصم
                          </span>
                        )}
                        <div
                          className={`w-full h-full transition-transform duration-500 ${
                            index === currentSlide ? "scale-[1.02]" : "scale-100"
                          }`}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </Link>
                    <div className="p-8">
                      <span className="sm:text-sm text-xs font-semibold text-[#7c760f] uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="sm:text-2xl text-xl font-bold text-[#393405] mt-2 mb-3">
                        {product.name}
                      </h3>
                      {(() => {
                        const s = product?.specs;
                        let specsList = Array.isArray(s) ? s : [];
                        if (!Array.isArray(s)) {
                          const gpu = s?.gpu;
                          const ram = s?.ram;
                          const storage = s?.storage;
                          const screen = s?.screen;
                          if (gpu?.brand || gpu?.model) {
                            specsList.push(`${gpu?.brand ?? ""} ${gpu?.model ?? ""}`.trim());
                          }
                          if (ram?.size || ram?.type) {
                            specsList.push(`${ram?.size ?? ""}${ram?.unit ?? ""} ${ram?.type ?? ""}`.trim());
                          }
                          if (storage?.capacity || storage?.type) {
                            specsList.push(`${storage?.capacity ?? ""}${storage?.unit ?? ""} ${storage?.type ?? ""}`.trim());
                          }
                          if (screen?.size || screen?.resolution) {
                            specsList.push(`${screen?.size ?? ""}${screen?.unit ?? ""} ${screen?.resolution ?? ""}`.trim());
                          }
                        }
                        if (Array.isArray(product?.extraFeatures)) {
                          specsList = [...specsList, ...product.extraFeatures];
                        }
                        if (specsList.length === 0) return null;
                        return (
                          <ul className="space-y-1 mb-3">
                            {specsList.map((spec, i) => (
                              <li key={i} className="flex items-start leading-4">
                                <span className="text-green-600 ml-2"> ✓ </span>
                                <span className="text-[#3b3934] text-xs sm:text-sm leading-4">
                                  {spec}
                                </span>
                              </li>
                            ))}
                          </ul>
                        );
                      })()}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {product.ports &&
                          product.ports.map((port, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-700 px-1 py-[2px] rounded text-xs"
                            >
                              {port}
                            </span>
                          ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="sm:text-2xl text-xl font-bold text-[#393405]">
                          {product.price}
                        </span>
                        {isInCart ? (
                          <div className="flex items-center justify-between bg-[#fdf407] rounded-lg overflow-hidden shadow-md">
                            <button
                              onClick={() => addToCart(product._id)}
                              className="px-2 py-1 hover:text-gray-700 transition-colors duration-200 font-bold text-black cursor-pointer"
                              aria-label="أضف كمية أخرى"
                            >
                              +
                            </button>
                            <span className="px-4 py-2 text-[#393405] font-semibold text-lg select-none">
                              {getProductQuantity(product._id)}
                            </span>
                            <button
                              onClick={() => removeFromCart(product._id)}
                              className="px-4 py-2 text-[#393405] transition-colors duration-200 cursor-pointer"
                              aria-label="حذف المنتج من السلة"
                            >
                              <Trash2
                                size={20}
                                className="hover:text-red-500"
                              />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(product._id)}
                            className="bg-[#fdf407] hover:bg-[#dfd93e] text-[#393405] font-semibold py-2 px-6 rounded-lg cursor-pointer flex items-center gap-2 transition-all duration-300"
                          >
                            أضف إلى السلة
                            <span className="sm:text-lg text-base">🛒</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className="absolute right-4 top-1/2 bg-[#fdf407] cursor-pointer -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            onClick={nextSlide}
            aria-label="المنتج التالي"
          >
            <ChevronRight className="button-icon" />
          </button>
          {/* Pagination indicators */}
          <div className="flex justify-center mt-10 sm:mt-20 space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 cursor-pointer
                  ${index === currentSlide ? "bg-[#fdf407]" : "bg-gray-300"}`}
                aria-label={`انتقل إلى الشريحة ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewProductSection;
