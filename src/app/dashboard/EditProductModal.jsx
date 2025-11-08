'use client';
import { useState } from 'react';
import SmartSection from '@/app/dashboard/SmartFields';
import Image from 'next/image';
import { fieldsBasic, fieldsMedia, fieldsPricing, fieldsSpecs} from "@/app/dashboard/FieldDefinitions"

export default function EditProductModal({ product, isOpen, onClose, onSave }) {
  const [productData, setProductData] = useState(product || {});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      setIsSaving(true);

      const res = await fetch(`/api/products/${productData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setMessage('✅ Product updated successfully!');
      onSave(updated); 
      setTimeout(() => onClose(), 1000);
    } catch (err) {
      setError('❌ Error while updating product');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          className="absolute top-2 right-3 text-gray-600 hover:text-red-600"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {message && <p className="text-green-600 text-sm mb-2">{message}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <SmartSection
            legend="Basic Info"
            fields={fieldsBasic}
            data={productData}
            setData={setProductData}
          />
          <SmartSection
            legend="Media & Tags"
            fields={fieldsMedia}
            data={productData}
            setData={setProductData}
          />
          <SmartSection
            legend="Pricing & Stock"
            fields={fieldsPricing}
            data={productData}
            setData={setProductData}
          />
          <SmartSection
            legend="Key Specs"
            fields={fieldsSpecs}
            data={productData}
            setData={setProductData}
          />

          {productData.image?.url && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-1">Current Image:</p>
              <div className="relative w-32 h-32 border rounded overflow-hidden">
                <Image
                  src={productData.image.url}
                  alt={productData.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
