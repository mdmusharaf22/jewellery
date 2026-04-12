'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface Category {
  id: number;
  name: string;
  image: string;
}

interface CategoryCarouselProps {
  title: string;
  subtitle: string;
  categories: Category[];
  autoplayDelay?: number;
}

export default function CategoryCarousel({
  title,
  subtitle,
  categories,
  autoplayDelay = 4000,
}: CategoryCarouselProps) {
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[3/4] bg-gray-200 rounded-t-[170px] animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          slidesPerView={2}
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 32,
            },
          }}
          className="category-swiper cursor-grab"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="cursor-pointer group">
                <div className="relative aspect-[3/4] overflow-hidden mb-4 rounded-t-[170px] transition-shadow duration-300 group-hover:shadow-sm">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    loading="eager"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </div>
                <h3 className="text-center font-semibold text-[#1a1a1a] text-sm md:text-base group-hover:text-[#B8941E] transition-colors duration-300">
                  {category.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
