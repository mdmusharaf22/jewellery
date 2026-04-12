'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { isInWishlist } = useWishlist();

  return (
    <div className="flex gap-4">
      {/* Thumbnail Column */}
      <div className="flex flex-col gap-4 w-24">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
              selectedImage === index ? 'border-[#B8941E]' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Image
              src={image}
              alt={`${productName} view ${index + 1}`}
              fill
              className="object-cover"
              sizes="96px"
              unoptimized
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative aspect-square rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={images[selectedImage]}
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          unoptimized
        />
        
        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition">
          <Heart className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
