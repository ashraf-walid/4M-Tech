import React from "react";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";

const ProductCard = ({
  name,
  brand,
  image,
  price,
  discount,
  badge,
  condition,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[3/4] w-full">
        <Image src={image} alt={name} fill className="object-contain" />
        {badge && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded z-20">
            {badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-20">
            -{discount}%
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1 truncate" title={name}>
            {name}
          </h3>
          {brand && <p className="text-sm text-gray-500 mb-1">{brand}</p>}
          {condition && (
            <p className="text-xs text-green-700 mb-2">{condition}</p>
          )}

          <p className="text-gray-600 text-sm mb-2 line-clamp-2">&nbsp;</p>
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-lg font-bold text-[#393405]">
            {formatPrice(price)}
          </span>
          <button className="bg-[#fdf407] hover:bg-[#dfd93e] text-sm text-[#393405] font-semibold py-2 px-1 rounded-lg cursor-pointer flex items-center gap-2 transition-all duration-300">
            أضف إلى السلة
            <span className="sm:text-lg text-base">🛒</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
