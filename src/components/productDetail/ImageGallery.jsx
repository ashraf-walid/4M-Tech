import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ImageGallery({ images, productName }) {
  const [displayImage, setDisplayImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (Array.isArray(images) && images.length > 0) {
      setDisplayImage(images[0]); 
    }
  }, [images]);

  return (
    <div className="flex gap-x-8 sticky top-24 self-start">
      {/* Thumbnails */}
      <div className="self-start">
        <div className="bg-white p-4 max-sm:p-2 rounded-xl shadow-sm border border-gray-100 space-y-3">
          {images?.map((img, i) => (
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
