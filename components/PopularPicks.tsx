'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function PopularPicks() {
  const products = [
    { 
      id: 1, 
      name: 'Lakshmi Bridal Choker', 
      price: '2,18,000', 
      karat: '22KT Gold',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop&q=80'
    },
    { 
      id: 2, 
      name: 'Temple Jhumka Pair', 
      price: '86,500', 
      karat: '22KT Gold',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop&q=80'
    },
    { 
      id: 3, 
      name: 'Silver Pooja Gift Set', 
      price: '14,800', 
      karat: '999 Silver',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=600&fit=crop&q=80'
    },
    { 
      id: 4, 
      name: 'Festival Gold Coin', 
      price: '39,950', 
      karat: '24KT Gold',
      image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&h=600&fit=crop&q=80'
    },
    { 
      id: 5, 
      name: 'Diamond Pendant Set', 
      price: '1,45,000', 
      karat: '18KT Gold',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&q=80'
    },
    { 
      id: 6, 
      name: 'Antique Bangle Set', 
      price: '95,000', 
      karat: '22KT Gold',
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=600&fit=crop&q=80'
    },
  ];

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

      {/* Swiper Carousel */}
      <div className="px-4 lg:px-8">
        <Swiper
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
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="cursor-pointer group">
                {/* Product Image with Heart Icon */}
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 transition-shadow duration-300 group-hover:shadow-sm">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="eager"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  
                  {/* Heart/Wishlist Button */}
                  <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-[#B8941E] hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Product Details */}
                <div>
                  <p className="text-xs text-[#B8941E] mb-1 font-medium">{product.karat}</p>
                  <h3 className="font-semibold text-base mb-2 text-[#1a1a1a] group-hover:text-[#B8941E] transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-[#1a1a1a]">₹ {product.price}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
