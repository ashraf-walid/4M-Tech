'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">متجرنا</h3>
            <p className="text-gray-300 text-sm">
              نحن نقدم أفضل المنتجات بأعلى جودة وأفضل الأسعار. تسوق معنا واستمتع بتجربة فريدة.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Link href="https://www.facebook.com/HelalComputers/?locale=ar_AR" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-gray-300 hover:text-white transition-colors">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-gray-300 hover:text-white transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-gray-300 hover:text-white transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">خدمة العملاء</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  المساعدة
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  الشحن والتوصيل
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  الإرجاع والاستبدال
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">تواصل معنا</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-300">01149005161</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-300">info@hilalcomputer.com</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-gray-300">دمياط، ميدان سرور</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 متجرنا. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
