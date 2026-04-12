'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrustBadges from '@/components/product-detail/TrustBadges';
import Testimonials from '@/components/Testimonials';
import { Award, Users, Heart, Shield } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Every piece is BIS hallmarked with clear pricing and genuine quality assurance.',
    },
    {
      icon: Heart,
      title: 'Family First',
      description: 'We treat every customer like family, offering personalized guidance and care.',
    },
    {
      icon: Award,
      title: 'Craftsmanship',
      description: 'Traditional designs meet modern elegance in every handcrafted piece.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Serving Tamil Nadu families for generations with dedication and integrity.',
    },
  ];

  const milestones = [
    { year: '1985', title: 'Foundation', description: 'Started as a small family jewellery shop in Chennai' },
    { year: '2000', title: 'Expansion', description: 'Opened multiple showrooms across Tamil Nadu' },
    { year: '2015', title: 'Innovation', description: 'Launched savings schemes and gold loan services' },
    { year: '2024', title: 'Digital', description: 'Bringing our legacy online for modern families' },
  ];

  return (
    <>
      <Header />
      
      {/* Hero Banner */}
      <section 
        className="relative h-[200px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#2a2420] to-[#3E2723]"
      >
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white py-16 md:py-24">
        <div className="w-[90%] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Since 1985, SriGanesh Jewellers has been a trusted name in Tamil Nadu, serving families 
                  with authentic gold and silver jewellery. What started as a small shop in Chennai has 
                  grown into a beloved destination for wedding jewellery, festive gifting, and everyday elegance.
                </p>
                <p>
                  We believe jewellery is more than adornment—it's a symbol of love, tradition, and 
                  celebration. Every piece we craft carries the warmth of family values and the precision 
                  of expert craftsmanship.
                </p>
                <p>
                  Today, we continue to honor our heritage while embracing modern convenience, offering 
                  savings schemes, gold loans, and personalized service that makes every visit special.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[#2a2420] to-[#3E2723] flex items-center justify-center">
              <div className="text-white text-center p-8">
                <p className="text-sm opacity-70">Image Placeholder</p>
                <p className="text-xs opacity-50 mt-2">Replace with your showroom image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-[#F5F1E8] py-16 md:py-24">
        <div className="w-[90%] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFF8E7] rounded-full mb-4">
                  <value.icon className="w-8 h-8 text-[#B8941E]" />
                </div>
                <h3 className="font-bold text-[#1a1a1a] mb-3">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="bg-white py-16 md:py-24">
        <div className="w-[90%] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Milestones that shaped our legacy
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-block bg-[#B8941E] text-white text-2xl font-bold px-6 py-3 rounded-full mb-4">
                    {milestone.year}
                  </div>
                  <h3 className="font-bold text-[#1a1a1a] mb-2 text-lg">{milestone.title}</h3>
                  <p className="text-sm text-gray-600">{milestone.description}</p>
                </div>
                {index < milestones.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-[#B8941E]/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-br from-[#2a2420] to-[#3E2723] py-16 md:py-24 text-white">
        <div className="w-[90%] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose SriGanesh Jewellers?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience the difference of genuine care and quality
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#B8941E] mb-2">40+</div>
              <p className="text-gray-300">Years of Excellence</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#B8941E] mb-2">50K+</div>
              <p className="text-gray-300">Happy Families</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#B8941E] mb-2">100%</div>
              <p className="text-gray-300">BIS Hallmarked</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="w-[90%] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[#2a2420] to-[#3E2723] flex items-center justify-center">
              <div className="text-white text-center p-8">
                <p className="text-sm opacity-70">Image Placeholder</p>
                <p className="text-xs opacity-50 mt-2">Replace with jewellery craftsmanship image</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6">
                Everything Has A Story To Tell
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The inspiration for our designs has always been the art of sculpting an accessory 
                from the highest quality fabrics and embellishments. Years of experience culminates 
                in the perfect pieces offering unparalleled elegance.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Each piece of jewellery tells a unique story—of tradition, celebration, and the 
                precious moments that define our lives. From wedding ceremonies to festive gatherings, 
                our creations become part of your family's legacy.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We blend time-honored craftsmanship with contemporary design sensibilities, ensuring 
                every piece resonates with both tradition and modern aesthetics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Designs Section */}
      <section className="bg-[#F5F1E8] py-16 md:py-24">
        <div className="w-[90%] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6">
                Our Designs
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We're a 21st century company so we use technology and innovation to create timeless 
                pieces that honor tradition while embracing modernity.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our design philosophy centers on creating jewellery that transcends trends—pieces 
                that become cherished heirlooms passed down through generations.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From intricate temple jewellery to minimalist contemporary designs, each creation 
                reflects our commitment to excellence and attention to detail.
              </p>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[#2a2420] to-[#3E2723] flex items-center justify-center">
              <div className="text-white text-center p-8">
                <p className="text-sm opacity-70">Image Placeholder</p>
                <p className="text-xs opacity-50 mt-2">Replace with design showcase image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Sections */}
      <div className="py-12 md:py-16 bg-white">
        <div className="w-[98%] mx-auto mb-14 md:mb-18">
          <TrustBadges />
        </div>
        <div className="w-[100%] mx-auto mb-14 md:mb-18">
          <Testimonials />
        </div>
      </div>

      <Footer />
    </>
  );
}
