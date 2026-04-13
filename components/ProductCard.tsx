'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface Product {
  id: number;
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
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const price = typeof product.price === 'string' 
      ? parseFloat(product.price.replace(/,/g, ''))
      : product.price;
    
    addToCart({
      id: product.id,
      name: product.name,
      price,
      karat: product.karat,
      image: product.image,
    });
    onToast?.('Added to cart!', 'success');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const price = typeof product.price === 'string' 
      ? parseFloat(product.price.replace(/,/g, ''))
      : product.price;
    
    if (inWishlist) {
      removeFromWishlist(product.id);
      onToast?.('Removed from wishlist', 'info');
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price,
        karat: product.karat,
        image: product.image,
      });
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
        className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 group flex flex-col sm:flex-row gap-6 p-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative w-full sm:w-80 h-80 flex-shrink-0 overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          
          {/* Heart Icon - Always Visible in Top Right */}
          <button 
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg ${
              inWishlist 
                ? 'bg-[#B8941E] text-white' 
                : 'bg-white text-gray-700 hover:bg-[#B8941E] hover:text-white'
            }`}
            onClick={handleToggleWishlist}
            title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className="w-4 h-4" fill={inWishlist ? 'currentColor' : 'none'} />
          </button>

          {/* Cart Button - Shows on Hover at Bottom */}
          <div className={`absolute bottom-0 left-0 right-0 pb-3 flex justify-center transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            <button 
              className="w-[90%] bg-white text-gray-800 py-3 font-medium hover:bg-[#B8941E] hover:text-white transition flex items-center justify-center gap-2 rounded shadow-lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center py-4">
          <h3 className="text-2xl font-normal text-[#D4A574] mb-4 group-hover:text-[#B8941E] transition">
            {product.name}
          </h3>
          <p className="text-3xl font-normal text-gray-800 mb-6">
            ₹ {typeof product.price === 'string' ? product.price : product.price.toLocaleString('en-IN')}
          </p>
          
          {/* Size Options */}
          <div className="flex gap-2 mb-6">
            <button className="w-12 h-12 border-2 border-gray-300 hover:border-[#B8941E] rounded flex items-center justify-center text-sm font-medium transition">
              S
            </button>
            <button className="w-12 h-12 border-2 border-gray-300 hover:border-[#B8941E] rounded flex items-center justify-center text-sm font-medium transition">
              L
            </button>
            <button className="w-12 h-12 border-2 border-gray-300 hover:border-[#B8941E] rounded flex items-center justify-center text-sm font-medium transition">
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
          unoptimized
        />
        
        {/* Heart Icon - Always Visible in Top Right */}
        <button 
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition z-10 ${
            inWishlist 
              ? 'bg-[#B8941E] text-white' 
              : 'bg-white text-gray-700 hover:bg-[#B8941E] hover:text-white'
          }`}
          onClick={handleToggleWishlist}
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className="w-5 h-5" fill={inWishlist ? 'currentColor' : 'none'} />
        </button>

        {/* Cart Button - Shows on Hover at Bottom */}
        <div className={`absolute bottom-0 left-0 right-0 pb-3 flex justify-center transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <button 
            className="w-[90%] bg-white text-gray-800 py-3 font-medium hover:bg-[#B8941E] hover:text-white transition flex items-center justify-center gap-2 rounded"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        </div>

        {/* Badge */}
        <div className="absolute top-3 left-3 bg-[#B8941E] text-white text-xs font-bold px-3 py-1 rounded-full">
          NEW
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-[#B8941E] font-medium mb-1">{product.karat}</p>
        <h3 className="font-bold text-base mb-2 text-[#1a1a1a] group-hover:text-[#B8941E] transition line-clamp-2">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-[#1a1a1a]">
          ₹ {typeof product.price === 'string' ? product.price : product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </a>
  );
}
