import Image from 'next/image';

export default function Craftsmanship() {
  const features = [
    {
      title: 'BIS Hallmarked',
      description: 'Trusted purity standards for every gold purchase.'
    },
    {
      title: 'Easy Exchange',
      description: 'Simple upgrade support for old and new jewellery.'
    },
    {
      title: 'Safe Delivery',
      description: 'Insured shipping for precious purchases across India.'
    },
    {
      title: 'Family Trust',
      description: 'Personal guidance from a local jeweller you know.'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      {/* Top Section - Image and Content Side by Side */}
      <div className="grid lg:grid-cols-2">
        {/* Left - Image */}
        <div className="relative h-[600px] lg:h-[700px]">
          <Image
            src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1200&h=800&fit=crop&q=80"
            alt="Craftsmanship"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right - Content */}
        <div className="bg-[#EFE8D8] flex items-center justify-center px-8 md:px-16 py-20 lg:py-24">
          <div className="max-w-xl">
            <p className="text-[#B8941E] uppercase tracking-wider text-xs md:text-sm mb-4 font-medium">
              Craftsmanship & care
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#1a1a1a] leading-tight">
              Made for weddings, gifting<br />
              and family milestones
            </h2>
            <p className="text-gray-700 mb-8 text-sm md:text-base leading-relaxed">
              Every piece at SriGaneshJewellers is chosen to feel meaningful, wearable and 
              worthy of being passed from one generation to the next.
            </p>
            <button className="bg-[#B8941E] text-white px-8 py-3 rounded hover:bg-[#8B6914] transition font-medium text-sm">
              Book a Store Visit
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section - Features Grid */}
      <div className="container mx-auto px-4 lg:px-8 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center"
            >
              <div className="w-16 h-16 border-2 border-[#B8941E] rounded-full flex items-center justify-center mx-auto mb-4">
                {index === 0 && (
                  <svg className="w-8 h-8 text-[#B8941E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )}
                {index === 1 && (
                  <svg className="w-8 h-8 text-[#B8941E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                {index === 2 && (
                  <svg className="w-8 h-8 text-[#B8941E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                )}
                {index === 3 && (
                  <svg className="w-8 h-8 text-[#B8941E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )}
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#1a1a1a]">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
