import { Shield, Truck, RefreshCw, Award } from 'lucide-react';

export default function ProductFeatures() {
  const features = [
    {
      icon: Shield,
      title: '100% Certified',
      description: 'BIS Hallmarked Gold',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Fully insured across India',
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      description: '15-day return policy',
    },
    {
      icon: Award,
      title: 'Lifetime Exchange',
      description: 'Upgrade anytime',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-200 mb-12">
      {features.map((feature, index) => (
        <div key={index} className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FFF8E7] rounded-full mb-3">
            <feature.icon className="w-6 h-6 text-[#B8941E]" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
