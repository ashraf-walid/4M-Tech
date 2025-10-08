"use client";

import Image from "next/image";
import {
  Cpu,
  HardDrive,
  MemoryStick,
  Monitor,
  Star,
  ArrowLeft,
} from "lucide-react";
import { brandLogos } from "@/products/brandImage";
import { useRef, useEffect } from "react";

export default function LaptopCard({ laptop, onDetails, formatPrice }) {
  const productImage = laptop.image;

  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.2 } // يظهر عند 20% من الكارد
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-1 border border-slate-200 overflow-hidden group hover:border-blue-300 flex flex-col h-full opacity-0 translate-y-8 ease-out">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 p-4">
        <div className="flex items-center justify-between flex-row-reverse">
          <div className="flex items-center gap-2">
            <h4
              className="text-xl font-bold text-white"
              title={laptop.model}
              dir="ltr"
            >
              {laptop.model}
            </h4>
            {/* صورة الشعار إذا كانت متوفرة */}
            {brandLogos[laptop.brand] && (
              <Image
                src={brandLogos[laptop.brand]}
                alt={laptop.brand}
                width={44}
                height={44}
                className="object-contain rounded-full"
              />
            )}
          </div>

          {laptop.nickname && (
            <div
              className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 truncate max-w-[180px]"
              title={laptop.nickname}
            >
              <span className="text-white text-sm font-medium">
                {laptop.nickname}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* صورة المنتج */}
      <div className="relative w-full h-56 bg-gray-50">
        <Image
          src={productImage}
          alt={laptop.brand}
          fill
          className="object-contain p-4 group-hover:scale-[1.02] transition-transform duration-300"
        />
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        {/* Specifications */}
        <div className="space-y-3 mb-6">
          {laptop.cpu && (
            <div className="flex items-center text-gray-700">
              <Cpu className="w-5 h-5 text-blue-600 ml-3" />
              <span className="font-medium">المعالج:</span>
              <span className="mr-2">{laptop.cpu}</span>
            </div>
          )}

          {laptop.ram && (
            <div className="flex items-center text-gray-700">
              <MemoryStick className="w-5 h-5 text-emerald-600 ml-3" />
              <span className="font-medium">الرام:</span>
              <span className="mr-2">{laptop.ram}</span>
            </div>
          )}

          {laptop.storage && (
            <div className="flex items-center text-gray-700">
              <HardDrive className="w-5 h-5 text-cyan-600 ml-3" />
              <span className="font-medium">التخزين:</span>
              <span className="mr-2">{laptop.storage}</span>
            </div>
          )}

          {laptop.screenSize && (
            <div className="flex items-center text-gray-700">
              <Monitor className="w-5 h-5 text-indigo-600 ml-3" />
              <span className="font-medium">الشاشة:</span>
              <span className="mr-2">{laptop.screenSize}</span>
            </div>
          )}

          {laptop.graphicsCoprocessor && (
            <div className="flex items-center text-gray-700">
              <Monitor className="w-5 h-5 text-blue-600 ml-3" />
              <span className="font-medium">المعالج الرسومي:</span>
              <span className="mr-2">{laptop.graphicsCoprocessor}</span>
            </div>
          )}

          {laptop.vram && (
            <div className="flex items-center text-gray-700">
              <MemoryStick className="w-5 h-5 text-emerald-600 ml-3" />
              <span className="font-medium">الذاكرة:</span>
              <span className="mr-2">{laptop.vram}</span>
            </div>
          )}

          {laptop.maxResolution && (
            <div className="flex items-center text-gray-700">
              <Monitor className="w-5 h-5 text-indigo-600 ml-3" />
              <span className="font-medium">أقصى دقة:</span>
              <span className="mr-2">{laptop.maxResolution}</span>
            </div>
          )}
        </div>

        {/* Extra Features */}
        {Array.isArray(laptop.extraFeatures) &&
          laptop.extraFeatures.length > 0 && (
            <div className="mb-2">
              <h5 className="font-medium text-sm text-gray-800 mb-1 flex items-center">
                <Star className="w-3 h-3 text-amber-500 ml-1" />
                مميزات إضافية:
              </h5>
              <div className="flex flex-wrap gap-1">
                {laptop.extraFeatures.slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium border border-blue-200 hover:bg-blue-100 transition-colors"
                  >
                    {feature}
                  </span>
                ))}
                {laptop.extraFeatures.length > 3 && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    +{laptop.extraFeatures.length - 3} أكثر
                  </span>
                )}
              </div>
            </div>
          )}

        {/* Price + Action */}
        {typeof laptop.price === "number" && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              type="button"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center hover:from-cyan-500 hover:to-emerald-500"
              onClick={onDetails}
            >
              تفاصيل أكثر
              <ArrowLeft className="w-4 h-4 mr-2" />
            </button>
            <div className="text-right">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                {formatPrice(laptop.price)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
