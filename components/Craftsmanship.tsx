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
    <section className="pt-8 md:pt-12 pb-4 md:pb-6 bg-white">
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
              Made for weddings, gifting and family milestones
            </h2>
            <p className="text-gray-700 mb-8 text-sm md:text-base leading-relaxed">
              Every piece at SriGaneshJewellers is chosen to feel meaningful, wearable and 
              worthy of being passed from one generation to the next.
            </p>
            <button className="bg-[#B8941E] text-white px-8 py-3 rounded hover:bg-black transition font-medium text-sm cursor-pointer">
              Book a Store Visit
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section - Features Grid */}
      <div className="container mx-auto px-4 lg:px-8 mt-16 mb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="text-center"
              >
                <div className="flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-12 h-12 text-[#B8941E]" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-lg mb-2 text-[#1a1a1a]">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
