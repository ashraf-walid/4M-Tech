"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchComponent from "@/components/search/Search";
import { LogIn, ShoppingCart, Heart } from "lucide-react";
import UnderDevelopmentModal from "@/components/common/UnderDevelopmentModal";
import useCartStore from '@/store/cartStore';

const MainHeader = ({ setIsMenuOpen }) => {
  const [open, setOpen] = useState(false);
  const { cartItemCount } = useCartStore();

  return (
    <div className="w-full bg-[#1f1b1a]">
      <div className="mx-auto px-4 py-3 flex items-center justify-between w-full lg:w-[80%] transition-all duration-300">
          {/* Mobile Menu Button (Hamburger) */}
          <button
            className="visible text-gray-200 text-2xl sm:text-3xl md:hidden cursor-pointer" 
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
          {/* Desktop Icons (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-8 text-gray-200 text-sm">
            {/* put <LinK> When start develop this Feature */}
            <div
              onClick={() => setOpen(true)}
              className="flex flex-col items-center hover:text-blue-600 transition duration-300 cursor-pointer"
            >
              <LogIn size={30} />
              <span className="text-xs">تسجيل الدخول</span>
            </div>
            <UnderDevelopmentModal
              isOpen={open}
              onClose={() => setOpen(false)}
            />
            <Link
              href="/CartPage"
              className="flex flex-col items-center relative hover:text-[var(--color-wattle)] transition"
            >
              <ShoppingCart size={30} />
              <span className="text-xs">السلة</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 left-4 bg-red-500 text-white text-[10px] w-3 h-3 max-sm:w-3 max-sm:h-3 max-sm:top-0 max-sm:left-2 max-sm:text-[9px] rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )} 
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center hover:text-[var(--color-wattle)] transition"
            >
              <Heart size={30} />
              <span className="text-xs">المفضلة</span>
            </Link>
          </div>
          {/* Search */}
          <div className="flex-1 max-w-2xl mx-2 sm:mx-4">
            <SearchComponent />
          </div>
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="header logo">
            <Image
              src="/Logo/logo.png"
              alt="Buy-Tech"
              priority
              width={124}
              height={124}
              className="h-10 sm:h-14 md:h-16 lg:h-20 w-auto hover:opacity-90 transition-opacity duration-300"
            />
          </Link>
        </div>
      </div>
  );
};

export default MainHeader;
