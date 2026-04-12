'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface CarouselItem {
  id: number;
  name: string;
  image: string;
  price?: string;
  karat?: string;
}

interface ProductCarouselProps {
  title: string;
  subtitle: string;
  items: CarouselItem[];
  type: 'category' | 'product';
  autoplayDelay?: number;
}

export default function ProductCarousel({
  title,
  subtitle,
  items,
  type,
  autoplayDelay = 4000,
}: ProductCarouselProps) {
  const [isClient, setIsClient] = useState(false);

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
          <div className={`grid ${type === 'category' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'} gap-6`}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-4">
                <div className={`${type === 'category' ? 'aspect-[3/4] rounded-t-[170px]' : 'aspect-square rounded-lg'} bg-gray-200 animate-pulse`} />
                <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-24" />
                {type === 'product' && (
                  <>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-24" />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Category Card Component
  const CategoryCard = ({ item }: { item: CarouselItem }) => (
    <div className="cursor-pointer group">
      <div className={`relative aspect-[3/4] overflow-hidden mb-4 rounded-t-[170px] transition-shadow duration-300 group-hover:shadow-sm`}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          loading="eager"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
      </div>
      <h3 className="text-center font-semibold text-[#1a1a1a] text-sm md:text-base group-hover:text-[#B8941E] transition-colors duration-300">
        {item.name}
      </h3>
    </div>
  );

  // Product Card Component
  const ProductCard = ({ item }: { item: CarouselItem }) => (
    <div className="cursor-pointer group">
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 transition-shadow duration-300 group-hover:shadow-sm">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="eager"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
        
        <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-[#B8941E] hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div>
        {item.karat && (
          <p className="text-xs text-[#B8941E] mb-1 font-medium">{item.karat}</p>
        )}
        <h3 className="font-semibold text-base mb-2 text-[#1a1a1a] group-hover:text-[#B8941E] transition-colors duration-300">
          {item.name}
        </h3>
        {item.price && (
          <p className="text-lg font-bold text-[#1a1a1a]">₹ {item.price}</p>
        )}
      </div>
    </div>
  );

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
        <Swiper
          key={Date.now()}
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={type === 'category' ? 2 : 1}
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={
            type === 'category'
              ? {
                  640: { slidesPerView: 3, spaceBetween: 24 },
                  1024: { slidesPerView: 5, spaceBetween: 32 },
                }
              : {
                  640: { slidesPerView: 2, spaceBetween: 24 },
                  1024: { slidesPerView: 4, spaceBetween: 32 },
                }
          }
          className="product-carousel cursor-grab"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              {type === 'category' ? (
                <CategoryCard item={item} />
              ) : (
                <ProductCard item={item} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
