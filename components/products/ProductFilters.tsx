'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  selectedCarat: string;
  onCaratChange: (carat: string) => void;
  isCustomizable?: boolean;
  onCustomizableChange?: (value: boolean) => void;
  isFeatured?: boolean;
  onFeaturedChange?: (value: boolean) => void;
}

export default function ProductFilters({ 
  selectedCategory, 
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  selectedCarat,
  onCaratChange,
  isCustomizable = false,
  onCustomizableChange,
  isFeatured = false,
  onFeaturedChange
}: ProductFiltersProps) {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState({
    priceRange: true,
    carat: true,
    filters: true,
  });

  const [tempPriceRange, setTempPriceRange] = useState(priceRange);

  // Debounce price filter (2-3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      onPriceRangeChange(tempPriceRange);
    }, 2500);

    return () => clearTimeout(timer);
  }, [tempPriceRange, onPriceRangeChange]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const caratOptions = [
    { label: 'All', value: 'all' },
    { label: '18K', value: '18k' },
    { label: '22K', value: '22k' },
    { label: '24K', value: '24k' },
  ];

  const formatPrice = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(0)}K`;
    }
    return `₹${value}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Price Range Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection('priceRange')}
            className="w-full px-3 xs:px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a]">Price</h3>
            {expandedSections.priceRange ? (
              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            )}
          </button>
          
          {expandedSections.priceRange && (
            <div className="px-3 xs:px-4 sm:px-6 pb-4 sm:pb-6">
              {/* Range Slider Container */}
              <div className="mb-4 sm:mb-6">
                <div className="relative h-2">
                  {/* Background track */}
                  <div className="absolute w-full h-2 bg-gray-200 rounded-full" />
                  
                  {/* Active range */}
                  <div
                    className="absolute h-2 bg-[#B8941E] rounded-full"
                    style={{
                      left: `${(tempPriceRange.min / 50000000) * 100}%`,
                      right: `${100 - (tempPriceRange.max / 50000000) * 100}%`,
                    }}
                  />
                  
                  {/* Min slider */}
                  <input
                    type="range"
                    min="0"
                    max="50000000"
                    step="50000"
                    value={tempPriceRange.min}
                    onChange={(e) => setTempPriceRange(prev => ({ 
                      ...prev, 
                      min: Math.min(Number(e.target.value), prev.max - 50000) 
                    }))}
                    className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 sm:[&::-webkit-slider-thumb]:w-5 sm:[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B8941E] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-3 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 sm:[&::-moz-range-thumb]:w-5 sm:[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#B8941E] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-3 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
                    style={{ zIndex: tempPriceRange.min > 50000000 - 10000000 ? 5 : 3 }}
                  />
                  
                  {/* Max slider */}
                  <input
                    type="range"
                    min="0"
                    max="50000000"
                    step="50000"
                    value={tempPriceRange.max}
                    onChange={(e) => setTempPriceRange(prev => ({ 
                      ...prev, 
                      max: Math.max(Number(e.target.value), prev.min + 50000) 
                    }))}
                    className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 sm:[&::-webkit-slider-thumb]:w-5 sm:[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B8941E] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-3 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 sm:[&::-moz-range-thumb]:w-5 sm:[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#B8941E] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-3 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
                    style={{ zIndex: 4 }}
                  />
                </div>
              </div>

              {/* Price Display */}
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-700">
                  Price: <span className="text-[#B8941E] font-semibold">{formatPrice(tempPriceRange.min)} — {formatPrice(tempPriceRange.max)}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Carat Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection('carat')}
            className="w-full px-3 xs:px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a]">Carat</h3>
            {expandedSections.carat ? (
              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            )}
          </button>
          
          {expandedSections.carat && (
            <div className="px-3 xs:px-4 sm:px-6 pb-3 sm:pb-4 space-y-1.5 sm:space-y-2">
              {caratOptions.map((carat) => (
                <label key={carat.value} className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="carat"
                    value={carat.value}
                    checked={selectedCarat === carat.value}
                    onChange={() => onCaratChange(carat.value)}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B8941E] border-gray-300 focus:ring-[#B8941E]"
                  />
                  <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700 group-hover:text-[#B8941E] transition">
                    {carat.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Filters Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection('filters')}
            className="w-full px-3 xs:px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a]">Filters</h3>
            {expandedSections.filters ? (
              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            )}
          </button>
          
          {expandedSections.filters && (
            <div className="px-3 xs:px-4 sm:px-6 pb-3 sm:pb-4 space-y-2 sm:space-y-3">
              {/* Customizable Checkbox */}
              {onCustomizableChange && (
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isCustomizable}
                    onChange={(e) => onCustomizableChange(e.target.checked)}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B8941E] border-gray-300 rounded focus:ring-[#B8941E]"
                  />
                  <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700 group-hover:text-[#B8941E] transition">
                    Customizable
                  </span>
                </label>
              )}
              
              {/* Featured Checkbox */}
              {onFeaturedChange && (
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => onFeaturedChange(e.target.checked)}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B8941E] border-gray-300 rounded focus:ring-[#B8941E]"
                  />
                  <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700 group-hover:text-[#B8941E] transition">
                    Featured
                  </span>
                </label>
              )}
            </div>
          )}
        </div>
      </div>
  );
}
