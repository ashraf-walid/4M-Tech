"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  X,
  Cpu,
  HardDrive,
  MemoryStick,
  Monitor,
  Star,
  Zap,
  Shield,
  Award,
  Camera,
  Wifi,
  Battery,
  Weight,
  Calendar,
  Tag,
  Heart,
  Share2,
  Phone,
  ShoppingCart,
  Info,
  Bookmark,
  MessageCircle,
} from "lucide-react";
import { brandLogos } from "@/products/brandImage";

export default function LaptopDetailsModal({ laptop, isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("specs");

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ar-EG", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (!isOpen) return null;

  // Extract laptop specifications for better organization
  const specifications = [
    {
      icon: Cpu,
      label: "المعالج",
      value: laptop.cpu,
      gradient: "from-blue-600 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200 hover:border-blue-300",
    },
    {
      icon: MemoryStick,
      label: "الذاكرة العشوائية",
      value: laptop.ram,
      gradient: "from-emerald-600 to-cyan-500",
      bgGradient: "from-emerald-50 to-cyan-50",
      borderColor: "border-emerald-200 hover:border-emerald-300",
    },
    {
      icon: HardDrive,
      label: "التخزين",
      value: laptop.storage,
      gradient: "from-cyan-600 to-indigo-500",
      bgGradient: "from-cyan-50 to-indigo-50",
      borderColor: "border-cyan-200 hover:border-cyan-300",
    },
    {
      icon: Monitor,
      label: "حجم الشاشة",
      value: laptop.screenSize,
      gradient: "from-indigo-600 to-blue-600",
      bgGradient: "from-indigo-50 to-blue-50",
      borderColor: "border-indigo-200 hover:border-indigo-300",
    },
    {
      icon: Zap,
      label: "كارت الشاشة",
      value: laptop.gpu,
      gradient: "from-blue-600 to-emerald-600",
      bgGradient: "from-blue-50 to-emerald-50",
      borderColor: "border-blue-200 hover:border-blue-300",
    },
    {
      icon: Zap,
      label: "VRAM",
      value: laptop.vram,
      gradient: "from-blue-600 to-emerald-600",
      bgGradient: "from-blue-50 to-emerald-50",
      borderColor: "border-blue-200 hover:border-blue-300",
    },
    {
      icon: Zap,
      label: "graphicsCoprocessor",
      value: laptop.graphicsCoprocessor,
      gradient: "from-blue-600 to-emerald-600",
      bgGradient: "from-blue-50 to-emerald-50",
      borderColor: "border-blue-200 hover:border-blue-300",
    },
    {
      icon: Zap,
      label: "output",
      value: laptop.videoOutput,
      gradient: "from-blue-600 to-emerald-600",
      bgGradient: "from-blue-50 to-emerald-50",
      borderColor: "border-blue-200 hover:border-blue-300",
    },
    {
      icon: Zap,
      label: "maxResolution",
      value: laptop.maxResolution,
      gradient: "from-blue-600 to-emerald-600",
      bgGradient: "from-blue-50 to-emerald-50",
      borderColor: "border-blue-200 hover:border-blue-300",
    },
    {
      icon: Zap,
      label: "includedComponents",
      value: laptop.includedComponents,
      gradient: "from-blue-600 to-emerald-600",
      bgGradient: "from-blue-50 to-emerald-50",
      borderColor: "border-blue-200 hover:border-blue-300",
    },
    {
      icon: Shield,
      label: "الضمان",
      value: laptop.warranty || "ضمان المحل",
      gradient: "from-emerald-600 to-indigo-600",
      bgGradient: "from-emerald-50 to-indigo-50",
      borderColor: "border-emerald-200 hover:border-emerald-300",
    },
  ].filter((spec) => spec.value); // Only show specs that have values

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-2 md:p-4">
        <div
          className={`bg-white rounded-3xl shadow-2xl w-full max-w-lg md:max-w-5xl overflow-y-auto max-h-[98vh] md:max-h-[95vh] overflow-hidden transform transition-all duration-300 ${
            isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
        >
          {/* Header with Image and Basic Info */}
          <div className="relative bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 p-4 md:p-6">
            {/* Close and Action Buttons */}
            <div className="absolute top-2 left-2 right-2 md:top-4 md:left-4 md:right-4 flex justify-between items-center z-10">
              <button
                onClick={onClose}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="flex gap-2">
                <button
                  onClick={toggleFavorite}
                  className={`p-2 backdrop-blur-sm rounded-full transition-all duration-200 ${
                    isFavorite
                      ? "bg-red-500/80 hover:bg-red-600/80"
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite ? "text-white fill-current" : "text-white"
                    }`}
                  />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200">
                  <Share2 className="w-6 h-6 text-white" />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200">
                  <Bookmark className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Main Header Content */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 pt-12 md:pt-16">
              {/* Laptop Image */}
              <div className="relative w-full md:w-auto flex-shrink-0">
                {laptop.image ? (
                  <div className="w-full h-40 md:w-64 md:h-48 bg-white/20 backdrop-blur-sm rounded-2xl p-2 md:p-4 shadow-lg mx-auto">
                    <Image
                      src={laptop.image}
                      alt={laptop.model}
                      width={240}
                      height={180}
                      className="object-contain w-full h-full rounded-xl"
                    />
                  </div>
                ) : (
                  <div className="w-full h-40 md:w-64 md:h-48 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Monitor className="w-20 h-20 text-white/60" />
                  </div>
                )}

                {/* ID Badge */}
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold shadow-lg">
                  #{laptop.id}
                </div>
              </div>

              {/* Title and Brand */}
              <div className="flex-1 text-center md:text-right w-full">
                <div className="flex items-center justify-center md:justify-end gap-2 md:gap-4 mb-2 md:mb-4">
                  {brandLogos[laptop.brand] && (
                    <Image
                      src={brandLogos[laptop.brand]}
                      alt={laptop.brand}
                      width={40}
                      height={40}
                      className="object-contain rounded-full bg-white/20 backdrop-blur-sm p-1 md:p-2"
                    />
                  )}
                  <div>
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">
                      {laptop.model}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 font-medium">
                      {laptop.brand}
                    </p>
                  </div>
                </div>

                {/* Nickname */}
                {laptop.nickname && (
                  <div className="inline-flex items-center bg-yellow-400/20 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 mb-2 md:mb-4">
                    <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-300 ml-2 md:ml-3" />
                    <span className="text-white font-bold text-base md:text-lg">
                      {laptop.nickname}
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-2xl px-6 md:mr-4 md:px-8 py-3 md:py-4 shadow-lg">
                  <Tag className="w-5 h-5 md:w-6 md:h-6 text-white ml-2 md:ml-3" />
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    {formatPrice(laptop.price)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area with Scrollable Body */}
          <div>
            {/* Navigation Tabs */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-2 md:px-6 py-2 md:py-4 z-10">
              <div className="flex gap-2 md:gap-4">
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`px-3 md:px-6 py-2 md:py-3 rounded-xl font-bold transition-all duration-200 ${
                    activeTab === "specs"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  المواصفات التقنية
                </button>
                <button
                  onClick={() => setActiveTab("features")}
                  className={`px-3 md:px-6 py-2 md:py-3 rounded-xl font-bold transition-all duration-200 ${
                    activeTab === "features"
                      ? "bg-gradient-to-r from-emerald-600 to-cyan-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  المميزات الإضافية
                </button>
                <button
                  onClick={() => setActiveTab("info")}
                  className={`px-3 md:px-6 py-2 md:py-3 rounded-xl font-bold transition-all duration-200 ${
                    activeTab === "info"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  معلومات إضافية
                </button>
              </div>
            </div>

            <div className="p-2 md:p-6">
              {/* Specifications Tab */}
              {activeTab === "specs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                  {specifications.map(
                    (spec, idx) =>
                      spec.value && (
                        <div
                          key={idx}
                          className={`flex justify-between items-center bg-gradient-to-br ${spec.bgGradient} rounded-2xl p-4 md:p-6 border ${spec.borderColor}`}
                        >
                          <div className="flex items-center">
                            <div
                              className={`p-2 md:p-3 bg-gradient-to-r ${spec.gradient} rounded-xl shadow-lg`}
                            >
                              <spec.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-800 mr-2 md:mr-4">
                              {spec.label}
                            </h3>
                          </div>
                          <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed">
                            {spec.value}
                          </p>
                        </div>
                      )
                  )}
                </div>
              )}

              {/* Features Tab */}
              {activeTab === "features" && (
                <div>
                  {laptop.extraFeatures && laptop.extraFeatures.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                      {laptop.extraFeatures.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl p-3 md:p-5 border border-emerald-200 hover:border-emerald-300 transition-all duration-200 hover:shadow-md group"
                        >
                          <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-full ml-2 md:ml-4 group-hover:scale-125 transition-transform duration-200"></div>
                          <span className="text-gray-700 font-semibold text-base md:text-lg">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 md:py-12">
                      <Info className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-base md:text-lg">
                        لا توجد مميزات إضافية مسجلة
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Additional Info Tab */}
              {activeTab === "info" && (
                <div className="space-y-4 md:space-y-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-2 md:p-4 text-center border border-blue-200">
                      <Tag className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mx-auto mb-1 md:mb-2" />
                      <p className="text-xs md:text-sm text-gray-600 mb-1">رقم المنتج</p>
                      <p className="font-bold text-gray-800 text-sm md:text-base">#{laptop.id}</p>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-xl p-2 md:p-4 text-center border border-emerald-200">
                      <Award className="w-6 h-6 md:w-8 md:h-8 text-emerald-600 mx-auto mb-1 md:mb-2" />
                      <p className="text-xs md:text-sm text-gray-600 mb-1">
                        العلامة التجارية
                      </p>
                      <p className="font-bold text-gray-800 text-sm md:text-base">{laptop.brand}</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-2 md:p-4 text-center border border-purple-200">
                      <Star className="w-6 h-6 md:w-8 md:h-8 text-purple-600 mx-auto mb-1 md:mb-2" />
                      <p className="text-xs md:text-sm text-gray-600 mb-1">التقييم</p>
                      <p className="font-bold text-gray-800 text-sm md:text-base">★★★★☆</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-2 md:p-4 text-center border border-orange-200">
                      <Shield className="w-6 h-6 md:w-8 md:h-8 text-orange-600 mx-auto mb-1 md:mb-2" />
                      <p className="text-xs md:text-sm text-gray-600 mb-1">الحالة</p>
                      <p className="font-bold text-gray-800 text-sm md:text-base">متوفر</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-4 md:p-6 border border-gray-200">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-4 flex items-center">
                      <Info className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3 text-blue-600" />
                      وصف المنتج
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      {laptop.description ||
                        `لاب توب ${laptop.brand} ${laptop.model} بمعالج ${laptop.cpu} وذاكرة عشوائية ${laptop.ram} وتخزين ${laptop.storage}. جهاز عالي الأداء مناسب لجميع الاستخدامات اليومية والمهنية.`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons - Fixed at Bottom */}
          <div className="bg-white border-t border-gray-200 p-3 md:p-6">
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 md:py-4 px-4 md:px-6 rounded-2xl font-bold text-base md:text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-cyan-500 hover:to-emerald-500 flex items-center justify-center gap-2 md:gap-3">
                <Phone className="w-5 h-5 md:w-6 md:h-6" />
                اتصل للاستفسار
              </button>

              <button className="flex-1 bg-gradient-to-r from-emerald-600 to-cyan-500 text-white py-3 md:py-4 px-4 md:px-6 rounded-2xl font-bold text-base md:text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-cyan-500 hover:to-blue-500 flex items-center justify-center gap-2 md:gap-3">
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                احجز الآن
              </button>

              <button className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 md:py-4 px-4 md:px-6 rounded-2xl font-bold text-base md:text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-gray-500 hover:to-gray-600 flex items-center justify-center gap-2 md:gap-3">
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                دردشة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
