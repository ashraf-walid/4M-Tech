import React from "react";
import Link from "next/link";
import {
  X,
  User,
  Home,
  ShoppingBag,
  ShoppingCart,
  Heart,
  Headset,
} from "lucide-react";
import useCartStore from '@/store/cartStore';

const MobileSidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  if (!isMenuOpen) return null;
  const { cartItemCount } = useCartStore();

  return (
    <div className="fixed inset-0 z-50 flex transition-all duration-300">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 bg-opacity-70"
        onClick={() => setIsMenuOpen(false)}
      ></div>
      {/* Sidebar */}
      <div
        className={`relative w-4/5 max-w-sm bg-[#181313dd] h-full shadow-lg p-6 flex flex-col gap-8 animate-slide-in rtl:right-0 rtl:left-auto`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 left-4 text-gray-200 hover:text-white"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={26} />
        </button>
        {/* User Info */}
        <div className="mt-12 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center">
            <User size={32} className="text-gray-300" />
          </div>
          <p className="text-gray-200 font-medium">مرحباً بك</p>
          <p className="text-sm text-gray-400">تسجيل الدخول / إنشاء حساب</p>
        </div>
        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col gap-1">
          <Link
            href="/"
            className="flex items-center gap-3 p-3 text-gray-200 hover:bg-[#2b2626] rounded-lg transition"
            onClick={() => setIsMenuOpen(false)}
          >
            <Home size={22} className="text-[var(--color-blue)]" />
            <span>الرئيسية</span>
          </Link>
          <Link
            href="/productsPage"
            className="flex items-center gap-3 p-3 text-gray-200 hover:bg-[#2b2626] rounded-lg transition"
            onClick={() => setIsMenuOpen(false)}
          >
            <ShoppingBag size={22} className="text-[var(--color-blue)]" />
            <span>المنتجات</span>
          </Link>
          <Link
            href="/CartPage"
            className="relative flex items-center gap-3 p-3 text-gray-200 hover:bg-[#2b2626] rounded-lg transition"
            onClick={() => setIsMenuOpen(false)}
          >
            <ShoppingCart size={22} className="text-[var(--color-blue)]" />
            <span>سلة التسوق</span>
            {cartItemCount > 0 && (
              <span className="absolute bottom-8 right-4 bg-red-500 text-white text-[10px] w-3 h-3 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 p-3 text-gray-200 hover:bg-[#2b2626] rounded-lg transition"
            onClick={() => setIsMenuOpen(false)}
          >
            <Heart size={22} className="text-[var(--color-blue)]" />
            <span>المفضلة</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-3 p-3 text-gray-200 hover:bg-[#2b2626] rounded-lg transition"
            onClick={() => setIsMenuOpen(false)}
          >
            <Headset size={22} className="text-[var(--color-blue)]" />
            <span>اتصل بنا</span>
          </Link>
        </nav>
        {/* Social Links */}
        <div className="flex justify-center gap-6 pt-4 border-t border-gray-700">
          {/* facebook */}
          <a
            href="https://www.facebook.com/2M.technology.eg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#1877F2] transition"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
          {/* WhatsApp */}
          <a
            href="https://wa.me/201094096548"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#25D366] transition"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M16.003 3.2c-7.06 0-12.8 5.739-12.8 12.8 0 2.261.595 4.473 1.724 6.419L3.2 28.8l6.618-1.718c1.872 1.024 3.993 1.566 6.185 1.566h.001c7.06 0 12.8-5.739 12.8-12.8 0-3.417-1.331-6.632-3.748-9.048S19.419 3.2 16.003 3.2zm0 22.4c-1.819 0-3.603-.484-5.157-1.398l-.368-.213-3.93 1.02 1.05-3.828-.24-.393a10.17 10.17 0 01-1.54-5.368c0-5.633 4.583-10.217 10.218-10.217 2.73 0 5.295 1.063 7.228 2.996s2.996 4.498 2.996 7.227c0 5.634-4.584 10.216-10.218 10.216zm5.617-7.421c-.307-.154-1.82-.898-2.103-1.002s-.487-.154-.692.154-.794.998-.974 1.203-.358.231-.666.077a8.33 8.33 0 01-2.447-1.508 9.198 9.198 0 01-1.709-2.102c-.179-.308-.019-.474.135-.628.138-.137.308-.358.461-.538.153-.18.204-.308.307-.513.102-.205.051-.384-.026-.538s-.693-1.665-.949-2.283c-.249-.598-.503-.515-.693-.524l-.59-.01a1.14 1.14 0 00-.832.385c-.282.308-1.08 1.053-1.08 2.568s1.106 2.981 1.26 3.188c.154.205 2.178 3.331 5.278 4.672.738.318 1.312.509 1.76.65.74.236 1.412.203 1.944.123.593-.089 1.82-.743 2.077-1.46.256-.717.256-1.331.179-1.46s-.282-.205-.59-.359z" />
            </svg>
          </a>
          {/* instagram */}
          <a
            href="https://www.instagram.com/2M.technology.eg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#E1306C] transition"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.415-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
