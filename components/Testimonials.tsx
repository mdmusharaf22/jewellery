import Image from 'next/image';

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
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-[#F5F1E8] mb-16 md:mb-20">
      <div className="w-[90%] mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#1a1a1a]">
          Why families come back to us
        </h2>
        <p className="text-center text-gray-600 mb-12 md:mb-16 max-w-3xl mx-auto text-sm md:text-base">
          A more premium testimonial presentation with subtle gold highlights and stronger visual trust.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Stars and Quote Icon Row - AT THE TOP */}
              <div className="flex items-center justify-between mb-8">
                {/* Outline Stars */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg 
                      key={i} 
                      className="w-6 h-6 text-[#B8941E]" 
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
                
                {/* Quote Icon in Circle - Rounded "99" Style */}
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#F5F1E8]">
                  <svg className="w-10 h-10 text-[#C9A961]" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 48 48">
                    <path d="M10 18c0-3 1.5-5 4-5s4 2 4 4.5c0 3-2.5 5.5-5 8.5"/>
                    <path d="M26 18c0-3 1.5-5 4-5s4 2 4 4.5c0 3-2.5 5.5-5 8.5"/>
                  </svg>
                </div>
              </div>

              {/* Quote Text */}
              <p className="text-gray-700 mb-8 text-sm md:text-base leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Divider Line */}
              <div className="border-t border-gray-200 mb-6"></div>

              {/* Author with photo */}
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-[#1a1a1a] text-base">{testimonial.name}</p>
                    {/* Gold Verified Badge */}
                    <svg 
                      className="w-5 h-5 text-[#B8941E]" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                    {/* Location Pin Icon */}
                    <svg 
                      className="w-4 h-4 text-gray-500" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-700 mt-12 md:mt-16 max-w-3xl mx-auto text-sm md:text-base">
          Trusted by families for wedding jewellery, silver gifting, savings plans and 
          transparent gold loan assistance.
        </p>
      </div>
    </section>
  );
}
