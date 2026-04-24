import { Shield, RefreshCw, Truck, Users } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: 'BIS Hallmarked',
      description: 'Trusted purity standards for every gold purchase.',
    },
    {
      icon: RefreshCw,
      title: 'Easy Exchange',
      description: 'Simple upgrade support for old and new jewellery.',
    },
    {
      icon: Truck,
      title: 'Safe Delivery',
      description: 'Insured shipping for precious purchases across India.',
    },
    {
      icon: Users,
      title: 'Family Trust',
      description: 'Personal guidance from a local jeweller you know.',
    },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Top horizontal line */}
      <div className="border-t border-gray-200 mb-2 xs:mb-3 sm:mb-3 md:mb-6"></div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
        {badges.map((badge, index) => (
          <div key={index} className="text-center px-2 xs:px-3">
            <div className="inline-flex items-center justify-center w-12 h-12 xs:w-14 xs:h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#FFF8E7] rounded-full mb-3 xs:mb-3 sm:mb-4">
              <badge.icon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#B8941E]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1.5 xs:mb-2 sm:mb-2 text-sm xs:text-base sm:text-base leading-tight">{badge.title}</h3>
            <p className="text-xs xs:text-sm sm:text-sm text-gray-600 leading-relaxed">{badge.description}</p>
          </div>
        ))}
      </div>
      
      {/* Bottom horizontal line */}
      <div className="border-t border-gray-200 mt-4 xs:mt-5 sm:mt-6 md:mt-8"></div>
    </div>
  );
}
