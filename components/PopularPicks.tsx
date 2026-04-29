'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface FeaturedProduct {
  id: string;
  name: string;
  slug?: string;
  short_description?: string;
  base_weight?: number;
  is_customizable?: boolean;
  is_featured?: boolean;
  cached_price?: number;
  metal_type?: string;
  images?: Array<{ url: string; alt?: string }>;
}

export default function PopularPicks() {
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    // Fetch featured products when component mounts
    const loadFeaturedProducts = async () => {
      setLoading(true);
      setError(null);
      console.log('PopularPicks: Starting to fetch featured products...');
      
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        console.log('PopularPicks: API_BASE_URL:', API_BASE_URL);
        
        if (!API_BASE_URL) {
          console.error('PopularPicks: API_BASE_URL is not configured');
          throw new Error('API_BASE_URL is not configured');
        }

        const url = `${API_BASE_URL}/products/featured`;
        console.log('PopularPicks: Fetching from URL:', url);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors', // Explicitly set CORS mode
        });

        console.log('PopularPicks: Response status:', response.status);
        console.log('PopularPicks: Response ok:', response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('PopularPicks: Error response:', errorText);
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const data = await response.json();
        console.log('PopularPicks: API Response:', data);

        if (data.success && data.data) {
          const featuredProducts = data.data;
          console.log('PopularPicks: Featured products count:', featuredProducts.length);
          console.log('PopularPicks: First product:', featuredProducts[0]);
          setProducts(featuredProducts);
        } else {
          console.warn('PopularPicks: API response indicates failure or no data');
          setProducts([]);
        }
      } catch (error) {
        console.error('PopularPicks: Failed to load featured products:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
        // Fallback to empty array if API fails
        setProducts([]);
      } finally {
        setLoading(false);
        console.log('PopularPicks: Loading finished');
      }
    };

    loadFeaturedProducts();
  }, [isClient]);

  // Use API products - no fallback
  const displayProducts = products;

  // Helper function to format price
  const formatPrice = (price?: number) => {
    if (!price) return '0';
    return new Intl.NumberFormat('en-IN').format(price);
  };

  // Helper function to get product image
  const getProductImage = (product: FeaturedProduct) => {
    return product.images?.[0]?.url || '';
  };

  if (!isClient || loading) {
    return (
      <section className="bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-[#1a1a1a]">
            Popular Picks
          </h2>
          <p className="text-center text-gray-600 mb-8 md:mb-10 text-sm md:text-base">
            Most-loved pieces from our gold and silver collections
          </p>
        </div>
        <div className="px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                <div className="h-5 bg-gray-200 rounded animate-pulse w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Don't render section if no products
  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-[#1a1a1a]">
          Popular Picks
        </h2>
        <p className="text-center text-gray-600 mb-8 md:mb-10 text-sm md:text-base">
          Most-loved pieces from our gold and silver collections
        </p>
      </div>

      <div className="px-4 lg:px-8">
        <Swiper
          key={Date.now()}
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 32,
            },
          }}
          className="popular-swiper cursor-grab"
        >
          {displayProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="cursor-pointer group">
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 transition-shadow duration-300 group-hover:shadow-sm">
                  {getProductImage(product) ? (
                    <Image
                      src={getProductImage(product)}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="eager"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  
                  <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-[#B8941E] hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <div>
                  <p className="text-xs text-[#B8941E] mb-1 font-medium">{product.metal_type || 'Gold'}</p>
                  <h3 className="font-semibold text-base mb-2 text-[#1a1a1a] group-hover:text-[#B8941E] transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-[#1a1a1a]">₹ {formatPrice(product.cached_price)}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
