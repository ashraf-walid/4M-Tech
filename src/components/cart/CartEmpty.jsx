"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, ChevronLeft, ShoppingBag } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "اللابتوبات",
    icon: "💻",
    filter: "laptop",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "أجهزة الكمبيوتر",
    icon: "🖥️",
    filter: "desktop",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "الطابعات",
    icon: "🖨️",
    filter: "printer",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 4,
    name: "الشاشات",
    icon: "🖥️",
    filter: "monitor",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 5,
    name: "الاكسسوارات",
    icon: "⌨️",
    filter: "accessory",
    gradient: "from-blue-500 to-cyan-500",
  },
];

export default function CartEmpty() {
  const router = useRouter();

  const handleDiscover = (categoryName) => {
    router.push(`/productsPage?category=${encodeURIComponent(categoryName)}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 px-4 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-200/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Empty Cart Illustration */}
        <div className="flex flex-col items-center justify-center mb-12 animate-fade-in-up">
          <div className="relative mb-8">
            {/* Outer Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse scale-125" />
            
            {/* Middle Ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-spin-slow scale-110" />
            
            {/* Main Circle */}
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-400 rounded-full p-10 shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-sm" />
              <ShoppingCart className="h-20 w-20 text-white relative z-10 drop-shadow-lg" />
            </div>
            
            {/* Floating Icons */}
            <div className="absolute -bottom-2 -left-6 animate-bounce delay-700">
              <ShoppingBag className="h-6 w-6 text-blue-500 drop-shadow-lg" />
            </div>
          </div>

          {/* Header Text */}
          <div className="text-center mb-4 space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                سلة المشتريات فارغة
              </span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              لم تقم بإضافة أي منتجات إلى السلة بعد. تصفح مجموعاتنا المتنوعة واختر ما يناسبك من أحدث المنتجات التقنية!
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            اكتشف الفئات الشائعة
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Container */}
                <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative">
                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col h-full relative z-10">
                    {/* Icon Container */}
                    <div className="mb-4 flex items-center justify-center">
                      <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${category.gradient} shadow-lg group-hover:shadow-xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6`}>
                        <span className="text-4xl block transform group-hover:scale-110 transition-transform duration-300">
                          {category.icon}
                        </span>
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      </div>
                    </div>

                    {/* Category Name */}
                    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center group-hover:text-gray-900 transition-colors duration-300">
                      {category.name}
                    </h3>

                    {/* Button */}
                    <button 
                      onClick={() => handleDiscover(category.filter)}
                      className={`mt-auto w-full py-3 px-4 rounded-xl cursor-pointer font-semibold text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden bg-gradient-to-r ${category.gradient}`}
                    >
                      <span className="relative z-10">تصفح</span>
                      <ChevronLeft className="w-5 h-5 relative z-10 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                      {/* Button Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 rounded-xl" />
                    </button>
                  </div>

                  {/* Corner Decoration */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main CTA Button */}
        <div className="flex justify-center animate-fade-in-up delay-500">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Text */}
            <span className="relative z-10 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              ابدأ التسوق
            </span>
            
            {/* Arrow */}
            <ArrowLeft className="relative z-10 w-5 h-5 transform group-hover:-translate-x-2 transition-transform duration-300" />
            
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Link>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-700 {
          animation-delay: 700ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }

        /* Staggered animation for categories */
        .group:nth-child(1) { animation-delay: 0ms; }
        .group:nth-child(2) { animation-delay: 100ms; }
        .group:nth-child(3) { animation-delay: 200ms; }
        .group:nth-child(4) { animation-delay: 300ms; }
        .group:nth-child(5) { animation-delay: 400ms; }
      `}</style>
    </div>
  );
}
