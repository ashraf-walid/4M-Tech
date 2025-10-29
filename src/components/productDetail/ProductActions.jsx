import { ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";

export default function ProductActions({
  onAddToCart,
  // onToggleFavorite,
  // onBuyNow,
  cartItemCount,
  // isFavorite,
  // isProcessing,
  // isInBuyingProcess
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const isInBuyingProcess = false;
  return (
    <div className="space-y-5">
      <div className="flex justify-center items-center gap-3">
        <button
          aria-label={isFavorite ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
          title={isFavorite ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
          className={`w-11 h-11 flex justify-center items-center rounded-full border border-gray-200 shadow-sm transition duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            isFavorite
              ? "bg-red-100 text-red-500"
              : "bg-white text-gray-400 hover:bg-gray-100"
          }`}
          onClick={() => setIsFavorite((v) => !v)}
        >
          <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
        </button>

        <button
          onClick={onAddToCart}
          className="flex items-center justify-center gap-2 w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-xl transition-all duration-200 relative focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>أضف إلى السلة</span>
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full animate-bounce shadow-lg">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>

      <button
        className={`w-full py-3 px-4 rounded-xl font-bold text-white text-lg transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          isInBuyingProcess
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
        }`}
        disabled={isInBuyingProcess}
      >
        {isInBuyingProcess
          ? "جاري المعالجة..."
          : "اشتري الآن (الدفع عند الاستلام)"}
      </button>
    </div>
  );
}
