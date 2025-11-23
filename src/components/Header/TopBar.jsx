"use client";

import React from "react";
import {
  EmailIcon,
  WhatsAppIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/SVGIcons";
import Link from "next/link";
import { MapPin } from "lucide-react";

const TopBar = ({ scrolledEnough }) => (
  <div className="w-full bg-[#2b2626] py-1.5 transition-all duration-300 mx-auto">
    <div className="mx-auto w-full lg:w-[60%] px-4 flex flex-wrap items-center justify-center md:justify-between gap-5 md:gap-3 lg:gap-2 text-center">
      {/* Email */} 
      {/* <a
        href="https://mail.google.com/mail/?view=cm&to=2m.technology.eg@gmail.com&subject=استفسار%20من%20الموقع"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center max-sm:hidden gap-1.5 text-gray-200 hover:text-[#FFD166] transition-colors duration-300"
      >
        <span className="text-xs">2m.technology.eg@gmail.com</span>
        <EmailIcon className="w-5 h-5" />
      </a> */}
      {/* WhatsApp */}
      <a
        href="https://wa.me/201094096548"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-gray-200 hover:text-[#25D366] transition-colors duration-300"
      >
        <span className="text-xs">01094096548</span>
        <WhatsAppIcon className="w-5 h-5" />
      </a>
      {/* Facebook */}
      <Link
        href="https://www.facebook.com/2M.technology.eg"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-gray-200 hover:text-[#1877F2] transition-colors duration-300"
      >
        <span className="text-xs">Facebook</span>
        <FacebookIcon className="w-5 h-5" />
      </Link>
      {/* instagram */}
      {/* <Link
        href="https://www.instagram.com/2M.technology.eg/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 max-sm:hidden text-gray-200 hover:text-[#FF6B6B] transition-colors duration-300"
      >
        <span className="text-xs">instagram</span>
        <InstagramIcon className="w-5 h-5" />
      </Link> */}
      {/* TikTok */}
      <Link
        href="https://www.tiktok.com/@2M.technology.eg"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 max-sm:hidden text-gray-200 hover:text-pink-500 transition duration-300"
      >
        <span className="text-xs">TikTok</span>
        <TikTokIcon className="w-5 h-5" />
      </Link>
      {/* Address */}
      <Link
        href="/contact"
        className="flex items-center gap-1.5 text-gray-200 hover:text-blue-600 transition-colors duration-300"
      >
        <span className="text-xs">Moul El Hamed</span>
        <span className="text-xs max-sm:hidden">- Damietta</span>
        <div className="flex items-center justify-center">
          <MapPin size={22} />
        </div>
      </Link>
    </div>
  </div>
);

export default TopBar;
