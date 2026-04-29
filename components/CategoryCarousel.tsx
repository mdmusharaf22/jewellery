'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  metal_type: string;
}

interface CategoryCarouselProps {
  title: string;
  subtitle: string;
  autoplayDelay?: number;
  metalType?: string; // Filter categories by metal_type (gold/silver)
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CategoryCarousel({
  title,
  subtitle,
  autoplayDelay = 4000,
  metalType,
}: CategoryCarouselProps) {
  const [isClient, setIsClient] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/categories`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Filter only parent categories (parent_id === null)
            let parentCategories = data.data.filter((cat: any) => cat.parent_id === null);
            
            // If metalType is provided, filter by metal_type
            if (metalType) {
              parentCategories = parentCategories.filter((cat: any) => 
                cat.metal_type && cat.metal_type.toLowerCase() === metalType.toLowerCase()
              );
            }
            
            setCategories(parentCategories);
          }
        }
      } catch (error) {

      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [metalType]);

  // Show blank placeholder if no image
  const getImageUrl = (category: Category) => {
    return category.image_url || null;
  };

  if (!isClient || loading) {
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

  if (categories.length === 0) {
    return null; // Don't show section if no categories
  }

  return (
    <section className="bg-white overflow-hidden">
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
          slidesPerView={2}
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
          }}
          loop={categories.length > 5}
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
          {categories.map((category) => {
            const imageUrl = getImageUrl(category);
            return (
              <SwiperSlide key={category.id}>
                <Link href={`/products/${category.slug}`} className="cursor-pointer group block">
                  <div className="relative aspect-[3/4] overflow-hidden mb-4 rounded-t-[170px] transition-shadow duration-300 group-hover:shadow-sm bg-gray-100">
                    {imageUrl ? (
                      <>
                        <Image
                          src={imageUrl}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                          loading="eager"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="text-center font-semibold text-[#1a1a1a] text-sm md:text-base group-hover:text-[#B8941E] transition-colors duration-300">
                    {category.name}
                  </h3>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
