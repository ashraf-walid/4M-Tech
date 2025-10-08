import { Cairo, Tajawal } from 'next/font/google'
import "./globals.css"
import Header from '@/components/Header/Header'

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-cairo",
})

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  display: "swap",
  variable: "--font-tajawal",
})

export const metadata = {
  title: "4M Technology - متجر التكنولوجيا الرائد في مصر",
  description: "4M Technology - متجر متخصص في بيع أحدث الأجهزة الإلكترونية والاكسسوارات في مصر. نقدم لكم أفضل العروض والمنتجات بجودة عالية وأسعار تنافسية.",
  keywords: "4M Technology, إلكترونيات, موبايلات, لابتوب, أجهزة ذكية, إكسسوارات, دمياط, مصر",
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${tajawal.variable} ${cairo.className}`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
