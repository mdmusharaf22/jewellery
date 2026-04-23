'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { Shield, Truck, RefreshCw, Repeat } from 'lucide-react';
import Toast from '@/components/Toast';

interface ProductInfoProps {
  product: {
    id: number;
    name: string;
    category: string;
    price: number;
    karat: string;
    description: string;
    purityOptions: string[];
    lengthOptions: string[];
    images: string[];
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedPurity, setSelectedPurity] = useState(product.purityOptions[0]);
  const [selectedLength, setSelectedLength] = useState(product.lengthOptions[0]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const dispatch = useAppDispatch();

  // Format category for display
  const displayCategory = product.category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .toUpperCase();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      karat: product.karat,
      image: product.images[0],
    }));
    setToast({ message: 'Added to cart!', type: 'success' });
  };

  const trustBadges = [
    {
      icon: Shield,
      title: '100% Certified',
      description: 'BIS Hallmarked Gold',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Fully insured across India',
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      description: '15-day return policy',
    },
    {
      icon: Repeat,
      title: 'Lifetime Exchange',
      description: 'Upgrade anytime',
    },
  ];

  return (
    <div className="space-y-4 xs:space-y-5 sm:space-y-6">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      {/* Category */}
      <p className="text-xs sm:text-sm text-[#B8941E] font-medium tracking-wide">{displayCategory}</p>

      {/* Product Name */}
      <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{product.name}</h1>

      {/* Price */}
      <div>
        <p className="text-2xl xs:text-2xl sm:text-3xl font-bold text-gray-900">₹ {product.price.toLocaleString('en-IN')}</p>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">Inclusive of all taxes & making charges</p>
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{product.description}</p>

      {/* Gold Purity */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">GOLD PURITY</label>
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          {product.purityOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedPurity(option)}
              className={`px-4 xs:px-5 sm:px-6 py-1.5 sm:py-2 border-2 rounded transition text-sm sm:text-base ${
                selectedPurity === option
                  ? 'border-[#B8941E] bg-[#FFF8E7] text-[#B8941E]'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Length */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">LENGTH</label>
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          {product.lengthOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedLength(option)}
              className={`px-4 xs:px-5 sm:px-6 py-1.5 sm:py-2 border-2 rounded transition text-sm sm:text-base ${
                selectedLength === option
                  ? 'border-[#B8941E] bg-[#FFF8E7] text-[#B8941E]'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Customization */}
      <div className="bg-[#FFF8E7] p-3 xs:p-3.5 sm:p-4 rounded-lg">
        <p className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Want to customize this piece?</p>
        <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3">
          Change gemstones, size or weight according to your preference.
        </p>
        <button className="text-[#B8941E] font-medium hover:underline text-sm sm:text-base">Enquire</button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4">
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-[#B8941E] text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#9a7a19] transition text-sm sm:text-base"
        >
          Add to Cart
        </button>
        <button className="flex-1 border-2 border-[#B8941E] text-[#B8941E] py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#FFF8E7] transition text-sm sm:text-base">
          Book Store Visit
        </button>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-gray-200 pt-4 sm:pt-6">
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex items-start gap-2 sm:gap-3">
              <div className="flex-shrink-0">
                <badge.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#B8941E]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-xs sm:text-sm">{badge.title}</p>
                <p className="text-[10px] sm:text-xs text-gray-600">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
