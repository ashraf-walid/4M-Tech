"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MessageCircle } from "lucide-react";

export default function HeroBanner() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="group relative w-full h-[600px] overflow-hidden border border-white/10 shadow-2xl mx-auto"
      role="region"
    >
      {/* الخلفية */}
      <Image
        src="/heroBanner.jpg"
        alt="عرض منتجات الكمبيوتر واللابتوب"
        fill
        priority
        className="object-cover transition-opacity duration-700 ease-in-out"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-900/30 via-cyan-900/20 to-emerald-900/10 mix-blend-soft-light" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.45)_100%)]" />

      {/* المحتوى */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg ring-1 ring-white/10">
          
          {/* العنوان */}
          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              قول يا رب
            </span>
          </h1>

          {/* النصوص */}
          <div className="space-y-4 mb-8">
            <p className="text-xl md:text-2xl font-semibold text-gray-100 leading-relaxed">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                أكثر من 100 موديل لاب توب متوفر الآن
              </span>
            </p>
            <ul className="list-disc list-inside text-lg text-gray-200 leading-relaxed space-y-1">
              <li>إمكانيات متعددة لجميع الاحتياجات</li>
              <li>أسعار تناسب الجميع</li>
              <li>أحدث موديلات البي سي والطابعات</li>
              <li>ماكينات تصوير ألوان وأبيض وأسود</li>
            </ul>
          </div>

          {/* الأزرار */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/#laptops" aria-label="تصفح منتجات اللابتوب">
              <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-cyan-500 hover:to-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900">
                تصفح المنتجات
                <ArrowLeft size={20} />
              </button>
            </Link>
            <Link href="/contact" aria-label="التواصل معنا">
              <button className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900">
                تواصل معنا
                <MessageCircle size={20} />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
