import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

export default function ImageGallery({ mainImage, images = [], productName }) {
  const [displayImage, setDisplayImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const allImages = useMemo(() => {
    const imgs = Array.isArray(images) ? [...images] : [];
    
    if (mainImage?.url && !imgs.some(img => img.public_id === mainImage.public_id)) {
      imgs.unshift(mainImage); 
    }

    return imgs;
  }, [images, mainImage]);

  useEffect(() => {
    if (allImages.length > 0) {
      setDisplayImage(allImages[0]);
    } else {
      setDisplayImage(null);
    }
  }, [allImages]);

  if (!allImages.length) {
    return (
      <div className="flex gap-x-8 sticky top-24 self-start">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-gray-200 border-2 border-dashed rounded-lg" />
        </div>
        <div className="flex-1 bg-gray-100 rounded-xl min-h-96 flex items-center justify-center">
          <p className="text-gray-500">لا تتوفر صور للمنتج</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-x-8 sticky top-24 self-start">
      {/* Thumbnails */}
      <div className="self-start">
        <div className="bg-white p-4 max-sm:p-2 rounded-xl shadow-sm border border-gray-100 space-y-3">
          {allImages?.map((img, i) => (
            <div
              key={img.public_id || i}
              className={`relative rounded-lg overflow-hidden cursor-pointer ${
                displayImage?.public_id === img.public_id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setDisplayImage(img)}
            >
              {img?.url && (
                <Image
                  src={img.url}
                  alt={`${productName} thumbnail ${i + 1}`}
                  width={64}
                  height={64}
                  sizes="(max-width: 640px) 40px, 64px"
                  className="object-cover hover:opacity-80 transition-opacity"
                  priority={i === 0}
                />
              )}
              {displayImage?.public_id === img.public_id && (
                <div className="absolute inset-0 bg-blue-500/10" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main image */}
      <div className="flex-1 self-start">
        <div
          className="relative bg-white rounded-xl p-8 shadow-sm border border-gray-100"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        >
          {displayImage?.url ? (
            <div className="relative w-full max-w-xl mx-auto aspect-square">
              <Image
                src={displayImage.url}
                alt={productName}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-contain rounded-lg transition-all duration-300 ${
                  isZoomed ? 'scale-105 shadow-xl' : ''
                }`}
                priority
              />
            </div>
          ) : (
            <div className="w-full max-w-xl mx-auto aspect-square bg-gray-100 rounded-lg animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}
