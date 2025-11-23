import React from "react";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import useCartStore from "@/store/cartStore";
import { Trash2, ShoppingCart } from "lucide-react";
import Link from "next/link";

const ProductCard = ({ product, isInCart, getProductQuantity }) => {
  const { name, brand, image, price, discount, badge, condition, _id } =
    product;
  const { addToCart, removeFromCart } = useCartStore();
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full w-[300px]">
      <Link href={`/ProductDetails/${_id}`} className="group">
        <div className="relative w-full h-72 bg-gray-50 flex items-center justify-center">
          {image && image.url && (
            <Image
              src={image.url}
              alt={name || "Product image"}
              fill
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
              className="object-contain transition-transform duration-700 group-hover:scale-105"
              priority={false}
              fetchPriority="auto"
            />
          )}
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
      </Link>
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
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#393405]">
            {formatPrice(price)}
          </span>
          {isInCart ? (
            <div className="flex items-center justify-between bg-[var(--color-purple-bright)] text-white rounded-lg overflow-hidden shadow-md">
              <button
                onClick={() => addToCart(_id)}
                className="px-2 py-1 hover:text-gray-700 transition-colors duration-200 font-bold cursor-pointer"
                aria-label="أضف كمية أخرى"
              >
                +
              </button>
              <span className="px-4 py-2 font-semibold text-lg select-none">
                {getProductQuantity(_id)}
              </span>
              <button
                onClick={() => removeFromCart(_id)}
                className="px-4 py-2 transition-colors duration-200 cursor-pointer"
                aria-label="حذف المنتج من السلة"
              >
                <Trash2 size={20} className="hover:text-red-500" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(_id)}
              className="bg-[var(--color-purple-bright)] text-white text-sm hover:bg-[var(--color-light-blue)] font-semibold py-2 px-3 rounded-lg cursor-pointer flex items-center gap-2 transition-all duration-300"
            >
              أضف إلى السلة
              <ShoppingCart size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
