'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Toast from '@/components/Toast';

interface ProductGridProps {
  viewMode: 'grid' | 'list';
  selectedCategory: string;
  searchQuery: string;
  sortBy: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  priceRange: { min: number; max: number };
  selectedCarat: string;
}

export default function ProductGrid({
  viewMode,
  selectedCategory,
  searchQuery,
  sortBy,
  currentPage,
  onPageChange,
  priceRange,
  selectedCarat,
}: ProductGridProps) {
  const gridTopRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  // Scroll to top when page changes
  useEffect(() => {
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  // Sample products data - expanded with more products for each category
  const allProducts = [
    // TALI products
    { id: 1, name: 'Traditional Tali Design', price: 125000, karat: '22KT Gold', category: 'tali', slug: 'traditional-tali-design', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600' },
    { id: 2, name: 'Modern Tali Pendant', price: 98000, karat: '22KT Gold', category: 'tali', slug: 'modern-tali-pendant', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600' },
    { id: 3, name: 'Antique Tali', price: 145000, karat: '22KT Gold', category: 'tali', slug: 'antique-tali', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600' },
    
    // TALI CHAIN products
    { id: 4, name: 'Gold Tali Chain', price: 125000, karat: '22KT Gold', category: 'tali-chain', slug: 'gold-tali-chain', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600' },
    { id: 5, name: 'Designer Tali Chain', price: 135000, karat: '22KT Gold', category: 'tali-chain', slug: 'designer-tali-chain', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600' },
    
    // Necklace products
    { id: 6, name: 'Lakshmi Bridal Choker', price: 218000, karat: '22KT Gold', category: 'necklace', slug: 'lakshmi-bridal-choker', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600' },
    { id: 7, name: 'Diamond Pendant Set', price: 145000, karat: '18KT Gold', category: 'necklace', slug: 'diamond-pendant-set', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600' },
    { id: 8, name: 'Temple Necklace', price: 185000, karat: '22KT Gold', category: 'necklace', slug: 'temple-necklace', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600' },
    
    // Bangles products
    { id: 9, name: 'Antique Bangle Set', price: 95000, karat: '22KT Gold', category: 'bangles', slug: 'antique-bangle-set', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600' },
    { id: 10, name: 'Designer Bangles', price: 115000, karat: '22KT Gold', category: 'bangles', slug: 'designer-bangles', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600' },
    
    // Stud products
    { id: 11, name: 'Gold Earrings', price: 55000, karat: '22KT Gold', category: 'stud', slug: 'gold-earrings', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600' },
    { id: 12, name: 'Diamond Studs', price: 75000, karat: '18KT Gold', category: 'stud', slug: 'diamond-studs', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600' },
    
    // Gold Jhumkas products
    { id: 13, name: 'Temple Jhumka Pair', price: 86500, karat: '22KT Gold', category: 'gold-jhumkas', slug: 'temple-jhumka-pair', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600' },
    { id: 14, name: 'Antique Jhumkas', price: 92000, karat: '22KT Gold', category: 'gold-jhumkas', slug: 'antique-jhumkas', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600' },
    
    // Gold Ring products
    { id: 15, name: 'Gold Ring Set', price: 45000, karat: '18KT Gold', category: 'gold-ring', slug: 'gold-ring-set', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600' },
    { id: 16, name: 'Designer Gold Ring', price: 52000, karat: '22KT Gold', category: 'gold-ring', slug: 'designer-gold-ring', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600' },
    
    // Silver products
    { id: 17, name: 'Silver Pooja Gift Set', price: 14800, karat: '999 Silver', category: 'all', slug: 'silver-pooja-gift-set', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600' },
    { id: 18, name: 'Silver Anklet', price: 8500, karat: '925 Silver', category: 'anklet', slug: 'silver-anklet', image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600' },
    { id: 19, name: 'Silver Bracelet', price: 12000, karat: '925 Silver', category: 'bracelet', slug: 'silver-bracelet', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=600' },
    { id: 20, name: 'Silver Ring', price: 6500, karat: '925 Silver', category: 'ring', slug: 'silver-ring', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600' },
  ];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' || selectedCategory === 'gold' || selectedCategory === 'silver'
    ? allProducts
    : allProducts.filter(product => product.category === selectedCategory);

  // Apply price filter
  const priceFilteredProducts = filteredProducts.filter(product => {
    return product.price >= priceRange.min && product.price <= priceRange.max;
  });

  // Apply carat filter
  const caratFilteredProducts = selectedCarat === 'all' 
    ? priceFilteredProducts 
    : priceFilteredProducts.filter(product => {
        if (selectedCarat === '18k') return product.karat.includes('18KT') || product.karat.includes('18K');
        if (selectedCarat === '22k') return product.karat.includes('22KT') || product.karat.includes('22K');
        if (selectedCarat === '24k') return product.karat.includes('24KT') || product.karat.includes('24K');
        return true;
      });

  const itemsPerPage = 9;
  const totalPages = Math.ceil(caratFilteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = caratFilteredProducts.slice(startIndex, endIndex);

  return (
    <div>
      {/* Scroll anchor */}
      <div ref={gridTopRef} className="absolute -top-24" />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Results Count and Controls in One Line */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* Results Count */}
        <p className="text-gray-600">
          Showing <span className="font-semibold">{startIndex + 1}-{Math.min(endIndex, caratFilteredProducts.length)}</span> of <span className="font-semibold">{caratFilteredProducts.length}</span> Results
        </p>

        {/* Sort and View Controls */}
        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => {}}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#B8941E] cursor-pointer"
          >
            <option value="featured">Sort By: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
          </select>

          {/* View Toggle */}
          <div className="flex gap-2 border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => {}}
              className={`p-2 rounded transition ${
                viewMode === 'grid'
                  ? 'bg-[#B8941E] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Grid View"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => {}}
              className={`p-2 rounded transition ${
                viewMode === 'list'
                  ? 'bg-[#B8941E] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="List View"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'
        : 'flex flex-col gap-6 mb-12'
      }>
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode={viewMode}
            onToast={handleToast}
          />
        ))}
      </div>

      {/* Pagination - Footer Style - Only show if more than 9 products */}
      {caratFilteredProducts.length > 9 && (
        <div className="border-t border-gray-200 pt-8 pb-4">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-[#B8941E] hover:text-white hover:border-[#B8941E] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => onPageChange(index + 1)}
                className={`w-10 h-10 flex items-center justify-center border rounded transition ${
                  currentPage === index + 1
                    ? 'bg-[#B8941E] text-white border-[#B8941E]'
                    : 'border-gray-300 hover:bg-[#B8941E] hover:text-white hover:border-[#B8941E]'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-[#B8941E] hover:text-white hover:border-[#B8941E] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
