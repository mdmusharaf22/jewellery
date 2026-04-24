'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Toast from './Toast';
import { api } from '@/lib/api';

interface Product {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  base_weight: number;
  is_featured: number;
  cached_price: number | null;
  images: {
    url: string;
    is_primary: boolean;
  }[];
}

export default function NewArrivals() {
  const [activeTab, setActiveTab] = useState('All');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const tabs = ['All', 'Gold', 'Silver', 'Bridal'];

  const handleToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  // Fetch new arrivals from API
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products/new-arrivals', { requiresAuth: false });
        
        if (response.success && response.data) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
        handleToast('Failed to load new arrivals', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  // Transform API product to ProductCard format
  const transformProduct = (product: Product) => {
    // Find primary image or use first image
    let imageUrl = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop&q=80';
    
    if (product.images && product.images.length > 0) {
      // Find primary image first
      const primaryImage = product.images.find(img => img.is_primary === true);
      if (primaryImage && primaryImage.url) {
        imageUrl = primaryImage.url;
      } else if (product.images[0] && product.images[0].url) {
        // Fallback to first image
        imageUrl = product.images[0].url;
      }
    }
    
    return {
      id: product.id,
      name: product.name,
      price: product.cached_price ? product.cached_price.toLocaleString('en-IN') : '0',
      karat: '22KT Gold', // Default, can be enhanced based on product data
      image: imageUrl,
      slug: product.slug,
      category: 'products', // Use 'products' as the category for the URL
    };
  };

  const filteredProducts = activeTab === 'All' 
    ? products 
    : products.filter(p => {
        // Filter logic can be enhanced based on actual product categories
        return true; // For now, show all products for any tab
      });

  return (
    <section className="bg-white overflow-hidden">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Full width header */}
      <div className="px-2 xs:px-3 sm:px-4 lg:px-8 max-w-[100vw]">
        {/* Header with Tabs on Right */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 gap-3 xs:gap-4 sm:gap-6">
          <div>
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-1.5 xs:mb-2 sm:mb-3 text-[#1a1a1a]">
              New Arrivals
            </h2>
            <p className="text-gray-600 text-[11px] xs:text-xs sm:text-sm md:text-base">
              Fresh additions in gold and silver, selected for festive shopping and gifting
            </p>
          </div>

          {/* Tabs on Right */}
          <div className="flex gap-1.5 xs:gap-2 sm:gap-3 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 xs:px-3 sm:px-4 md:px-5 py-1 xs:py-1.5 sm:py-2 rounded-full font-medium text-[10px] xs:text-xs sm:text-sm transition cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#B8941E] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full width grid */}
      <div className="px-2 xs:px-3 sm:px-4 lg:px-8 max-w-[100vw]">
        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm xs:text-base">No new arrivals available at the moment.</p>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => {
              const transformedProduct = transformProduct(product);
              return (
                <ProductCard
                  key={product.id}
                  product={transformedProduct}
                  viewMode="grid"
                  onToast={handleToast}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

