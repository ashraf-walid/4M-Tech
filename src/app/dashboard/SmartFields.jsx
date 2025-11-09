'use client';

import React from "react";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Check } from 'lucide-react';

function getValueByPath(obj, path) {
  const keys = path.split('.');
  let ref = obj;
  for (let i = 0; i < keys.length; i++) {
    if (ref == null) return '';
    ref = ref[keys[i]];
  }
  return ref ?? '';
}

function setValueByPath(obj, path, value) {
  const keys = path.split('.');
  const draft = { ...obj };
  let ref = draft;
  for (let i = 0; i < keys.length - 1; i++) {
    ref[keys[i]] = { ...(ref[keys[i]] ?? {}) };
    ref = ref[keys[i]];
  }
  ref[keys[keys.length - 1]] = value;
  return draft;
}

function toNumberOrNull(value) {
  if (value === '' || value === null || value === undefined) return null;
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
}

function splitToArray(value) {
  if (!value) return [];
  return value
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function joinArray(arr) {
  return Array.isArray(arr) ? arr.join(', ') : '';
}

export default function SmartSection({ legend, fields, data, setData, disabled }) {

  // --- SubCategory options by Category ---
  const subCategoryOptions = {
    laptop: [
      { label: "Ultrabook", value: "ultrabook" },
      { label: "Gaming Laptop", value: "gaming-laptop" },
      { label: "Business Laptop", value: "business-laptop" },
      { label: "Student Laptop", value: "student-laptop" },
      { label: "2-in-1 Convertible", value: "convertible" },
      { label: "MacBook", value: "macbook" },
    ],
    desktop: [
      { label: "Gaming PC", value: "gaming-pc" },
      { label: "All-in-One", value: "aio" },
      { label: "Office Desktop", value: "office-desktop" },
      { label: "Mini PC", value: "mini-pc" },
      { label: "Workstation", value: "workstation" },
    ],
    monitor: [
      { label: "Full HD", value: "fhd" },
      { label: "2K (QHD)", value: "2k" },
      { label: "4K UHD", value: "4k" },
      { label: "Curved", value: "curved" },
      { label: "Gaming Monitor", value: "gaming-monitor" },
      { label: "Ultrawide", value: "ultrawide" },
    ],
    accessory: [
      { label: "Keyboard", value: "keyboard" },
      { label: "Mouse", value: "mouse" },
      { label: "Headset", value: "headset" },
      { label: "Webcam", value: "webcam" },
      { label: "Cooling Pad", value: "cooling-pad" },
      { label: "Docking Station", value: "dock" },
      { label: "External SSD / HDD", value: "external-drive" },
    ],
    printer: [
      { label: "Inkjet", value: "inkjet" },
      { label: "Laser", value: "laser" },
      { label: "3D Printer", value: "3d-printer" },
      { label: "Scanner", value: "scanner" },
      { label: "Copier", value: "copier" },
    ],
    tablet: [
      { label: "Android Tablet", value: "android-tablet" },
      { label: "iPad", value: "ipad" },
      { label: "Windows Tablet", value: "windows-tablet" },
    ],
    networking: [
      { label: "Router", value: "router" },
      { label: "Switch", value: "switch" },
      { label: "Access Point", value: "access-point" },
      { label: "Modem", value: "modem" },
      { label: "Network Card", value: "network-card" },
    ],
    components: [
      { label: "RAM", value: "ram" },
      { label: "SSD", value: "ssd" },
      { label: "HDD", value: "hdd" },
      { label: "GPU", value: "gpu" },
      { label: "CPU", value: "cpu" },
      { label: "Motherboard", value: "motherboard" },
      { label: "Power Supply", value: "psu" },
      { label: "Case", value: "case" },
      { label: "Cooling System", value: "cooling-system" },
    ],
  };

  // Get appropriate icon based on field type
  const getFieldIcon = (type, path) => {
    if (path?.includes('price') || path?.includes('discount')) return '💰';
    if (path?.includes('stock')) return '📦';
    if (path?.includes('weight')) return '⚖️';
    if (path?.includes('color')) return '🎨';
    if (path?.includes('category')) return '📁';
    if (path?.includes('brand')) return '🏷️';
    if (path?.includes('dimension')) return '📏';
    if (path?.includes('warranty')) return '🛡️';
    if (path?.includes('featured')) return '⭐';
    if (type === 'tags') return '🏷️';
    if (type === 'email') return '📧';
    if (type === 'url') return '🔗';
    if (type === 'date') return '📅';
    if (type === 'textarea') return '📝';
    return null;
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-slate-50 rounded-2xl p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-bl-full -z-10"></div>
      
      {legend && (
        <div className="mb-6 pb-4 border-b-2 border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-md">
              {legend.includes('Basic') ? '📝' : 
               legend.includes('Media') ? '🖼️' : 
               legend.includes('Pricing') ? '💰' : 
               legend.includes('Spec') ? '⚙️' : '📋'}
            </span>
            {legend}
          </h3>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {fields.map((field) => {
          const {
            path,
            label,
            placeholder,
            type = 'text',
            required,
            step,
            min,
            max,
            rows = 4,
            colSpan = 1,
            className = '',
            inputProps = {},
          } = field;

          let value = getValueByPath(data, path);
          if (type === 'array') value = joinArray(value);
          if (value === null) value = '';

          const containerClass = `${colSpan === 2 ? 'md:col-span-2' : ''} ${colSpan === 3 ? 'md:col-span-3' : ''}`.trim();
          const inputClass = `w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed ${className}`.trim();
          const labelClass = "block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2";
          const icon = getFieldIcon(type, path);

          const handleChange = (e) => {
            if (type === 'checkbox') {
              setData((prev) => setValueByPath(prev, path, !!e.target.checked));
              return;
            }
            const raw = e.target.value;
            let next = raw;
            if (type === 'number') next = toNumberOrNull(raw);
            if (type === 'array') next = splitToArray(raw);
            setData((prev) => setValueByPath(prev, path, next));
          };

          // Tags Input Type with Enhanced UI
          if (type === 'tags') {
            const tags = Array.isArray(value) ? value : [];
            const [inputValue, setInputValue] = React.useState('');
          
            const handleAddTag = () => {
              const trimmed = inputValue.trim();
              if (trimmed && !tags.includes(trimmed)) {
                setData((prev) => setValueByPath(prev, path, [...tags, trimmed]));
              }
              setInputValue('');
            };
          
            const handleRemoveTag = (tag) => {
              setData((prev) => setValueByPath(prev, path, tags.filter((t) => t !== tag)));
            };
          
            const handleKeyDown = (e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            };
          
            return (
              <div key={path} className={containerClass}>
                <label className={labelClass}>
                  {icon && <span className="text-lg">{icon}</span>}
                  {label}
                  {required && <span className="text-red-500 text-base">*</span>}
                </label>
                <div className="relative flex flex-wrap items-center gap-2 border-2 border-gray-200 rounded-xl px-3 py-2 bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all min-h-[52px]">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        className="hover:bg-white/20 rounded-full w-5 h-5 flex items-center justify-center transition-colors text-lg leading-none"
                        onClick={() => handleRemoveTag(tag)}
                        disabled={disabled}
                        title="Remove tag"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    disabled={disabled}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={tags.length === 0 ? (placeholder || 'Type and press Enter') : ''}
                    className="flex-1 outline-none text-sm py-1 min-w-[120px] disabled:bg-transparent disabled:cursor-not-allowed"
                  />
                  {inputValue && (
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors"
                    >
                      Add
                    </button>
                  )}
                </div>
                {placeholder && (
                  <small className="text-gray-500 text-xs mt-1.5 block flex items-center gap-1">
                    <span>💡</span> {placeholder}
                  </small>
                )}
              </div>
            );
          }

          // Textarea Type with Character Counter
          if (type === 'textarea') {
            const maxLength = inputProps.maxLength || 1000;
            const currentLength = value?.toString().length || 0;
            
            return (
              <div key={path} className={containerClass}>
                <label className={labelClass}>
                  {icon && <span className="text-lg">{icon}</span>}
                  {label}
                  {required && <span className="text-red-500 text-base">*</span>}
                </label>
                <div className="relative">
                  <textarea
                    className={`${inputClass} resize-none`}
                    disabled={disabled}
                    required={required}
                    placeholder={placeholder || label}
                    rows={rows}
                    value={value}
                    onChange={handleChange}
                    maxLength={maxLength}
                    {...inputProps}
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded">
                    {currentLength}/{maxLength}
                  </div>
                </div>
              </div>
            );
          }

          // Checkbox Type with Toggle Switch Style
          if (type === 'checkbox') {
            const isChecked = !!getValueByPath(data, path);
            return (
              <div key={path} className={containerClass}>
                <label className="group relative flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all">
                  <span className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    {icon && <span className="text-xl">{icon}</span>}
                    {label || placeholder}
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      disabled={disabled}
                      checked={isChecked}
                      onChange={handleChange}
                      className="sr-only"
                      {...inputProps}
                    />
                    <div className={`w-14 h-7 rounded-full transition-colors ${
                      isChecked ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-300'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                        isChecked ? 'translate-x-8' : 'translate-x-1'
                      } mt-1`}></div>
                    </div>
                  </div>
                </label>
              </div>
            );
          }

          // Select Type (with subCategory logic)
          if (type === 'select') {
            if (path === "subCategory") {
              const category = data.category;
              const options = subCategoryOptions[category] || [];
              return (
                <div key={path} className={containerClass}>
                  <label className={labelClass}>
                    {icon && <span className="text-lg">{icon}</span>}
                    {label}
                    {required && <span className="text-red-500 text-base">*</span>}
                  </label>
                  <div className="relative">
                    <select
                      className={`${inputClass} appearance-none pr-10`}
                      disabled={disabled || !category}
                      value={value || ''}
                      onChange={(e) => setData((prev) => setValueByPath(prev, path, e.target.value))}
                    >
                      <option value="">{placeholder || 'Select subcategory'}</option>
                      {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {!category && (
                    <small className="text-orange-500 text-xs mt-1.5 block flex items-center gap-1">
                      <span>⚠️</span> Please select a category first
                    </small>
                  )}
                </div>
              );
            }
            
            return (
              <div key={path} className={containerClass}>
                <label className={labelClass}>
                  {icon && <span className="text-lg">{icon}</span>}
                  {label}
                  {required && <span className="text-red-500 text-base">*</span>}
                </label>
                <div className="relative">
                  <select
                    className={`${inputClass} appearance-none pr-10`}
                    disabled={disabled}
                    required={required}
                    value={value || ''}
                    onChange={(e) => setData((prev) => setValueByPath(prev, path, e.target.value))}
                  >
                    <option value="">{placeholder || 'Select option'}</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          }

          // Multiselect Type with Pills Display
          // if (type === 'multiselect') {
          //   const selectedValues = Array.isArray(value) ? value : [];
          //   return (
          //     <div key={path} className={containerClass}>
          //       <label className={labelClass}>
          //         {icon && <span className="text-lg">{icon}</span>}
          //         {label}
          //         {required && <span className="text-red-500 text-base">*</span>}
          //       </label>
          //       <select
          //         multiple
          //         className={`${inputClass} h-32`}
          //         disabled={disabled}
          //         value={selectedValues}
          //         onChange={(e) => {
          //           const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
          //           setData((prev) => setValueByPath(prev, path, selected));
          //         }}
          //       >
          //         {field.options?.map((opt) => (
          //           <option key={opt.value} value={opt.value}>
          //             {opt.label}
          //           </option>
          //         ))}
          //       </select>
          //       {selectedValues.length > 0 && (
          //         <div className="mt-2 flex flex-wrap gap-2">
          //           {selectedValues.map((val, i) => (
          //             <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
          //               {field.options?.find(o => o.value === val)?.label || val}
          //             </span>
          //           ))}
          //         </div>
          //       )}
          //       {placeholder && (
          //         <small className="text-gray-500 text-xs mt-1.5 block flex items-center gap-1">
          //           <span>💡</span> {placeholder}
          //         </small>
          //       )}
          //     </div>
          //   );
          // }
          // ✅ Modern Multiselect Dropdown (Tailwind-based)
if (type === 'multiselect') {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const selectedValues = Array.isArray(value) ? value : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (val) => {
    const updated = selectedValues.includes(val)
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val];
    setData((prev) => setValueByPath(prev, path, updated));
  };

  const removeOption = (val) => {
    const updated = selectedValues.filter((v) => v !== val);
    setData((prev) => setValueByPath(prev, path, updated));
  };

  return (
    <div key={path} className={`${containerClass} relative`} ref={dropdownRef}>
      {/* Label */}
      <label className={labelClass}>
        {icon && <span className="text-lg">{icon}</span>}
        {label}
        {required && <span className="text-red-500 text-base">*</span>}
      </label>

      {/* Trigger */}
      <div
        onClick={() => !disabled && setOpen(!open)}
        className={`border rounded-lg px-3 py-2 flex justify-between items-center cursor-pointer mt-1 ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white hover:border-blue-400"
        }`}
      >
        <div className="flex flex-wrap gap-1 items-center text-sm text-gray-700">
          {selectedValues.length > 0 ? (
            selectedValues.map((val) => {
              const option = field.options?.find((o) => o.value === val);
              return (
                <span
                  key={val}
                  className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
                >
                  {option?.label || val}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeOption(val);
                    }}
                  />
                </span>
              );
            })
          ) : (
            <span className="text-gray-400 text-sm">
              {placeholder || "Select options"}
            </span>
          )}
        </div>
        <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
      </div>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-md max-h-48 overflow-y-auto">
          {field.options?.map((opt) => (
            <div
              key={opt.value}
              onClick={() => toggleOption(opt.value)}
              className={`px-3 py-2 flex items-center justify-between cursor-pointer text-sm transition-colors ${
                selectedValues.includes(opt.value)
                  ? "bg-blue-50 text-blue-700"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <span>{opt.label}</span>
              {selectedValues.includes(opt.value) && (
                <Check className="h-4 w-4 text-blue-600" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Placeholder help text */}
      {placeholder && (
        <small className="text-gray-500 text-xs mt-1.5 block flex items-center gap-1">
          <span>💡</span> {placeholder}
        </small>
      )}
    </div>
  );
}


          // Number Input with Currency/Unit Display
          if (type === 'number') {
            const unit = path?.includes('price') ? 'EGP' : 
                        path?.includes('weight') ? 'g' : 
                        path?.includes('dimension') ? 'cm' : 
                        path?.includes('warranty') ? 'months' : null;
            
            return (
              <div key={path} className={containerClass}>
                <label className={labelClass}>
                  {icon && <span className="text-lg">{icon}</span>}
                  {label}
                  {required && <span className="text-red-500 text-base">*</span>}
                </label>
                <div className="relative">
                  {unit && path?.includes('price') && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">
                      {unit}
                    </span>
                  )}
                  <input
                    className={`${inputClass} ${unit && path?.includes('price') ? 'pl-16' : ''}`}
                    disabled={disabled}
                    required={required}
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    placeholder={placeholder || label}
                    value={value}
                    onChange={handleChange}
                    {...inputProps}
                  />
                  {unit && !path?.includes('price') && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">
                      {unit}
                    </span>
                  )}
                </div>
              </div>
            );
          }

          // Default Input Types (text, email, url, date, etc.)
          return (
            <div key={path} className={containerClass}>
              <label className={labelClass}>
                {icon && <span className="text-lg">{icon}</span>}
                {label}
                {required && <span className="text-red-500 text-base">*</span>}
              </label>
              <input
                className={inputClass}
                disabled={disabled}
                required={required}
                type={type === 'array' ? 'text' : type}
                min={min}
                max={max}
                step={step}
                placeholder={placeholder || label}
                value={value}
                onChange={handleChange}
                {...inputProps}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}