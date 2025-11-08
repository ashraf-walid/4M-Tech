'use client';

import React from "react";

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

  return (
    <fieldset className="border rounded-md p-4">
      {legend ? <legend className="px-2 font-medium">{legend}</legend> : null}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

          const baseClass = `border rounded px-3 py-2 ${className} ${colSpan === 2 ? 'md:col-span-2' : ''} ${colSpan === 3 ? 'md:col-span-3' : ''}`.trim();

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
              <div
                key={path}
                className={`flex flex-col gap-2 ${colSpan === 2 ? 'md:col-span-2' : ''}`}
              >
                <label className="text-sm font-medium">{label}</label>
                <div className="flex flex-wrap items-center gap-2 border rounded px-3 py-2 bg-white">
                  {tags.map((tag, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        className="text-blue-600 hover:text-red-600 font-bold"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    disabled={disabled}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-1 outline-none text-sm py-1"
                  />
                </div>
                <small className="text-gray-500 text-xs">{placeholder}</small>
              </div>
            );
          }          

          if (type === 'textarea') {
            return (
              <textarea
                key={path}
                className={`${baseClass} md:col-span-3`}
                disabled={disabled}
                required={required}
                placeholder={placeholder || label}
                rows={rows}
                value={value}
                onChange={handleChange}
                {...inputProps}
              />
            );
          }

          if (type === 'checkbox') {
            return (
              <label key={path} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  disabled={disabled}
                  checked={!!getValueByPath(data, path)}
                  onChange={handleChange}
                  {...inputProps}
                />
                {label || placeholder}
              </label>
            );
          }

          if (type === 'select') {
            if (path === "subCategory") {
              const category = data.category;
              const options = subCategoryOptions[category] || [];
              return (
                <select
                  key={path}
                  className={`border rounded px-3 py-2`}
                  disabled={disabled || !category}
                  value={value || ''}
                  onChange={(e) => setData((prev) => setValueByPath(prev, path, e.target.value))}
                >
                  <option value="">{placeholder}</option>
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              );
            }            
            return (
              <select
                key={path}
                className={`border rounded px-3 py-2 ${colSpan === 2 ? 'md:col-span-2' : ''} ${colSpan === 3 ? 'md:col-span-3' : ''}`}
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
            );
          }

          if (type === 'multiselect') {
            const selectedValues = Array.isArray(value) ? value : [];
            return (
              <div key={path} className={`flex flex-col ${colSpan === 2 ? 'md:col-span-2' : ''}`}>
                <label className="text-sm font-medium mb-1">{label}</label>
                <select
                  multiple
                  className="border rounded px-3 py-2"
                  disabled={disabled}
                  value={selectedValues}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
                    setData((prev) => setValueByPath(prev, path, selected));
                  }}
                >
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <small className="text-gray-500 text-xs mt-1">{placeholder}</small>
              </div>
            );
          }
          
          return (
            <input
              key={path}
              className={baseClass}
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
          );
        })}
      </div>
    </fieldset>
  );
}


