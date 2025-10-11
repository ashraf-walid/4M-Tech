import React from "react";
import { EmailIcon, WhatsAppIcon, FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/SVGIcons";
import Link from "next/link";
import { MapPin } from "lucide-react";

const TopBar = () => (
  <div className="w-full bg-[#2b2626] py-1.5">
    <div className="mx-auto w-full lg:w-[80%] px-4 flex flex-wrap items-center justify-center lg:justify-between gap-7 sm:gap-5 md:gap-3 lg:gap-2 text-center">
      {/* Email */}
      <a
        href="https://mail.google.com/mail/?view=cm&to=4m.technology.eg@gmail.com&subject=استفسار%20من%20الموقع"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center max-sm:hidden gap-1.5 text-gray-200 hover:text-[#FFD166] transition-colors duration-300"
      >
        <span className="text-xs">4m.technology.eg@gmail.com</span>
        <EmailIcon className="w-5 h-5" />
      </a>
      {/* WhatsApp */}
      <a
        href="https://wa.me/201000208026"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-gray-200 hover:text-[#25D366] transition-colors duration-300"
      >
        <span className="text-xs">01000208026</span>
        <WhatsAppIcon className="w-5 h-5" />
      </a>
      {/* Facebook */}
      <Link
        href="https://www.facebook.com/4m.technology.eg"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-gray-200 hover:text-[#1877F2] transition-colors duration-300"
      >
        <span className="text-xs">Facebook</span>
        <FacebookIcon className="w-5 h-5" />
      </Link>
      {/* instagram */}
      <Link
        href="https://www.instagram.com/4m.technology.eg/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 max-sm:hidden text-gray-200 hover:text-[#FF6B6B] transition-colors duration-300"
      >
        <span className="text-xs">instagram</span>
        <InstagramIcon className="w-5 h-5" />
      </Link>
      {/* TikTok */}
      <Link
        href="https://www.tiktok.com/@4m.technology.eg"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-gray-200 hover:text-pink-500 transition duration-300"
      >
        <span className="text-xs">TikTok</span>
        <TikTokIcon className="w-5 h-5" />
      </Link>
      {/* Address */}
      <Link
        href="/contact"
        className="flex items-center gap-1.5 max-sm:hidden text-gray-200 hover:text-blue-600 transition-colors duration-300"
      >
        <span className="text-xs">Damietta - Moul El Safwa</span>
        <div className="flex items-center justify-center">
          <MapPin size={22} />
        </div>
      </Link>
    </div>
  </div>
);

export default TopBar;
