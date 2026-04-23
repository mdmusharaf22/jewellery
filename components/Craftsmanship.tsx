import Image from 'next/image';
import { ShieldCheck, RefreshCw, Truck, Users } from 'lucide-react';

export default function Craftsmanship() {
  const features = [
    {
      title: 'BIS Hallmarked',
      description: 'Trusted purity standards for every gold purchase.',
      icon: ShieldCheck
    },
    {
      title: 'Easy Exchange',
      description: 'Simple upgrade support for old and new jewellery.',
      icon: RefreshCw
    },
    {
      title: 'Safe Delivery',
      description: 'Insured shipping for precious purchases across India.',
      icon: Truck
    },
    {
      title: 'Family Trust',
      description: 'Personal guidance from a local jeweller you know.',
      icon: Users
    }
  ];

  return (
    <section className="pt-6 sm:pt-8 md:pt-12 pb-4 md:pb-6 bg-white overflow-hidden">
      {/* Top Section - Image and Content Side by Side */}
      <div className="grid lg:grid-cols-2 max-w-[100vw]">
        {/* Left - Image */}
        <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
          <Image
            src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1200&h=800&fit=crop&q=80"
            alt="Craftsmanship"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right - Content */}
        <div className="bg-[#EFE8D8] flex items-center justify-center px-5 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="max-w-xl">
            <p className="text-[#B8941E] uppercase tracking-wider text-[10px] sm:text-xs md:text-sm mb-3 sm:mb-4 font-medium">
              Craftsmanship & care
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 text-[#1a1a1a] leading-tight">
              Made for weddings, gifting and family milestones
            </h2>
            <p className="text-gray-700 mb-6 sm:mb-7 md:mb-8 text-xs sm:text-sm md:text-base leading-relaxed">
              Every piece at SriGaneshJewellers is chosen to feel meaningful, wearable and 
              worthy of being passed from one generation to the next.
            </p>
            <button className="bg-[#B8941E] text-white px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded hover:bg-black transition font-medium text-xs sm:text-sm cursor-pointer">
              Book a Store Visit
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section - Features Grid */}
      <div className="container mx-auto px-4 lg:px-8 mt-10 sm:mt-12 md:mt-16 mb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="text-center"
              >
                <div className="flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Icon className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-[#B8941E]" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-1.5 sm:mb-2 text-[#1a1a1a]">{feature.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
