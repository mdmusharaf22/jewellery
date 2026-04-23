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
      <div className="border-t border-gray-200 mb-8 sm:mb-10 md:mb-12"></div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 xs:gap-6 sm:gap-8">
        {badges.map((badge, index) => (
          <div key={index} className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-[#FFF8E7] rounded-full mb-3 sm:mb-4">
              <badge.icon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-[#B8941E]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1.5 sm:mb-2 text-sm sm:text-base">{badge.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{badge.description}</p>
          </div>
        ))}
      </div>
      
      {/* Bottom horizontal line */}
      <div className="border-t border-gray-200 mt-8 sm:mt-10 md:mt-12"></div>
    </div>
  );
}
