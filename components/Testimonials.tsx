'use client';

import Image from 'next/image';
import { Star, Quote, BadgeCheck, MapPin } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Anitha R.',
      location: 'Chennai',
      text: 'We bought my daughter\'s wedding set here. The guidance felt personal, the collection looked refined, and the whole buying experience was very reassuring.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    {
      name: 'Karthik M.',
      location: 'Coimbatore',
      text: 'The monthly savings scheme made our planning easy. The structure was clear, the staff explained every step, and it felt like a smart way to buy gold.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    {
      name: 'Priya S.',
      location: 'Madurai',
      text: 'I first visited for silver gifting and later returned for festive shopping. The store feels trustworthy, polished, and genuinely premium without being overwhelming.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    },
    {
      name: 'Rajesh K.',
      location: 'Trichy',
      text: 'Excellent service and beautiful gold designs. The staff took time to understand our requirements and showed us exactly what we were looking for. Very satisfied with our purchase.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
    },
    {
      name: 'Lakshmi V.',
      location: 'Salem',
      text: 'The quality of silver items is outstanding. I bought gifts for my family and everyone loved them. The pricing is transparent and the staff is very helpful.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop'
    },
    {
      name: 'Suresh B.',
      location: 'Erode',
      text: 'Best place for gold loans with quick processing. They explained all terms clearly and the interest rates are very reasonable. Highly recommend for urgent financial needs.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-[#F5F1E8]">
      <div className="w-[90%] mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#1a1a1a]">
          Why families come back to us
        </h2>
        <p className="text-center text-gray-600 mb-12 md:mb-16 max-w-3xl mx-auto text-sm md:text-base">
          A more premium testimonial presentation with subtle gold highlights and stronger visual trust.
        </p>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={32}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 32,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          className="testimonials-swiper cursor-grab"
          style={{ paddingBottom: '20px' }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} style={{ height: 'auto', display: 'flex' }}>
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group flex flex-col w-full">
                {/* Stars and Quote Icon Row - FIXED HEIGHT */}
                <div className="flex items-center justify-between mb-8" style={{ minHeight: '48px' }}>
                  {/* Outline Stars */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 text-[#B8941E]" 
                        fill="none"
                        strokeWidth={2}
                      />
                    ))}
                  </div>
                  
                  {/* Quote Icon in Circle */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#F5F1E8]">
                    <Quote className="w-7 h-7 text-[#C9A961]" strokeWidth={2} />
                  </div>
                </div>

                {/* Quote Text - FLEXIBLE HEIGHT */}
                <div className="flex-grow mb-8">
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Divider Line */}
                <div className="border-t border-gray-200 mb-6"></div>

                {/* Author with photo - FIXED HEIGHT */}
                <div className="flex items-center gap-3" style={{ minHeight: '56px' }}>
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-[#1a1a1a] text-base truncate">{testimonial.name}</p>
                      {/* Gold Verified Badge with Checkmark */}
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#B8941E"/>
                        <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      {/* Location Pin Icon */}
                      <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="truncate">{testimonial.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <p className="text-center text-gray-700 mt-12 md:mt-16 max-w-3xl mx-auto text-sm md:text-base">
          Trusted by families for wedding jewellery, silver gifting, savings plans and 
          transparent gold loan assistance.
        </p>
      </div>

      <style jsx global>{`
        .testimonials-swiper .swiper-wrapper {
          align-items: stretch;
        }
        .testimonials-swiper .swiper-slide {
          height: auto;
          display: flex;
        }
      `}</style>
    </section>
  );
}
