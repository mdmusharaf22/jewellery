'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function CategorySection() {
  const categories = [
    { 
      name: 'Gold Necklaces', 
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=700&fit=crop&q=80'
    },
    { 
      name: 'Earrings', 
      image: 'https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?w=500&h=700&fit=crop&q=80'
    },
    { 
      name: 'Bangles', 
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&h=700&fit=crop&q=80'
    },
    { 
      name: 'Silver', 
      image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500&h=700&fit=crop&q=80'
    },
    { 
      name: 'Savings Plan', 
      image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=500&h=700&fit=crop&q=80'
    },
    { 
      name: 'Rings', 
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=700&fit=crop&q=80'
    },
  ];

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-[#1a1a1a]">
          Shop by Category
        </h2>
        <p className="text-center text-gray-600 mb-12 md:mb-16 text-sm md:text-base">
          Traditional favourites and everyday essentials curated for Indian families
        </p>
      </div>

      {/* Swiper Carousel */}
      <div className="px-4 lg:px-8">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={2}
          autoplay={{
            delay: 4000,
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
          className="category-swiper"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <div className="cursor-pointer group">
                {/* Subtle rounded top corners with hover effect */}
                <div className="relative aspect-[3/4] overflow-hidden mb-4 rounded-t-[170px] transition-shadow duration-300 group-hover:shadow-sm">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
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
