'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, addToCartAsync } from '@/store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';

interface Product {
  id: number | string;
  name: string;
  price: number | string;
  karat: string;
  image: string;
  slug?: string;
  category?: string;
}

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  onToast?: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function ProductCard({ product, viewMode = 'grid', onToast }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();
  
  // Check if product is in wishlist
  const { items = [] } = useAppSelector((state) => state.wishlist || { items: [] });
  const isInWishlist = items.some(item => item.id === product.id);
  const isAuthenticated = useAppSelector((state) => state.auth?.isAuthenticated || false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const price = typeof product.price === 'string' 
      ? parseFloat(product.price.replace(/,/g, ''))
      : product.price;
    
    if (isAuthenticated) {
      // Use API for authenticated users
      try {
        await dispatch(addToCartAsync({ 
          productId: String(product.id), 
          quantity: 1,
          productData: {
            id: product.id,
            name: product.name,
            price,
            karat: product.karat,
            image: product.image,
          }
        })).unwrap();
        onToast?.('Added to cart!', 'success');
      } catch (error) {
        console.error('Failed to add to cart:', error);
        onToast?.('Failed to add to cart', 'error');
      }
    } else {
      // Use local storage for guest users
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price,
        karat: product.karat,
        image: product.image,
      }));
      onToast?.('Added to cart!', 'success');
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const price = typeof product.price === 'string' 
      ? parseFloat(product.price.replace(/,/g, ''))
      : product.price;
    
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      onToast?.('Removed from wishlist', 'info');
    } else {
      dispatch(addToWishlist({
        id: product.id,
        name: product.name,
        price,
        karat: product.karat,
        image: product.image,
      }));
      onToast?.('Added to wishlist!', 'success');
    }
  };

  const price = typeof product.price === 'string' 
    ? parseFloat(product.price.replace(/,/g, ''))
    : product.price;

  const productUrl = product.slug && product.category 
    ? `/${product.category}/${product.slug}?name=${encodeURIComponent(product.name)}&price=${price}&karat=${encodeURIComponent(product.karat)}`
    : '#';

  // List View
  if (viewMode === 'list') {
    return (
      <a
        href={productUrl}
        className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 group flex flex-col sm:flex-row gap-3 xs:gap-4 sm:gap-6 p-2 xs:p-3 sm:p-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative w-full sm:w-60 md:w-80 h-60 sm:h-60 md:h-80 flex-shrink-0 overflow-hidden bg-gray-100 rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 320px"
            unoptimized
          />
          
          {/* Heart Icon - Always Visible in Top Right */}
          <button 
            className={`absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition shadow-lg ${
              isInWishlist 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-white hover:bg-gray-50'
            }`}
            onClick={handleToggleWishlist}
            title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            {isInWishlist ? (
              <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            )}
          </button>

          {/* Cart Button - Shows on Hover at Bottom - Hidden on mobile */}
          <div className={`hidden sm:flex absolute bottom-0 left-0 right-0 pb-2 sm:pb-3 justify-center transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            <button 
              className="w-[90%] bg-white text-gray-800 py-2 sm:py-3 font-medium hover:bg-[#B8941E] hover:text-white transition flex items-center justify-center gap-2 rounded text-xs sm:text-sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center py-1 xs:py-2 sm:py-3">
          <h3 className="text-base xs:text-lg sm:text-2xl font-normal text-[#D4A574] mb-1 xs:mb-1.5 sm:mb-3 group-hover:text-[#B8941E] transition line-clamp-2">
            {product.name}
          </h3>
          <p className="text-lg xs:text-xl sm:text-3xl font-normal text-gray-800 mb-1.5 xs:mb-2 sm:mb-4">
            ₹ {typeof product.price === 'string' ? product.price : product.price.toLocaleString('en-IN')}
          </p>
          
          {/* Size Options */}
          <div className="flex gap-1.5 xs:gap-2 mb-2 xs:mb-3 sm:mb-4">
            <button className="w-8 h-8 xs:w-9 xs:h-9 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 border-2 border-gray-300 hover:border-[#B8941E] rounded flex items-center justify-center text-xs sm:text-sm font-medium transition">
              S
            </button>
            <button className="w-8 h-8 xs:w-9 xs:h-9 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 border-2 border-gray-300 hover:border-[#B8941E] rounded flex items-center justify-center text-xs sm:text-sm font-medium transition">
              L
            </button>
            <button className="w-8 h-8 xs:w-9 xs:h-9 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 border-2 border-gray-300 hover:border-[#B8941E] rounded flex items-center justify-center text-xs sm:text-sm font-medium transition">
              M
            </button>
          </div>
        </div>
      </a>
    );
  }

  // Grid View
  return (
    <a
      href={productUrl}
      className="bg-white rounded-lg overflow-hidden hover:shadow-xs transition-all duration-300 group cursor-pointer block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized
        />
        
        {/* Heart Icon - Always Visible in Top Right */}
        <button 
          className={`absolute top-1.5 xs:top-2 sm:top-3 right-1.5 xs:right-2 sm:right-3 w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition z-10 ${
            isInWishlist 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-white hover:bg-gray-50'
          }`}
          onClick={handleToggleWishlist}
          title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {isInWishlist ? (
            <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          )}
        </button>

        {/* Cart Button - Shows on Hover at Bottom - Hidden on mobile */}
        <div className={`hidden sm:flex absolute bottom-0 left-0 right-0 pb-2 sm:pb-3 justify-center transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <button 
            className="w-[90%] bg-white text-gray-800 py-2 sm:py-3 font-medium hover:bg-[#B8941E] hover:text-white transition flex items-center justify-center gap-2 rounded text-xs sm:text-sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Add to Cart</span>
          </button>
        </div>

        {/* Badge */}
        <div className="absolute top-1.5 xs:top-2 sm:top-3 left-1.5 xs:left-2 sm:left-3 bg-[#B8941E] text-white text-[9px] xs:text-[10px] sm:text-xs font-bold px-1.5 xs:px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
          NEW
        </div>
      </div>

      {/* Product Info */}
      <div className="p-2 xs:p-2.5 sm:p-3 md:p-4">
        <p className="text-[9px] xs:text-[10px] sm:text-xs text-[#B8941E] font-medium mb-0.5 sm:mb-1">{product.karat}</p>
        <h3 className="font-bold text-xs xs:text-sm sm:text-base mb-1 sm:mb-2 text-[#1a1a1a] group-hover:text-[#B8941E] transition line-clamp-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-sm xs:text-base sm:text-lg font-bold text-[#1a1a1a]">
          ₹ {typeof product.price === 'string' ? product.price : product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </a>
  );
}
