'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function ProductFilters({ selectedCategory, onCategoryChange }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    priceRange: true,
    carat: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const categories = {
    gold: ['TALI', 'TALI CHAIN', 'Necklace', 'Kalipot', 'Dollar chain', 'Stud', 'Bangles', 'Gold Kaapu', 'Bracelet', 'Gold Jhumkas', 'Gold Dollar', 'Gold Ring', 'All', 'Haram'],
    silver: ['Anklet', 'Bangles', 'Kappu', 'Key Chain', 'Ring', 'Bracelet', 'Tattu', 'All']
  };

  const priceRanges = [
    { label: 'Under ₹25,000', value: '0-25000' },
    { label: '₹25,000 - ₹50,000', value: '25000-50000' },
    { label: '₹50,000 - ₹1,00,000', value: '50000-100000' },
    { label: '₹1,00,000 - ₹2,00,000', value: '100000-200000' },
    { label: 'Above ₹2,00,000', value: '200000-999999' },
  ];

  const caratOptions = [
    { label: '18K', value: '18k' },
    { label: '22K', value: '22k' },
    { label: '24K', value: '24k' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Category Section */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection('category')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
        >
          <h3 className="text-lg font-bold text-[#1a1a1a]">Category</h3>
          {expandedSections.category ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>
        
        {expandedSections.category && (
          <div className="px-6 pb-4">
            {/* Gold Jewels */}
            <div className="mb-4">
              <button
                onClick={() => onCategoryChange('gold')}
                className={`w-full text-left px-3 py-2 rounded transition ${
                  selectedCategory === 'gold' ? 'bg-[#B8941E] text-white' : 'hover:bg-gray-100'
                }`}
              >
                <span className="font-semibold">Gold Jewels</span>
              </button>
              <div className="ml-4 mt-2 space-y-1">
                {categories.gold.map((item) => (
                  <a
                    key={item}
                    href={`/products/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`block w-full text-left px-3 py-1.5 text-sm rounded transition ${
                      selectedCategory === `gold-${item.toLowerCase()}` 
                        ? 'text-[#B8941E] font-medium' 
                        : 'text-gray-700 hover:text-[#B8941E] hover:bg-gray-50'
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Silver Jewels */}
            <div>
              <button
                onClick={() => onCategoryChange('silver')}
                className={`w-full text-left px-3 py-2 rounded transition ${
                  selectedCategory === 'silver' ? 'bg-[#B8941E] text-white' : 'hover:bg-gray-100'
                }`}
              >
                <span className="font-semibold">Silver Jewels</span>
              </button>
              <div className="ml-4 mt-2 space-y-1">
                {categories.silver.map((item) => (
                  <a
                    key={item}
                    href={`/products/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`block w-full text-left px-3 py-1.5 text-sm rounded transition ${
                      selectedCategory === `silver-${item.toLowerCase()}` 
                        ? 'text-[#B8941E] font-medium' 
                        : 'text-gray-700 hover:text-[#B8941E] hover:bg-gray-50'
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Price Range Section */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection('priceRange')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
        >
          <h3 className="text-lg font-bold text-[#1a1a1a]">Price Range</h3>
          {expandedSections.priceRange ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>
        
        {expandedSections.priceRange && (
          <div className="px-6 pb-4 space-y-2">
            {priceRanges.map((range) => (
              <label key={range.value} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#B8941E] border-gray-300 rounded focus:ring-[#B8941E]"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-[#B8941E] transition">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Carat Section */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection('carat')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
        >
          <h3 className="text-lg font-bold text-[#1a1a1a]">Carat</h3>
          {expandedSections.carat ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>
        
        {expandedSections.carat && (
          <div className="px-6 pb-4 space-y-2">
            {caratOptions.map((carat) => (
              <label key={carat.value} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#B8941E] border-gray-300 rounded focus:ring-[#B8941E]"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-[#B8941E] transition">
                  {carat.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
