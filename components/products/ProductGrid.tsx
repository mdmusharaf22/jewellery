'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Toast from '@/components/Toast';
import { api } from '@/lib/api';

interface ProductGridProps {
  viewMode: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  selectedCategory: string;
  searchQuery: string;
  sortBy: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  priceRange: { min: number; max: number };
  selectedCarat: string;
  selectedMetalTypes?: string[];
  isCustomizable?: boolean;
  isFeatured?: boolean;
}

interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  cached_price: number | null;
  dynamic_price: number;
  metal_type: string;
  images: { url: string; is_primary: boolean }[];
  category?: { name: string; slug: string };
  is_customizable?: number;
  is_featured?: number;
}

export default function ProductGrid({
  viewMode,
  onViewModeChange,
  selectedCategory,
  searchQuery,
  sortBy,
  currentPage,
  onPageChange,
  priceRange,
  selectedCarat,
  selectedMetalTypes = [],
  isCustomizable = false,
  isFeatured = false,
}: ProductGridProps) {
  const gridTopRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let endpoint = '/products';
        const params = [];
        
        // Metal type filter takes priority
        if (selectedMetalTypes && selectedMetalTypes.length > 0) {
          // If both gold and silver are selected, don't filter by metal type (show all)
          if (selectedMetalTypes.length === 1) {
            params.push(`metal_type=${selectedMetalTypes[0]}`);
          }
        }
        // If specific category is selected and not a metal type
        else if (selectedCategory && selectedCategory !== 'all') {
          // Check if it's a metal type filter (gold or silver)
          if (selectedCategory === 'gold' || selectedCategory === 'silver') {
            params.push(`metal_type=${selectedCategory}`);
          } else {
            params.push(`category=${selectedCategory}`);
          }
        }

        if (params.length > 0) {
          endpoint += '?' + params.join('&');
        }

        const response = await api.get(endpoint, { requiresAuth: false });

        if (response && response.success && response.data) {
          // Transform API products to match ProductCard interface
          const transformedProducts = response.data.map((product: ApiProduct) => {
            const primaryImage = product.images?.find(img => img.is_primary)?.url || product.images?.[0]?.url || '';
            const karat = product.metal_type === 'gold' ? '22KT Gold' : '925 Silver';
            
            return {
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: product.cached_price || product.dynamic_price || 0,
              karat,
              category: product.category?.slug || selectedCategory,
              image: primaryImage,
              is_customizable: product.is_customizable || 0,
              is_featured: product.is_featured || 0,
            };
          });

          setProducts(transformedProducts);
        } else {
          setProducts([]);
        }
      } catch (error) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedMetalTypes]);

  // Scroll to top when page changes
  useEffect(() => {
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  // Filter products based on price range
  const priceFilteredProducts = products.filter(product => {
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

  // Apply customizable filter
  const customizableFilteredProducts = isCustomizable
    ? caratFilteredProducts.filter(product => product.is_customizable === 1)
    : caratFilteredProducts;

  // Apply featured filter
  const featuredFilteredProducts = isFeatured
    ? customizableFilteredProducts.filter(product => product.is_featured === 1)
    : customizableFilteredProducts;

  const finalFilteredProducts = featuredFilteredProducts;

  const itemsPerPage = 9;
  const totalPages = Math.ceil(finalFilteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = finalFilteredProducts.slice(startIndex, endIndex);

  // Show loading skeleton
  if (loading) {
    const ProductGridSkeleton = require('@/components/skeletons/ProductGridSkeleton').default;
    return <ProductGridSkeleton />;
  }

  // Show no results message
  if (!loading && currentProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600 mb-6">Try adjusting your filters or browse all products</p>
        <a href="/products/all" className="inline-block bg-[#B8941E] text-white px-6 py-2 rounded-lg hover:bg-[#A07D1A] transition">
          View All Products
        </a>
      </div>
    );
  }

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* Results Count */}
        <p className="text-gray-600 text-xs sm:text-sm">
          Showing <span className="font-semibold">{startIndex + 1}-{Math.min(endIndex, finalFilteredProducts.length)}</span> of <span className="font-semibold">{finalFilteredProducts.length}</span> Results
        </p>

        {/* Sort and View Controls */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => {}}
            className="flex-1 sm:flex-none px-2 xs:px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B8941E] cursor-pointer"
          >
            <option value="featured">Sort By: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
          </select>

          {/* View Toggle */}
          <div className="flex gap-1 sm:gap-2 border border-gray-300 rounded-lg p-0.5 sm:p-1">
            <button
              onClick={() => onViewModeChange?.('grid')}
              className={`p-1.5 sm:p-2 rounded transition cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#B8941E] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Grid View"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => onViewModeChange?.('list')}
              className={`p-1.5 sm:p-2 rounded transition cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[#B8941E] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="List View"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 mb-8 sm:mb-12'
        : 'flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-12'
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
      {finalFilteredProducts.length > 9 && (
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
