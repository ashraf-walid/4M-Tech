"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchComponent from "@/components/search/Search";
import { LogIn, ShoppingCart, Heart } from "lucide-react";
import UnderDevelopmentModal from "@/components/common/UnderDevelopmentModal";

const MainHeader = ({ setIsMenuOpen }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-[#1f1b1a] py-1.5">
        <div className="mx-auto px-4 py-3 flex items-center justify-between w-full lg:w-[80%] transition-all duration-300">
          {/* Mobile Menu Button (Hamburger) */}
      <button
        className="visible text-gray-200 text-2xl sm:text-3xl md:hidden"
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
          <LogIn size={32} />
          <span className="text-xs">تسجيل الدخول</span>
        </div>
        <UnderDevelopmentModal isOpen={open} onClose={() => setOpen(false)} />
        <Link
          href="#"
          className="flex flex-col items-center hover:text-[var(--color-wattle)] transition"
        >
          <ShoppingCart size={32} />
          <span className="text-xs">السلة</span>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center hover:text-[var(--color-wattle)] transition"
        >
          <Heart size={32} />
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
          alt="4M-Tech"
          priority
          width={124}
          height={124}
          className="h-12 sm:h-16 md:h-20 lg:h-28 w-auto hover:opacity-90 transition-opacity duration-300"
        />
      </Link>
    </div>
  </div>
  </>
)};

export default MainHeader;
