
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: "اللابتوبات",
      icon: "💻",
      description: "قوة الحوسبة المحمولة",
      image: "/categories/laptop.jpg",
    },
    {
      id: 2,
      name: "أجهزة الكمبيوتر",
      icon: "🖥️",
      description: "محطات عمل عالية الأداء",
      image: "/categories/desktop.jpg",
    },
    {
      id: 3,
      name: "الطابعات",
      icon: "🖨️",
      description: "حلول طباعة احترافية",
      image: "/categories/printer.jpg",
    },
    {
      id: 4,
      name: "الشاشات",
      icon: "🖥️",
      description: "عروض بجودة عالية ووضوح",
      image: "/categories/monitor.jpg",
    },

    {
      id: 5,
      name: "الاكسسوارات",
      icon: "⌨️",
      description: "ملحقات تقنية أساسية",
      image: "/categories/accessories.jpg",
    },
  ];

  return (
    <section className="w-full py-20 bg-white">
      <div className="w-full lg:w-[80%] mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#393405] mb-4 leading-[120%] tracking-tight relative inline-block">
            <span className="relative z-10">جميع ما تحتاجه لدينا</span>
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[90%] h-3 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-100 rounded-lg opacity-70 -z-0"></span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 cursor-pointer flex flex-col relative group"
            >
              <div className="relative w-full h-[220px] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  priority={category.id <= 2}
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3934054d] to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-400"></div>
              </div>
              <div className="p-7 md:p-6 flex flex-col items-start flex-grow">
                <span className="text-[40px] mb-4 block transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {category.icon}
                </span>
                <h3 className="text-xl font-bold text-[#393405] mb-2 leading-[120%]">
                  {category.name}
                </h3>
                <p className="text-[15px] text-[#3b3934] mb-6 leading-[150%] flex-grow">
                  {category.description}
                </p>
                <button className="bg-[#fdf407] hover:bg-[#dfd93e] text-[#393405] border-none py-3 px-7 rounded-lg text-base font-semibold cursor-pointer inline-flex items-center gap-2 transition-all duration-300 shadow-md mt-auto w-full justify-center">
                  اكتشف
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
