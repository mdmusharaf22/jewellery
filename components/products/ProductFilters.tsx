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
}

export default function ProductFilters({ 
  selectedCategory, 
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  selectedCarat,
  onCaratChange
}: ProductFiltersProps) {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    priceRange: true,
    carat: true,
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

  const goldCategories = [
    { label: 'All Gold', value: 'gold' },
    { label: 'TALI', value: 'tali' },
    { label: 'TALI CHAIN', value: 'tali-chain' },
    { label: 'Necklace', value: 'necklace' },
    { label: 'Kalipot', value: 'kalipot' },
    { label: 'Dollar chain', value: 'dollar-chain' },
    { label: 'Stud', value: 'stud' },
    { label: 'Bangles', value: 'bangles' },
    { label: 'Gold Kaapu', value: 'gold-kaapu' },
    { label: 'Bracelet', value: 'bracelet' },
    { label: 'Gold Jhumkas', value: 'gold-jhumkas' },
    { label: 'Gold Dollar', value: 'gold-dollar' },
    { label: 'Gold Ring', value: 'gold-ring' },
    { label: 'Haram', value: 'haram' },
  ];

  const silverCategories = [
    { label: 'All Silver', value: 'silver' },
    { label: 'Anklet', value: 'anklet' },
    { label: 'Kappu', value: 'kappu' },
    { label: 'Key Chain', value: 'key-chain' },
    { label: 'Ring', value: 'ring' },
    { label: 'Tattu', value: 'tattu' },
  ];

  const caratOptions = [
    { label: 'All', value: 'all' },
    { label: '18K', value: '18k' },
    { label: '22K', value: '22k' },
    { label: '24K', value: '24k' },
  ];

  const handleCategoryChange = (category: string) => {
    router.push(`/${category}`);
  };

  const formatPrice = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(0)}K`;
    }
    return `₹${value}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Categories Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection('categories')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <h3 className="text-lg font-bold text-[#1a1a1a]">Categories</h3>
            {expandedSections.categories ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          
          {expandedSections.categories && (
            <div className="px-6 pb-4">
              {/* Gold Section */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Gold Jewels</h4>
                <div className="space-y-2">
                  {goldCategories.map((category) => (
                    <label key={category.value} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={selectedCategory === category.value}
                        onChange={() => handleCategoryChange(category.value)}
                        className="w-4 h-4 text-[#B8941E] border-gray-300 focus:ring-[#B8941E]"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-[#B8941E] transition">
                        {category.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Silver Section */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Silver Jewels</h4>
                <div className="space-y-2">
                  {silverCategories.map((category) => (
                    <label key={category.value} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={selectedCategory === category.value}
                        onChange={() => handleCategoryChange(category.value)}
                        className="w-4 h-4 text-[#B8941E] border-gray-300 focus:ring-[#B8941E]"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-[#B8941E] transition">
                        {category.label}
                      </span>
                    </label>
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
            <h3 className="text-lg font-bold text-[#1a1a1a]">Price</h3>
            {expandedSections.priceRange ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          
          {expandedSections.priceRange && (
            <div className="px-6 pb-6">
              {/* Range Slider Container */}
              <div className="mb-6">
                <div className="relative h-2">
                  {/* Background track */}
                  <div className="absolute w-full h-2 bg-gray-200 rounded-full" />
                  
                  {/* Active range */}
                  <div
                    className="absolute h-2 bg-[#B8941E] rounded-full"
                    style={{
                      left: `${(tempPriceRange.min / 500000) * 100}%`,
                      right: `${100 - (tempPriceRange.max / 500000) * 100}%`,
                    }}
                  />
                  
                  {/* Min slider */}
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="5000"
                    value={tempPriceRange.min}
                    onChange={(e) => setTempPriceRange(prev => ({ 
                      ...prev, 
                      min: Math.min(Number(e.target.value), prev.max - 5000) 
                    }))}
                    className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B8941E] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-3 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#B8941E] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-3 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
                    style={{ zIndex: tempPriceRange.min > 500000 - 100000 ? 5 : 3 }}
                  />
                  
                  {/* Max slider */}
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="5000"
                    value={tempPriceRange.max}
                    onChange={(e) => setTempPriceRange(prev => ({ 
                      ...prev, 
                      max: Math.max(Number(e.target.value), prev.min + 5000) 
                    }))}
                    className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B8941E] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-3 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#B8941E] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-3 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
                    style={{ zIndex: 4 }}
                  />
                </div>
              </div>

              {/* Price Display */}
              <div className="text-center">
                <p className="text-sm text-gray-700">
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
                    type="radio"
                    name="carat"
                    value={carat.value}
                    checked={selectedCarat === carat.value}
                    onChange={() => onCaratChange(carat.value)}
                    className="w-4 h-4 text-[#B8941E] border-gray-300 focus:ring-[#B8941E]"
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
