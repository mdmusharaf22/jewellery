'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Hero() {
  const pathname = usePathname();
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    // Reinitialize Swiper when pathname changes
    if (swiperRef.current) {
      swiperRef.current.update();
      swiperRef.current.autoplay?.start();
    }
  }, [pathname]);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1920',
      tag: 'Trusted family jeweller for weddings and gifting',
      title: 'Timeless jewellery\nfor every Indian\ncelebration',
      description: 'Explore handcrafted gold and silver collections from sriganeshjewellers.',
    },
    {
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920',
      tag: 'Exquisite Gold Collections',
      title: 'Crafted with\nprecision and\npassion',
      description: 'Discover our exclusive range of gold necklaces and ornaments.',
    },
    {
      image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1920',
      tag: 'Premium Silver Jewellery',
      title: 'Elegance in\nevery piece',
      description: 'Browse our stunning silver collection for every occasion.',
    },
  ];

  return (
    <section className="relative bg-[#2a2420]">
      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white/50',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#B8941E]',
        }}
        loop={true}
        className="hero-swiper cursor-grab"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
              <div className="absolute inset-0">
                <div className="relative w-full h-full">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${slide.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                </div>
              </div>

              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 lg:px-8">
                  <div className="max-w-xl lg:max-w-2xl">
                    <div className="inline-block bg-white rounded-full px-5 py-2 mb-6 md:mb-8">
                      <p className="text-[#1a1a1a] text-xs md:text-sm font-medium">
                        {slide.tag}
                      </p>
                    </div>

                    <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-[1.2] max-w-lg whitespace-pre-line">
                      {slide.title}
                    </h1>

                    <p className="text-white/90 text-sm md:text-base mb-6 md:mb-8 max-w-md leading-relaxed">
                      {slide.description}
                    </p>

                    <a href="/collection" className="inline-block bg-[#B8941E] text-white px-6 py-2.5 md:px-8 md:py-3 rounded hover:bg-black transition font-medium text-sm shadow-lg">
                      Shop Collection
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .hero-swiper .swiper-pagination {
          bottom: 20px;
        }
      `}</style>
    </section>
  );
}
