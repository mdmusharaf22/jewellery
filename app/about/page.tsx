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
        className="relative h-[150px] xs:h-[180px] sm:h-[200px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#2a2420] to-[#3E2723]"
      >
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold">About Us</h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white py-8 xs:py-10 sm:py-12 md:py-16 lg:py-24">
        <div className="w-[90%] mx-auto px-2 xs:px-3 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 xs:mb-5 sm:mb-6">
                Our Story
              </h2>
              <div className="space-y-3 xs:space-y-4 text-sm xs:text-base text-gray-700 leading-relaxed">
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
            <div className="relative h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[#2a2420] to-[#3E2723] flex items-center justify-center">
              <div className="text-white text-center p-4 xs:p-6 sm:p-8">
                <p className="text-xs xs:text-sm opacity-70">Image Placeholder</p>
                <p className="text-[10px] xs:text-xs opacity-50 mt-2">Replace with your showroom image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-[#F5F1E8] py-8 xs:py-10 sm:py-12 md:py-16 lg:py-24">
        <div className="w-[90%] mx-auto px-2 xs:px-3 sm:px-4">
          <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2 xs:mb-3 sm:mb-4">
              Our Values
            </h2>
            <p className="text-sm xs:text-base text-gray-600 max-w-2xl mx-auto px-4">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-5 xs:p-6 sm:p-8 text-center hover:shadow-lg transition">
                <div className="inline-flex items-center justify-center w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-[#FFF8E7] rounded-full mb-3 xs:mb-4">
                  <value.icon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-[#B8941E]" />
                </div>
                <h3 className="font-bold text-sm xs:text-base text-[#1a1a1a] mb-2 xs:mb-3">{value.title}</h3>
                <p className="text-xs xs:text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="bg-white py-8 xs:py-10 sm:py-12 md:py-16 lg:py-24">
        <div className="w-[90%] mx-auto px-2 xs:px-3 sm:px-4">
          <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2 xs:mb-3 sm:mb-4">
              Our Journey
            </h2>
            <p className="text-sm xs:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Milestones that shaped our legacy
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-6 sm:gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-block bg-[#B8941E] text-white text-xl xs:text-2xl font-bold px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full mb-3 xs:mb-4">
                    {milestone.year}
                  </div>
                  <h3 className="font-bold text-[#1a1a1a] mb-1.5 xs:mb-2 text-base xs:text-lg">{milestone.title}</h3>
                  <p className="text-xs xs:text-sm text-gray-600">{milestone.description}</p>
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
      <section className="bg-gradient-to-br from-[#2a2420] to-[#3E2723] py-8 xs:py-10 sm:py-12 md:py-16 lg:py-24 text-white">
        <div className="w-[90%] mx-auto px-2 xs:px-3 sm:px-4">
          <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4">
              Why Choose SriGanesh Jewellers?
            </h2>
            <p className="text-sm xs:text-base text-gray-300 max-w-2xl mx-auto px-4">
              Experience the difference of genuine care and quality
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 xs:gap-8">
            <div className="text-center">
              <div className="text-3xl xs:text-4xl sm:text-5xl font-bold text-[#B8941E] mb-1.5 xs:mb-2">40+</div>
              <p className="text-sm xs:text-base text-gray-300">Years of Excellence</p>
            </div>
            <div className="text-center">
              <div className="text-3xl xs:text-4xl sm:text-5xl font-bold text-[#B8941E] mb-1.5 xs:mb-2">50K+</div>
              <p className="text-sm xs:text-base text-gray-300">Happy Families</p>
            </div>
            <div className="text-center">
              <div className="text-3xl xs:text-4xl sm:text-5xl font-bold text-[#B8941E] mb-1.5 xs:mb-2">100%</div>
              <p className="text-sm xs:text-base text-gray-300">BIS Hallmarked</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-8 xs:py-10 sm:py-12 md:py-16 lg:py-24">
        <div className="w-[90%] mx-auto px-2 xs:px-3 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="relative h-[250px] xs:h-[300px] sm:h-[400px] md:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[#2a2420] to-[#3E2723] flex items-center justify-center order-2 lg:order-1">
              <div className="text-white text-center p-4 xs:p-6 sm:p-8">
                <p className="text-xs xs:text-sm opacity-70">Image Placeholder</p>
                <p className="text-[10px] xs:text-xs opacity-50 mt-2">Replace with jewellery craftsmanship image</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 xs:mb-5 sm:mb-6">
                Everything Has A Story To Tell
              </h2>
              <div className="space-y-3 xs:space-y-4 text-sm xs:text-base text-gray-700 leading-relaxed">
                <p>
                  The inspiration for our designs has always been the art of sculpting an accessory 
                  from the highest quality fabrics and embellishments. Years of experience culminates 
                  in the perfect pieces offering unparalleled elegance.
                </p>
                <p>
                  Each piece of jewellery tells a unique story—of tradition, celebration, and the 
                  precious moments that define our lives. From wedding ceremonies to festive gatherings, 
                  our creations become part of your family's legacy.
                </p>
                <p>
                  We blend time-honored craftsmanship with contemporary design sensibilities, ensuring 
                  every piece resonates with both tradition and modern aesthetics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Designs Section */}
      <section className="bg-[#F5F1E8] py-8 xs:py-10 sm:py-12 md:py-16 lg:py-24">
        <div className="w-[90%] mx-auto px-2 xs:px-3 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 xs:mb-5 sm:mb-6">
                Our Designs
              </h2>
              <div className="space-y-3 xs:space-y-4 text-sm xs:text-base text-gray-700 leading-relaxed">
                <p>
                  We're a 21st century company so we use technology and innovation to create timeless 
                  pieces that honor tradition while embracing modernity.
                </p>
                <p>
                  Our design philosophy centers on creating jewellery that transcends trends—pieces 
                  that become cherished heirlooms passed down through generations.
                </p>
                <p>
                  From intricate temple jewellery to minimalist contemporary designs, each creation 
                  reflects our commitment to excellence and attention to detail.
                </p>
              </div>
            </div>
            <div className="relative h-[250px] xs:h-[300px] sm:h-[400px] md:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[#2a2420] to-[#3E2723] flex items-center justify-center">
              <div className="text-white text-center p-4 xs:p-6 sm:p-8">
                <p className="text-xs xs:text-sm opacity-70">Image Placeholder</p>
                <p className="text-[10px] xs:text-xs opacity-50 mt-2">Replace with design showcase image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Sections */}
      <div className="py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16 bg-white">
        <div className="w-[98%] mx-auto mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-18">
          <TrustBadges />
        </div>
        <div className="w-[100%] mx-auto">
          <Testimonials />
        </div>
      </div>

      <Footer />
    </>
  );
}
