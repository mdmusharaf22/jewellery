'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';
import Toast from '@/components/Toast';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  productId?: number;
  productPrice?: number;
  productKarat?: string;
  onZoomChange?: (isZoomed: boolean, position: { x: number; y: number }, imageUrl: string) => void;
}

export default function ProductImageGallery({ images, productName, productId, productPrice, productKarat, onZoomChange }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  
  // Check if product is in wishlist
  const { items = [] } = useAppSelector((state) => state.wishlist || { items: [] });
  const isInWishlist = productId ? items.some(item => item.id === productId) : false;

  const handleToggleWishlist = () => {
    if (productId && productPrice && productKarat) {
      if (isInWishlist) {
        dispatch(removeFromWishlist(productId));
        setToast({ message: 'Removed from wishlist', type: 'info' });
      } else {
        dispatch(addToWishlist({
          id: productId,
          name: productName,
          price: productPrice,
          karat: productKarat,
          image: images[0],
        }));
        setToast({ message: 'Added to wishlist!', type: 'success' });
      }
    }
  };

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
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
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
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition z-10 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition z-10 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Wishlist Button */}
          <button 
            onClick={handleToggleWishlist}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition z-10 cursor-pointer ${
              isInWishlist 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            {isInWishlist ? (
              // Filled solid heart
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            ) : (
              // Outline heart
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            )}
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
