"use client";

import { useEffect } from "react";
import { Wrench, X } from "lucide-react";

export default function UnderDevelopmentModal({ isOpen, onClose }) {
  // Prevent page scrolling while the module is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md text-center relative animate-scaleIn"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4 animate-spin-slow">
          <Wrench size={36} className="text-yellow-600" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Under Development 🔧
        </h2>

        {/* Text */}
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
          We are currently working on this feature to provide you with the best experience.  
          Thank you for your patience and trust in us ❤️
        </p>

        {/* Confirm button */}
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Understood
        </button>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.85) translateY(20px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }

        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
