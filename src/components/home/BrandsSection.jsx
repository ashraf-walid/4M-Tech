"use client";
import Image from "next/image";
import { laptopBrands, printerBrands } from "@/products/brandImage";
import { useRouter } from "next/navigation";

const BrandsSection = () => {
  const router = useRouter();

  const handleBrandClick = (brandName) => {
    // router.push(`/products?brand=${brandName}`);
    console.log(brandName);
  };

  return (
    <>
      {/* Laptop Brands Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          ماركات أجهزة اللاب توب
        </h3>
        <div className="flex flex-wrap justify-center gap-10 mb-12">
          {laptopBrands.map((brand, idx) => (
            <div
              key={idx}
              className="w-28 h-28 p-3 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-105 transform hover:bg-blue-50"
              onClick={() => handleBrandClick(brand.name)}
            >
              <Image
                src={brand.img}
                alt={brand.name}
                width={80}
                height={80}
                className="object-contain h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Printer Brands Section */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          ماركات الطابعات
        </h3>
        <div className="flex flex-wrap justify-center gap-6">
          {printerBrands.map((brand, idx) => (
            <div
              key={idx}
              className="w-28 h-28 p-3 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-105 transform hover:bg-blue-50"
              onClick={() => handleBrandClick(brand.name)}
            >
              <Image
                src={brand.img}
                alt={brand.name}
                width={80}
                height={80}
                className="object-contain h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BrandsSection;
