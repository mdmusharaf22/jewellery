'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import ProductCard from './ProductCard';
import Toast from './Toast';
import 'swiper/css';

interface CarouselItem {
  id: number | string;
  name: string;
  image: string;
  price?: string;
  karat?: string;
  slug?: string;
  category?: string;
}

interface ProductCarouselProps {
  title: string;
  subtitle: string;
  items: CarouselItem[];
  autoplayDelay?: number;
  fetchFromApi?: 'featured' | null; // New prop to fetch from API
}

// API Product interface
interface ApiProduct {
  id: string;
  name: string;
  cached_price?: number;
  metal_type?: string;
  images?: Array<{ url: string; alt?: string }>;
  slug?: string;
  is_featured?: boolean;
}

export default function ProductCarousel({
  title,
  subtitle,
  items,
  autoplayDelay = 4000,
  fetchFromApi = null,
}: ProductCarouselProps) {
  const [isClient, setIsClient] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [apiItems, setApiItems] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Enhanced API request with authentication and refresh token handling
  const makeAuthenticatedRequest = async (url: string): Promise<Response> => {
    const { getAccessToken, refreshAccessToken, logout } = await import('../lib/auth');
    
    // First attempt with current token
    let token = getAccessToken();
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    // If unauthorized, try to refresh token
    if (response.status === 401 || response.status === 403) {
      console.log('ProductCarousel: Token expired or unauthorized, attempting refresh...');
      
      const refreshed = await refreshAccessToken();
      
      if (refreshed) {
        // Retry with new token
        token = getAccessToken();
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        
        if (response.ok) {
          console.log('ProductCarousel: Request successful after token refresh');
          return response;
        }
      }
      
      // If refresh failed or still unauthorized, redirect to login
      if (response.status === 401 || response.status === 403) {
        console.log('ProductCarousel: Authentication failed, redirecting to login...');
        logout();
        
        // Determine redirect URL based on current path
        if (typeof window !== 'undefined') {
          const currentPath = window.location.pathname;
          if (currentPath.startsWith('/admin')) {
            window.location.href = '/admin/login';
          } else {
            window.location.href = '/login';
          }
        }
        
        throw new Error('Authentication required');
      }
    }

    return response;
  };

  // Fetch API data if fetchFromApi is specified
  useEffect(() => {
    if (fetchFromApi === 'featured') {
      const fetchFeaturedProducts = async () => {
        setLoading(true);
        try {
          const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
          if (!API_BASE_URL) {
            console.error('ProductCarousel: API_BASE_URL is not configured');
            setLoading(false);
            return;
          }

          console.log('ProductCarousel: Fetching featured products from API...');
          
          let response: Response;
          let usedPublicEndpoint = false;

          try {
            // Try authenticated featured endpoint first
            response = await makeAuthenticatedRequest(`${API_BASE_URL}/products/featured`);
          } catch (authError) {
            console.log('ProductCarousel: Authentication failed, trying public products endpoint...');
            
            // Fall back to public products endpoint
            response = await fetch(`${API_BASE_URL}/products`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            usedPublicEndpoint = true;
          }

          console.log('ProductCarousel: Response status:', response.status);

          if (!response.ok) {
            const errorText = await response.text();
            console.error('ProductCarousel: API Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
          }

          const data = await response.json();
          console.log('ProductCarousel: API Response:', data);
          
          if (data.success && data.data && data.data.length > 0) {
            // Filter for featured products if we're using the general products endpoint
            let productsToShow = data.data;
            if (usedPublicEndpoint) {
              productsToShow = data.data.filter((product: ApiProduct) => product.is_featured === true);
              console.log('ProductCarousel: Filtered to', productsToShow.length, 'featured products from', data.data.length, 'total products');
            }

            if (productsToShow.length > 0) {
              // Transform API data to match CarouselItem interface
              const transformedItems: CarouselItem[] = productsToShow.map((product: ApiProduct) => ({
                id: product.id,
                name: product.name,
                price: product.cached_price ? new Intl.NumberFormat('en-IN').format(product.cached_price) : '0',
                karat: product.metal_type || 'Gold',
                image: product.images?.[0]?.url || '',
                slug: product.slug,
                category: 'featured',
              }));
              
              console.log('ProductCarousel: Successfully loaded', transformedItems.length, 'featured products');
              setApiItems(transformedItems);
            } else {
              console.warn('ProductCarousel: No featured products found, using fallback data');
            }
          } else {
            console.warn('ProductCarousel: API returned no products, using fallback data');
          }
        } catch (error) {
          console.error('ProductCarousel: Failed to fetch featured products:', error);
          console.log('ProductCarousel: Using fallback data due to API error');
          // Keep apiItems empty to fall back to provided items
        } finally {
          setLoading(false);
        }
      };

      fetchFeaturedProducts();
    }
  }, [fetchFromApi]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use API items if available, otherwise use provided items
  const displayItems = fetchFromApi === 'featured' && apiItems.length > 0 ? apiItems : items;

  // Don't show static items if we're fetching from API and have no results
  if (fetchFromApi === 'featured' && !loading && apiItems.length === 0) {
    return null; // Hide the section if no featured products
  }

  if (!isClient || (fetchFromApi === 'featured' && loading)) {
    const ProductCarouselSkeleton = require('./skeletons/ProductCarouselSkeleton').default;
    return <ProductCarouselSkeleton title={title} subtitle={subtitle} />;
  }

  const handleToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  return (
    <section className="bg-white overflow-hidden">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="container mx-auto px-2 xs:px-3 sm:px-4 lg:px-8 max-w-[100vw]">
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 xs:mb-3 text-[#1a1a1a]">
          {title}
        </h2>
        <p className="text-center text-gray-600 mb-6 xs:mb-8 md:mb-10 text-[11px] xs:text-xs sm:text-sm md:text-base px-2">
          {subtitle}
        </p>
      </div>

      <div className="px-2 xs:px-3 sm:px-4 lg:px-8 max-w-[100vw] overflow-hidden">
        <Swiper
          key={Date.now()}
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 32 },
          }}
          className="product-carousel cursor-grab"
        >
          {displayItems.map((item) => (
            <SwiperSlide key={item.id}>
              <ProductCard 
                product={{
                  id: item.id,
                  name: item.name,
                  price: item.price || '0',
                  karat: item.karat || '',
                  image: item.image,
                  slug: item.slug,
                  category: item.category,
                }}
                viewMode="grid"
                onToast={handleToast}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
