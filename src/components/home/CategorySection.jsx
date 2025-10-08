import { useState } from 'react';
import { Laptop } from 'lucide-react';
import LaptopCard from '@/components/common/LaptopCard';

const CategorySection = ({ title, items, icon, onLaptopClick, formatPrice }) => {
  const Icon = icon || Laptop;
  const [showAll, setShowAll] = useState(false);
  const safeItems = Array.isArray(items) ? items : [];
  const displayed = showAll ? safeItems.slice(0, 30) : safeItems.slice(0, 6);

  return (
    <div className="mb-20">
      {/* Section Header */}

      <div className="text-center mb-10">
        <div className="flex items-center justify-center mb-5">
          <div className="p-3 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full shadow-md ml-3">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent tracking-tight">
            {title}
          </h3>
        </div>
        <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          مجموعة مختارة بعناية لتناسب احتياجاتك وميزانيتك
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {displayed.map((laptop, index) => (
          <LaptopCard
            key={index}
            laptop={laptop}
            onDetails={() => onLaptopClick(laptop)}
            formatPrice={formatPrice}
          />
        ))}
      </div>

      {/* Show More Button */}
      {items.length > 6 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-10 py-3 rounded-full font-semibold text-lg shadow-md bg-gradient-to-r from-sky-500 to-cyan-400 text-white hover:from-cyan-400 hover:to-emerald-400 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
          >
            {showAll ? "عرض أقل" : `عرض المزيد (${items.length - 6} جهاز إضافي)`}
          </button>
        </div>
      )}
    </div>
  );
};

export default CategorySection;
