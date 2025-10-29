"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/utils/formatPrice";

export default function FilterSection({ filters, setFilters, products }) {
  const [expandedSections, setExpandedSections] = useState({
    search: true,
    category: true,
    brand: true,
    price: false,
    condition: false,
  });

  // Toggle section
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Categories
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))].filter(Boolean);
    return cats.map((cat) => ({
      value: cat,
      label: cat === "laptop" ? "لابتوب" : cat === "accessory" ? "إكسسوار" : cat,
      count: products.filter((p) => p.category === cat).length,
    }));
  }, [products]);

  // Brands
  const brands = useMemo(() => {
    const brandSet = [...new Set(products.map((p) => p.brand))].filter(Boolean);
    return brandSet.map((brand) => ({
      value: brand,
      label: brand,
      count: products.filter((p) => p.brand === brand).length,
    }));
  }, [products]);

  // Conditions
  const conditions = useMemo(() => {
    const condSet = [...new Set(products.map((p) => p.condition))].filter(Boolean);
    return condSet.map((cond) => ({
      value: cond,
      label: cond,
      count: products.filter((p) => p.condition === cond).length,
    }));
  }, [products]);

  // Category change
  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category],
    }));
  };

  // Brand change
  const handleBrandChange = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brand: prev.brand.includes(brand)
        ? prev.brand.filter((b) => b !== brand)
        : [...prev.brand, brand],
    }));
  };

  // Condition change
  const handleConditionChange = (condition) => {
    setFilters((prev) => ({
      ...prev,
      condition: prev.condition.includes(condition)
        ? prev.condition.filter((c) => c !== condition)
        : [...prev.condition, condition],
    }));
  };

  // Price change
  const handlePriceChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: value,
    }));
  };

  // Search change
  const handleSearchChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      search: e.target.value,
    }));
  };

  // Filter group
  const FilterGroup = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-right group"
      >
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#393405] transition-colors">
          {title}
        </h3>
        {isExpanded ? (
          <ChevronUp className="text-gray-500 group-hover:text-[#393405] transition-colors" size={20} />
        ) : (
          <ChevronDown className="text-gray-500 group-hover:text-[#393405] transition-colors" size={20} />
        )}
      </button>
      {isExpanded && <div className="mt-4">{children}</div>}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <FilterGroup
        title="البحث"
        isExpanded={expandedSections.search}
        onToggle={() => toggleSection("search")}
      >
        <div className="relative">
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            type="text"
            placeholder="ابحث عن منتج..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pr-10 text-right border-gray-300 focus:border-[#fdf407] focus:ring-[#fdf407]"
          />
        </div>
      </FilterGroup>

      {/* Category */}
      <FilterGroup
        title="الفئة"
        isExpanded={expandedSections.category}
        onToggle={() => toggleSection("category")}
      >
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.value} className="flex items-center justify-between group">
              <Label
                htmlFor={`category-${category.value}`}
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <Checkbox
                  id={`category-${category.value}`}
                  checked={filters.category.includes(category.value)}
                  onCheckedChange={() => handleCategoryChange(category.value)}
                  className="border-gray-300 data-[state=checked]:bg-[#fdf407] data-[state=checked]:border-[#fdf407] data-[state=checked]:text-[#393405]"
                />
                <span className="text-gray-700 group-hover:text-gray-900 flex-1 text-right">
                  {category.label}
                </span>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {category.count}
                </span>
              </Label>
            </div>
          ))}
        </div>
      </FilterGroup>

      {/* Brand */}
      <FilterGroup
        title="العلامة التجارية"
        isExpanded={expandedSections.brand}
        onToggle={() => toggleSection("brand")}
      >
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand.value} className="flex items-center justify-between group">
              <Label
                htmlFor={`brand-${brand.value}`}
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <Checkbox
                  id={`brand-${brand.value}`}
                  checked={filters.brand.includes(brand.value)}
                  onCheckedChange={() => handleBrandChange(brand.value)}
                  className="border-gray-300 data-[state=checked]:bg-[#fdf407] data-[state=checked]:border-[#fdf407] data-[state=checked]:text-[#393405]"
                />
                <span className="text-gray-700 group-hover:text-gray-900 flex-1 text-right">
                  {brand.label}
                </span>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {brand.count}
                </span>
              </Label>
            </div>
          ))}
        </div>
      </FilterGroup>

      {/* Price */}
      <FilterGroup
        title="السعر"
        isExpanded={expandedSections.price}
        onToggle={() => toggleSection("price")}
      >
        <div className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            max={100000}
            step={1000}
            className="w-full"
            dir="rtl"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-[#393405]">
              {formatPrice(filters.priceRange[1])}
            </span>
            <span className="text-gray-500">إلى</span>
            <span className="font-semibold text-[#393405]">
              {formatPrice(filters.priceRange[0])}
            </span>
          </div>
        </div>
      </FilterGroup>

      {/* Condition */}
      <FilterGroup
        title="الحالة"
        isExpanded={expandedSections.condition}
        onToggle={() => toggleSection("condition")}
      >
        <div className="space-y-3">
          {conditions.map((condition) => (
            <div key={condition.value} className="flex items-center justify-between group">
              <Label
                htmlFor={`condition-${condition.value}`}
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <Checkbox
                  id={`condition-${condition.value}`}
                  checked={filters.condition.includes(condition.value)}
                  onCheckedChange={() => handleConditionChange(condition.value)}
                  className="border-gray-300 data-[state=checked]:bg-[#fdf407] data-[state=checked]:border-[#fdf407] data-[state=checked]:text-[#393405]"
                />
                <span className="text-gray-700 group-hover:text-gray-900 flex-1 text-right">
                  {condition.label}
                </span>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {condition.count}
                </span>
              </Label>
            </div>
          ))}
        </div>
      </FilterGroup>
    </div>
  );
}
