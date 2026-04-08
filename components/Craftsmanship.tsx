import Image from 'next/image';

export default function Craftsmanship() {
  const features = [
    {
      icon: '✓',
      title: 'BIS Hallmarked',
      description: 'Trusted purity standards for every gold purchase.'
    },
    {
      icon: '↻',
      title: 'Easy Exchange',
      description: 'Simple upgrade support for old and new jewellery.'
    },
    {
      icon: '🚚',
      title: 'Safe Delivery',
      description: 'Insured shipping for precious purchases across India.'
    },
    {
      icon: '❤',
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
              <div className="w-16 h-16 bg-[#B8941E] rounded-full flex items-center justify-center text-3xl mx-auto mb-4 text-white">
                {feature.icon}
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
