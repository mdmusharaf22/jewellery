'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';
import Toast from '@/components/Toast';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  productId?: number;
  productPrice?: number;
  productKarat?: string;
}

export default function ProductImageGallery({ images, productName, productId, productPrice, productKarat }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();

  // Ensure component is mounted (for portal)
  useEffect(() => {
    setMounted(true);
  }, []);
  
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

  // Open lightbox
  const openLightbox = (index: number) => {
    setLightboxImage(index);
    setIsLightboxOpen(true);
    // Prevent background scroll
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    // Restore scroll
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  };

  // Lightbox navigation
  const handleLightboxPrev = () => {
    setLightboxImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleLightboxNext = () => {
    setLightboxImage((prev) => (prev + 1) % images.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        setLightboxImage((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        setLightboxImage((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, images.length]);

  // Auto-swipe functionality - pauses when hovering or page is hidden
  useEffect(() => {
    if (isPaused || document.hidden || isLightboxOpen) return;
    
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isPaused, isLightboxOpen]);

  // Handle page visibility changes for auto-swipe
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(prev => prev);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4 overflow-hidden">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        
        {/* Thumbnail Column */}
        <div className="flex sm:flex-col gap-2 sm:gap-3 w-full sm:w-16 md:w-20 overflow-x-auto sm:overflow-x-visible">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square rounded-md sm:rounded-lg overflow-hidden border-2 transition flex-shrink-0 w-16 sm:w-full ${
                selectedImage === index ? 'border-[#B8941E]' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} view ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 64px, 80px"
                unoptimized
              />
            </button>
          ))}
        </div>

        {/* Main Image - 1:1 Ratio */}
        <div className="flex-1 relative min-w-0">
          <div 
            className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
            onClick={() => openLightbox(selectedImage)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <Image
              src={images[selectedImage]}
              alt={productName}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
              priority
              unoptimized
            />
            
            {/* Navigation Arrows */}
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
              className="absolute left-2 xs:left-3 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition z-10"
            >
              <ChevronLeft className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-2 xs:right-3 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition z-10"
            >
              <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>

            {/* Wishlist Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); handleToggleWishlist(); }}
              className={`absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition z-10 ${
                isInWishlist 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              {isInWishlist ? (
                <svg className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              )}
            </button>

            {/* Image Indicator Dots */}
            <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(index); }}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition ${
                    selectedImage === index ? 'bg-[#B8941E] w-4 sm:w-6' : 'bg-white/70'
                  }`}
                />
              ))}
            </div>

            {/* Click to view text */}
            <div className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded pointer-events-none">
              Click to view full size
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal - Rendered via Portal */}
      {mounted && isLightboxOpen && createPortal(
        <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden" style={{ zIndex: 999999 }}>
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition z-50"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button */}
          <button
            onClick={handleLightboxPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition z-50"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleLightboxNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition z-50"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Image */}
          <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden z-10">
            <div className="relative w-full h-full max-w-6xl max-h-full">
              <Image
                src={images[lightboxImage]}
                alt={`${productName} - Image ${lightboxImage + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm z-50">
            {lightboxImage + 1} / {images.length}
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4 pb-2 scrollbar-hide z-50">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setLightboxImage(index)}
                className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition ${
                  lightboxImage === index ? 'border-[#B8941E]' : 'border-white/30 hover:border-white/50'
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
