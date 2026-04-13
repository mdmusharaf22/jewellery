'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Shield, Truck, RefreshCw, Repeat } from 'lucide-react';

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
  const { addToCart } = useCart();

  // Format category for display
  const displayCategory = product.category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .toUpperCase();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      karat: product.karat,
      image: product.images[0],
    });
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
    <div className="space-y-6">
      {/* Category */}
      <p className="text-sm text-[#B8941E] font-medium tracking-wide">{displayCategory}</p>

      {/* Product Name */}
      <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

      {/* Price */}
      <div>
        <p className="text-3xl font-bold text-gray-900">₹ {product.price.toLocaleString('en-IN')}</p>
        <p className="text-sm text-gray-600 mt-1">Inclusive of all taxes & making charges</p>
      </div>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed">{product.description}</p>

      {/* Gold Purity */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">GOLD PURITY</label>
        <div className="flex gap-3">
          {product.purityOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedPurity(option)}
              className={`px-6 py-2 border-2 rounded transition ${
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
        <label className="block text-sm font-semibold text-gray-900 mb-3">LENGTH</label>
        <div className="flex gap-3">
          {product.lengthOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedLength(option)}
              className={`px-6 py-2 border-2 rounded transition ${
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
      <div className="bg-[#FFF8E7] p-4 rounded-lg">
        <p className="font-semibold text-gray-900 mb-1">Want to customize this piece?</p>
        <p className="text-sm text-gray-700 mb-3">
          Change gemstones, size or weight according to your preference.
        </p>
        <button className="text-[#B8941E] font-medium hover:underline">Enquire</button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-[#B8941E] text-white py-3 rounded-lg font-semibold hover:bg-[#9a7a19] transition"
        >
          Add to Cart
        </button>
        <button className="flex-1 border-2 border-[#B8941E] text-[#B8941E] py-3 rounded-lg font-semibold hover:bg-[#FFF8E7] transition">
          Book Store Visit
        </button>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-gray-200 pt-6">
        <div className="grid grid-cols-2 gap-4">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <badge.icon className="w-5 h-5 text-[#B8941E]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{badge.title}</p>
                <p className="text-xs text-gray-600">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
