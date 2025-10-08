"use client";

import { useState } from "react";
import { Laptop, Desktop } from "lucide-react";
import {
  laptopsVersatile,
  laptopsGraphics,
  laptopsGraphicsGen8,
  laptopsGraphicsHighEnd,
  laptopsNewWithWarranty,
} from "@/products/laptops";
import { desktopPCs, GamingPCs } from "@/products/Desktop";
import { GraphicsCards } from "@/products/Cards";
import LaptopDetailsModal from "@/components/common/LaptopDetailsModal";
import CategorySection from "./CategorySection";
import BrandsSection from "./BrandsSection";
// import ProductFilterSidebar from "@/components/common/FilterSidebar";

export default function LaptopsSection() {
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleFiltersChange = (filters) => {
  //   console.log("Filters changed:", filters);
  // };

  const Gaming = [...GamingPCs, ...GraphicsCards];

  const handleLaptopClick = (laptop) => {
    setSelectedLaptop(laptop);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLaptop(null);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("ar-EG", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <section
      id="laptops"
      className="pb-12 pt-20 bg-gradient-to-b from-slate-50 to-white flex gap-8"
    >
      {/* <aside className="w-60 hidden lg:block sticky top-4 h-fit">
        <ProductFilterSidebar onFiltersChange={handleFiltersChange} />
      </aside> */}

      <main className="flex-1">
        <BrandsSection />
        {/* أقسام المنتجات */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <CategorySection
            title="لابتوبات عملية ومتعددة الاستخدامات"
            items={laptopsVersatile}
            icon={Laptop}
            onLaptopClick={handleLaptopClick}
            formatPrice={formatPrice}
          />

          <CategorySection
            title="أجهزة الكمبيوتر"
            items={desktopPCs}
            icon={Desktop}
            onLaptopClick={handleLaptopClick}
            formatPrice={formatPrice}
          />
          <CategorySection
            title="أجهزة الجيمينج"
            items={Gaming}
            icon={Desktop}
            onLaptopClick={handleLaptopClick}
            formatPrice={formatPrice}
          />
          <CategorySection
            title="لابتوبات جرافيك"
            items={laptopsGraphics}
            icon={Laptop}
            onLaptopClick={handleLaptopClick}
            formatPrice={formatPrice}
          />
          <CategorySection
            title="لابتوبات جرافيك جيل 8"
            items={laptopsGraphicsGen8}
            icon={Laptop}
            onLaptopClick={handleLaptopClick}
            formatPrice={formatPrice}
          />
          <CategorySection
            title="لابتوبات جرافيك عالية"
            items={laptopsGraphicsHighEnd}
            icon={Laptop}
            onLaptopClick={handleLaptopClick}
            formatPrice={formatPrice}
          />
          <CategorySection
            title="أجهزة جديدة بضمان"
            items={laptopsNewWithWarranty}
            icon={Laptop}
            onLaptopClick={handleLaptopClick}
            formatPrice={formatPrice}
          />

          {/* المودال */}
          {isModalOpen && (
            <LaptopDetailsModal
              laptop={selectedLaptop}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </main>
    </section>
  );
}
