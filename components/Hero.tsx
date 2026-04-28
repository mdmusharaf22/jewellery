'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';


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
    <section className="relative bg-[#2a2420] overflow-hidden">
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
            <div className="relative h-[80dvh]">
              <div className="absolute inset-0">
                <div className="relative w-full h-full">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${slide.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent sm:from-black/80 sm:via-black/50 md:from-black/70 md:via-black/40" />
                </div>
              </div>

              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 max-w-[100vw]">
                  <div className="max-w-xl lg:max-w-2xl">
                    <div className="inline-block bg-white rounded-full px-3 py-1 xs:px-4 xs:py-1.5 sm:px-5 sm:py-2 mb-3 xs:mb-4">
                      <p className="text-[#1a1a1a] text-xs font-medium">
                        {slide.tag}
                      </p>
                    </div>

                    <h1 className="text-white text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-[1.2] max-w-lg whitespace-pre-line">
                      {slide.title}
                    </h1>

                    <p className="text-white/90 text-[11px] xs:text-xs sm:text-sm md:text-base mb-3 max-w-md leading-relaxed">
                      {slide.description}
                    </p>

                    <a href="/collection" className="inline-block bg-[#B8941E] text-white px-4 py-1.5 xs:px-5 xs:py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded hover:bg-black transition font-medium text-[11px] xs:text-xs sm:text-sm shadow-lg">
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
