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


