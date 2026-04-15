'use client';

import { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import Image from 'next/image';
import { getAllProducts } from '@/lib/productData';

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const allProducts = getAllProducts();

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.karat.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 6)); // Show max 6 results
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute top-0 left-0 right-0 bg-white shadow-xl">
        <div className="w-[90%] mx-auto py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Search Products</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for jewelry, gold, silver..."
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-[#B8941E] focus:outline-none text-lg"
              autoFocus
            />
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="max-h-[60vh] overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((product) => (
                    <a
                      key={product.id}
                      href={`/${product.category}/${product.slug}?name=${encodeURIComponent(product.name)}&price=${product.price}&karat=${encodeURIComponent(product.karat)}`}
                      onClick={onClose}
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#B8941E] hover:shadow-md transition group"
                    >
                      <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#B8941E] font-medium mb-1">{product.karat}</p>
                        <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2 group-hover:text-[#B8941E] transition">
                          {product.name}
                        </h3>
                        <p className="text-sm font-bold text-gray-900">
                          ₹ {product.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No products found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}

          {/* Popular Searches */}
          {!searchQuery && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {['Gold Necklace', 'Diamond Earrings', 'Silver Bangles', 'Bridal Jewelry', 'Temple Jewelry'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-4 py-2 bg-gray-100 hover:bg-[#B8941E] hover:text-white rounded-full text-sm transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
