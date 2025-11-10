"use client";
import { ChevronDown, Info } from "lucide-react";
import { useState } from "react";

export default function SpecificationTable({ specifications }) {
  if (!specifications?.length) return null;

  const [openKeys, setOpenKeys] = useState({ display: true, cpu: true,});

  const toggleOpen = (key) => {
    setOpenKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const translateKey = (key) => {
    const map = {
      cpu: "المعالج",
      gpu: "كرت الشاشة",
      ram: "الذاكرة (RAM)",
      storage: "التخزين",
      screen: "الشاشة",
      display: "العرض",
      battery: "البطارية",
      OperatingSystem: "نظام التشغيل",
      ports: "المنافذ",
      connectivity: "الاتصال",
      weight: "الوزن",
      dimensions: "الأبعاد",
      color: "اللون",
      audio: "الصوت",
      camera: "الكاميرا",
      bodyMaterial: "الخامة",
      maxMemory: "الحد الأقصى للذاكرة",
      keyboardLanguage: "لغة لوحة المفاتيح",
      resolutionPerEye: "دقة كل عين",
      refreshRate: "معدل التحديث",
      panelType: "نوع الشاشة",
      fov: "زاوية الرؤية (FOV)",
      width: "العرض",
      height: "الارتفاع",
    };
    return map[key] || key;
  };

  const formatValue = (key, value) => {
    if (typeof value === "number") {
      if (key.toLowerCase().includes("clock")) return `${value} GHz`;
      if (key.toLowerCase().includes("speed")) return `${value} MHz`;
      if (key.toLowerCase().includes("capacity")) return `${value} Wh`;
      if (key.toLowerCase().includes("refresh")) return `${value} Hz`;
      if (key.toLowerCase().includes("fov")) return `${value}°`;
      if (key.toLowerCase().includes("size")) return `${value} GB`;
      if (key.toLowerCase().includes("weight")) return `${value} كجم`;

      return value;
    }
    return value;
  };

  const renderValue = (value, level = 0) => {
    if (Array.isArray(value)) {
      if(!value) return;
      return (
        <ul className="list-disc pr-6 text-gray-700 text-sm space-y-1">
          {value.map((v, i) => (
            <li key={i}>{renderValue(v, level + 1)}</li>
          ))}
        </ul>
      );
    }

    if (typeof value === "object" && value !== null) {
      if(!value) return;
      return (
        <div
          className={`space-y-1 text-gray-700 text-sm ${
            level > 0 ? "pl-4 border-r-2 border-sky-100" : ""
          }`}
        >
          {Object.entries(value).map(([subKey, subVal], i) => {
            if (!subVal) return;
            return(
              <div key={i} className="flex justify-between border-b border-gray-100 py-1">
                <span className="font-medium text-gray-800">
                  {translateKey(subKey)}
                </span>
                <span
                  className={`text-sm ${
                    typeof subVal === "number"
                      ? "text-sky-600 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  {typeof subVal === "object"
                    ? renderValue(subVal, level + 1)
                    : formatValue(subKey, subVal) || "غير متوفر"}
                </span>
              </div>
            )})}
        </div>
      );
    }

    return (
      <span
        className={`text-sm ${
          typeof value === "number"
            ? "text-sky-600 font-semibold"
            : "text-gray-700"
        }`}
      >
        {formatValue("", value) || "غير متوفر"}
      </span>
    );
  };

  return (
    <div
      dir="rtl"
      className="mt-8 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-sky-600 to-cyan-500 text-white px-5 py-3 rounded-t-2xl">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Info className="w-5 h-5" />
          مواصفات المنتج
        </h3>
        <span className="text-sm opacity-90">التفاصيل الفنية الكاملة</span>
      </div>

      {/* Content */}
      <div className="divide-y divide-gray-100">
        {specifications.map(({ placeholder, value }, idx) => (
          <div key={idx} className="px-5 py-4 hover:bg-gray-50 transition-all duration-200">
            <button
              onClick={() => toggleOpen(placeholder)}
              className="w-full flex justify-between items-center text-gray-800 font-semibold text-right"
            >
              <span>{translateKey(placeholder)}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                  openKeys[placeholder] ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openKeys[placeholder] ? "max-h-[700px] mt-3" : "max-h-0"
              }`}
            >
              {renderValue(value)}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 text-gray-500 text-sm px-5 py-2 rounded-b-2xl text-center">
        آخر تحديث لمواصفات المنتج
      </div>
    </div>
  );
}
