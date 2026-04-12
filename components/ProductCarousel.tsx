'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import ProductCard from './ProductCard';
import Toast from './Toast';
import 'swiper/css';

interface CarouselItem {
  id: number;
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
}

export default function ProductCarousel({
  title,
  subtitle,
  items,
  autoplayDelay = 4000,
}: ProductCarouselProps) {
  const [isClient, setIsClient] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className="bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-[#1a1a1a]">
            {title}
          </h2>
          <p className="text-center text-gray-600 mb-8 md:mb-10 text-sm md:text-base">
            {subtitle}
          </p>
        </div>
        <div className="px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-square rounded-lg bg-gray-200 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
                <div className="h-5 bg-gray-200 rounded animate-pulse w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const handleToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  return (
    <section className="bg-white">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-[#1a1a1a]">
          {title}
        </h2>
        <p className="text-center text-gray-600 mb-8 md:mb-10 text-sm md:text-base">
          {subtitle}
        </p>
      </div>

      <div className="px-4 lg:px-8">
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
          {items.map((item) => (
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
