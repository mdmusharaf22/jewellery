'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import Toast from '@/components/Toast';
import { api } from '@/lib/api';

interface SimilarProductsProps {
  currentProductSlug: string;
  category: string;
}

interface ApiSimilarProduct {
  id: string;
  name: string;
  slug: string;
  cached_price: number | null;
  dynamic_price: number;
  metal_type: string;
  images: {
    url: string;
    is_primary: boolean;
  }[];
}

export default function SimilarProducts({ currentProductSlug }: SimilarProductsProps) {
  const [similarProducts, setSimilarProducts] = useState<ApiSimilarProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${currentProductSlug}/similar`, { requiresAuth: false });
        
        if (response && response.success && response.data) {
          setSimilarProducts(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch similar products:', error);
        setSimilarProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (currentProductSlug) {
      fetchSimilarProducts();
    }
  }, [currentProductSlug]);

  // Transform API product to ProductCard format
  const transformProduct = (product: ApiSimilarProduct) => {
    // Find primary image or use first image
    let imageUrl = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop&q=80';
    
    if (product.images && product.images.length > 0) {
      const primaryImage = product.images.find(img => img.is_primary === true);
      if (primaryImage && primaryImage.url) {
        imageUrl = primaryImage.url;
      } else if (product.images[0] && product.images[0].url) {
        imageUrl = product.images[0].url;
      }
    }
    
    return {
      id: parseInt(product.id) || Math.floor(Math.random() * 10000),
      name: product.name,
      price: product.cached_price || product.dynamic_price || 0,
      karat: product.metal_type === 'gold' ? '22KT Gold' : 'Silver',
      image: imageUrl,
      slug: product.slug,
      category: 'products',
    };
  };

  // Show loading state
  if (loading) {
    return (
      <div className="mb-8 sm:mb-10 md:mb-12 overflow-hidden">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2">Similar Designs</h2>
        <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
          Discover complementary pieces and similar styles to complete your look.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  // Don't show section if no similar products
  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <section className="mb-8 sm:mb-10 md:mb-12 overflow-hidden">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2">Similar Designs</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Discover complementary pieces and similar styles to complete your look.
        </p>
      </div>

      {/* Products Grid - Same as NewArrivals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {similarProducts.map((product) => {
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
    </section>
  );
}
