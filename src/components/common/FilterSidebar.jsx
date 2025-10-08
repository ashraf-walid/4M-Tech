import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp, Laptop, Cpu, HardDrive, Monitor, DollarSign, Star, Check } from 'lucide-react';

const ProductFilterSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    price: true,
    specs: false,
    features: false
  });
  
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: [0, 50000],
    processors: [],
    storage: [],
    ram: [],
    gpu: [],
    screenSize: [],
    features: []
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value) 
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const handlePriceChange = (index, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange.map((price, i) => i === index ? parseInt(value) : price)
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, 50000],
      processors: [],
      storage: [],
      ram: [],
      gpu: [],
      screenSize: [],
      features: []
    });
  };

  const FilterSection = ({ title, isExpanded, onToggle, children, icon: Icon }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-right hover:bg-gray-50 transition-colors"
      >
        <ChevronDown className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{title}</span>
          {Icon && <Icon className="w-4 h-4 text-gray-600" />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 pb-4' : 'max-h-0'}`}>
        <div className="px-4">
          {children}
        </div>
      </div>
    </div>
  );

  const CheckboxFilter = ({ options, selectedOptions, onChange, filterType }) => (
    <div className="space-y-3">
      {options.map(option => (
        <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option.value)}
              onChange={() => onChange(filterType, option.value)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
              selectedOptions.includes(option.value)
                ? 'bg-blue-600 border-blue-600'
                : 'border-gray-300 group-hover:border-blue-400'
            }`}>
              {selectedOptions.includes(option.value) && (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>
          </div>
          <div className="flex-1 text-right">
            <span className="text-sm text-gray-700 group-hover:text-gray-900">
              {option.label}
            </span>
            {option.count && (
              <span className="text-xs text-gray-500 mr-2">({option.count})</span>
            )}
          </div>
        </label>
      ))}
    </div>
  );

  const categories = [
    { value: 'laptops-versatile', label: 'لابتوبات عملية ومتعددة الاستخدامات', count: 54 },
    { value: 'desktop-pcs', label: 'أجهزة الكمبيوتر', count: 15 },
    { value: 'gaming-devices', label: 'أجهزة الجيمينج', count: 12 },
    { value: 'graphics-laptops', label: 'لابتوبات جرافيك', count: 10 },
    { value: 'graphics-gen8', label: 'لابتوبات جرافيك جيل 8', count: 6 },
    { value: 'graphics-high-end', label: 'لابتوبات جرافيك عالية', count: 13 },
    { value: 'new-with-warranty', label: 'أجهزة جديدة بضمان', count: 14 }
  ];

  const brands = [
    { value: 'hp', label: 'HP', count: 45 },
    { value: 'dell', label: 'DELL', count: 32 },
    { value: 'lenovo', label: 'LENOVO', count: 18 },
    { value: 'asus', label: 'ASUS', count: 12 },
    { value: 'acer', label: 'ACER', count: 8 },
    { value: 'fujitsu', label: 'FUJITSU', count: 5 },
    { value: 'msi', label: 'MSI', count: 3 }
  ];

  const processors = [
    { value: 'intel-i3', label: 'Intel Core i3', count: 8 },
    { value: 'intel-i5', label: 'Intel Core i5', count: 42 },
    { value: 'intel-i7', label: 'Intel Core i7', count: 38 },
    { value: 'ryzen-3', label: 'AMD Ryzen 3', count: 12 },
    { value: 'ryzen-5', label: 'AMD Ryzen 5', count: 15 },
    { value: 'ryzen-7', label: 'AMD Ryzen 7', count: 8 },
    { value: 'celeron', label: 'Intel Celeron', count: 3 },
    { value: 'pentium', label: 'Intel Pentium', count: 6 }
  ];

  const ramOptions = [
    { value: '4gb', label: '4 جيجا', count: 15 },
    { value: '8gb', label: '8 جيجا', count: 45 },
    { value: '16gb', label: '16 جيجا', count: 32 },
    { value: '32gb', label: '32 جيجا', count: 8 },
    { value: '64gb', label: '64 جيجا', count: 2 }
  ];

  const storageOptions = [
    { value: 'hdd', label: 'HDD', count: 25 },
    { value: 'ssd-128', label: 'SSD 128GB', count: 18 },
    { value: 'ssd-256', label: 'SSD 256GB', count: 35 },
    { value: 'ssd-512', label: 'SSD 512GB', count: 28 },
    { value: 'ssd-1tb', label: 'SSD 1TB', count: 12 },
    { value: 'nvme', label: 'NVMe SSD', count: 22 }
  ];

  const screenSizes = [
    { value: '11-12', label: '11-12 بوصة', count: 8 },
    { value: '13-14', label: '13-14 بوصة', count: 35 },
    { value: '15-16', label: '15-16 بوصة', count: 45 },
    { value: '17', label: '17 بوصة', count: 12 }
  ];

  const features = [
    { value: 'backlit-keyboard', label: 'لوحة مفاتيح مضيئة', count: 28 },
    { value: 'touch-screen', label: 'شاشة لمس', count: 15 },
    { value: 'fingerprint', label: 'بصمة الإصبع', count: 12 },
    { value: 'webcam', label: 'كاميرا ويب', count: 42 },
    { value: 'bluetooth', label: 'بلوتوث', count: 38 },
    { value: 'wifi', label: 'واي فاي', content: 40 },
    { value: 'hdmi', label: 'منفذ HDMI', count: 35 },
    { value: 'usb3', label: 'منافذ USB 3.0', count: 45 }
  ];

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <Filter className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 right-0 h-full lg:h-auto z-50 lg:z-auto
        w-80 lg:w-full bg-white shadow-2xl lg:shadow-none
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900">فلترة المنتجات</h2>
            <Filter className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        {/* Clear Filters */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            مسح جميع الفلاتر
          </button>
        </div>

        {/* Filters */}
        <div className="divide-y divide-gray-200">
          {/* Categories */}
          <FilterSection
            title="الفئات"
            isExpanded={expandedSections.category}
            onToggle={() => toggleSection('category')}
            icon={Laptop}
          >
            <CheckboxFilter
              options={categories}
              selectedOptions={filters.categories}
              onChange={handleFilterChange}
              filterType="categories"
            />
          </FilterSection>

          {/* Brands */}
          <FilterSection
            title="العلامات التجارية"
            isExpanded={expandedSections.brand}
            onToggle={() => toggleSection('brand')}
            icon={Star}
          >
            <CheckboxFilter
              options={brands}
              selectedOptions={filters.brands}
              onChange={handleFilterChange}
              filterType="brands"
            />
          </FilterSection>

          {/* Price Range */}
          <FilterSection
            title="نطاق السعر"
            isExpanded={expandedSections.price}
            onToggle={() => toggleSection('price')}
            icon={DollarSign}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="من"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(0, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="إلى"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(1, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="text-center text-sm text-gray-600">
                {new Intl.NumberFormat('ar-EG', { 
                  style: 'currency', 
                  currency: 'EGP',
                  minimumFractionDigits: 0 
                }).format(filters.priceRange[0])} - {new Intl.NumberFormat('ar-EG', { 
                  style: 'currency', 
                  currency: 'EGP',
                  minimumFractionDigits: 0 
                }).format(filters.priceRange[1])}
              </div>
            </div>
          </FilterSection>

          {/* Specs */}
          <FilterSection
            title="المواصفات"
            isExpanded={expandedSections.specs}
            onToggle={() => toggleSection('specs')}
            icon={Cpu}
          >
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3 text-right">المعالج</h4>
                <CheckboxFilter
                  options={processors}
                  selectedOptions={filters.processors}
                  onChange={handleFilterChange}
                  filterType="processors"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3 text-right">الذاكرة العشوائية</h4>
                <CheckboxFilter
                  options={ramOptions}
                  selectedOptions={filters.ram}
                  onChange={handleFilterChange}
                  filterType="ram"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3 text-right">التخزين</h4>
                <CheckboxFilter
                  options={storageOptions}
                  selectedOptions={filters.storage}
                  onChange={handleFilterChange}
                  filterType="storage"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3 text-right">حجم الشاشة</h4>
                <CheckboxFilter
                  options={screenSizes}
                  selectedOptions={filters.screenSize}
                  onChange={handleFilterChange}
                  filterType="screenSize"
                />
              </div>
            </div>
          </FilterSection>

          {/* Features */}
          <FilterSection
            title="المميزات الإضافية"
            isExpanded={expandedSections.features}
            onToggle={() => toggleSection('features')}
            icon={Monitor}
          >
            <CheckboxFilter
              options={features}
              selectedOptions={filters.features}
              onChange={handleFilterChange}
              filterType="features"
            />
          </FilterSection>
        </div>

        {/* Apply Button */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
            onClick={() => {
              console.log('Applied filters:', filters);
              setIsOpen(false);
            }}
          >
            تطبيق الفلاتر
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductFilterSidebar;