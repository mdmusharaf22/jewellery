'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  onZoomChange?: (isZoomed: boolean, position: { x: number; y: number }, imageUrl: string) => void;
}

export default function ProductImageGallery({ images, productName, onZoomChange }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const { isInWishlist } = useWishlist();

  // Auto-swipe functionality - pauses when hovering
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
    onZoomChange?.(true, { x, y }, images[selectedImage]);
  };

  const handleMouseEnter = () => {
    setShowZoom(true);
    setIsPaused(true);
    onZoomChange?.(true, zoomPosition, images[selectedImage]);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
    setIsPaused(false);
    onZoomChange?.(false, zoomPosition, images[selectedImage]);
  };

  return (
    <div className="flex gap-4">
      {/* Thumbnail Column */}
      <div className="flex flex-col gap-3 w-20">
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
              sizes="80px"
              unoptimized
            />
          </button>
        ))}
      </div>

      {/* Main Image - 1:1 Ratio */}
      <div className="flex-1 relative">
        <div 
          ref={imageRef}
          className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={images[selectedImage]}
            alt={productName}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            unoptimized
          />
          
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Wishlist Button */}
          <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition z-10">
            <Heart className="w-5 h-5 text-gray-700" />
          </button>

          {/* Image Indicator Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-2 h-2 rounded-full transition ${
                  selectedImage === index ? 'bg-[#B8941E] w-6' : 'bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Hover text */}
          {!showZoom && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded pointer-events-none">
              Hover to zoom
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
