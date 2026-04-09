'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [goldMenuOpen, setGoldMenuOpen] = useState(false);
  const [silverMenuOpen, setSilverMenuOpen] = useState(false);

  const goldCloseTimeout = useRef<NodeJS.Timeout | null>(null);
  const silverCloseTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      setGoldMenuOpen(false);
      setSilverMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gold hover handlers
  const handleGoldEnter = () => {
    if (goldCloseTimeout.current) clearTimeout(goldCloseTimeout.current);
    setSilverMenuOpen(false);
    if (silverCloseTimeout.current) clearTimeout(silverCloseTimeout.current);
    setGoldMenuOpen(true);
  };
  const handleGoldLeave = () => {
    goldCloseTimeout.current = setTimeout(() => setGoldMenuOpen(false), 120);
  };

  // Silver hover handlers
  const handleSilverEnter = () => {
    if (silverCloseTimeout.current) clearTimeout(silverCloseTimeout.current);
    setGoldMenuOpen(false);
    if (goldCloseTimeout.current) clearTimeout(goldCloseTimeout.current);
    setSilverMenuOpen(true);
  };
  const handleSilverLeave = () => {
    silverCloseTimeout.current = setTimeout(() => setSilverMenuOpen(false), 120);
  };

  const goldCategories = [
    { name: 'TALI', href: '/gold/tali' },
    { name: 'Gold Kaapu', href: '/gold/kaapu' },
    { name: 'TALI CHAIN', href: '/gold/tali-chain' },
    { name: 'Bracelet', href: '/gold/bracelet' },
    { name: 'Necklace', href: '/gold/necklace' },
    { name: 'Gold Jhumkas', href: '/gold/jhumkas' },
    { name: 'Kalipot', href: '/gold/kalipot' },
    { name: 'Gold Dollar', href: '/gold/dollar' },
    { name: 'Dollar chain', href: '/gold/dollar-chain' },
    { name: 'Gold Ring', href: '/gold/ring' },
    { name: 'Stud', href: '/gold/stud' },
    { name: 'All', href: '/gold/all' },
    { name: 'Bangles', href: '/gold/bangles' },
    { name: 'Haram', href: '/gold/haram' },
  ];

  const silverCategories = [
    { name: 'Anklet', href: '/silver/anklet' },
    { name: 'Ring', href: '/silver/ring' },
    { name: 'Bangles', href: '/silver/bangles' },
    { name: 'Bracelet', href: '/silver/bracelet' },
    { name: 'Kappu', href: '/silver/kappu' },
    { name: 'Tattu', href: '/silver/tattu' },
    { name: 'Key Chain', href: '/silver/key-chain' },
    { name: 'All', href: '/silver/all' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#1a1a1a] text-white text-xs py-2">
        <div className="w-full px-4 lg:px-8">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex flex-wrap gap-3 md:gap-6 text-[11px] md:text-xs">
              <span>Gold 22K: ₹7,245/g</span>
              <span>Silver: ₹94/g</span>
              <span className="hidden md:inline">Gold Loan in 30 min</span>
            </div>
            <div className="text-[11px] md:text-xs">
              <span>Free insured shipping across India above ₹50,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white">
        <div className="w-full px-4 lg:px-8">
          <div className="flex justify-between items-center py-2">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative h-12 md:h-16 w-32 md:w-48">
                <Image
                  src="/logo.jpg"
                  alt="SriGanesh Jewellers"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Right Side Icons & CTA */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Search Icon */}
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Wishlist Icon */}
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              {/* Cart Icon */}
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>

              {/* Visit Showroom Button */}
              <button className="hidden md:block bg-[#B8941E] text-white px-5 py-2 rounded hover:bg-black transition font-medium text-sm cursor-pointer">
                Visit Showroom
              </button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Gold Navigation Bar - Sticky on scroll */}
      <div
        className={`bg-[#B8941E] transition-all duration-300 ${isScrolled ? 'sticky top-0 z-50 shadow-lg' : ''}`}
      >
        <div className="w-full px-4 lg:px-8">
          <nav className="flex items-center justify-center gap-6 lg:gap-8 py-1.5 relative">
            <Link href="/" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
              Home
            </Link>

            {/* Gold Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={handleGoldEnter}
              onMouseLeave={handleGoldLeave}
            >
              <button className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap flex items-center gap-1 py-4">
                Gold
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Silver Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={handleSilverEnter}
              onMouseLeave={handleSilverLeave}
            >
              <button className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap flex items-center gap-1 py-4">
                Silver
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <Link href="/mens-collection" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
              Men's Collection
            </Link>
            <Link href="/womens-collection" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
              Women's Collection
            </Link>
            <Link href="/kids-collection" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
              Kids Collection
            </Link>
            <Link href="/savings" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
              Savings Schema
            </Link>
            <Link href="/contact" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Gold Dropdown */}
        {goldMenuOpen && (
          <div
            className="absolute left-0 right-0 w-full bg-[#F5F1E8] shadow-lg z-[100]"
            onMouseEnter={handleGoldEnter}
            onMouseLeave={handleGoldLeave}
          >
            <div className="w-full py-6">
              <div className="grid grid-cols-[60%_35%] gap-8 px-12">
                {/* Categories */}
                <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                  {goldCategories.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg text-gray-800 hover:text-[#B8941E] transition font-medium block py-1"
                      onClick={() => setGoldMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Banner Image */}
                <div className="relative h-full min-h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop&q=80"
                    alt="Gold Collection"
                    fill
                    className="object-cover"
                    sizes="35vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <p className="text-4xl font-bold mb-1">3500+</p>
                      <p className="text-lg">Designs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Silver Dropdown */}
        {silverMenuOpen && (
          <div
            className="absolute left-0 right-0 w-full bg-[#F5F1E8] shadow-lg z-[100]"
            onMouseEnter={handleSilverEnter}
            onMouseLeave={handleSilverLeave}
          >
            <div className="w-full py-6">
              <div className="grid grid-cols-[60%_35%] gap-8 px-12">
                {/* Categories */}
                <div className="grid grid-cols-2 gap-x-12 gap-y-1">
                  {silverCategories.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg text-gray-800 hover:text-[#B8941E] transition font-medium block"
                      onClick={() => setSilverMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Banner Image */}
                <div className="relative h-full min-h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&h=800&fit=crop&q=80"
                    alt="Silver Collection"
                    fill
                    className="object-cover"
                    sizes="35vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <p className="text-4xl font-bold mb-1">2000+</p>
                      <p className="text-lg">Designs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="w-full px-4 py-4 flex flex-col gap-3">
            <Link href="/" className="text-[#1a1a1a] hover:text-[#D4AF37] py-2 font-medium">Home</Link>
            <Link href="/gold" className="text-[#1a1a1a] hover:text-[#D4AF37] py-2 font-medium">Gold</Link>
            <Link href="/silver" className="text-[#1a1a1a] hover:text-[#D4AF37] py-2 font-medium">Silver</Link>
            <Link href="/mens-collection" className="text-[#1a1a1a] hover:text-[#D4AF37] py-2 font-medium">Men's Collection</Link>
            <Link href="/womens-collection" className="text-[#1a1a1a] hover:text-[#D4AF37] py-2 font-medium">Women's Collection</Link>
            <Link href="/kids-collection" className="text-[#1a1a1a] hover:text-[#D4AF37] py-2 font-medium">Kids Collection</Link>
            <Link href="/savings" className="text-[#1a1a1a] hover:text-[#D4AF37] py-2 font-medium">Savings Schema</Link>
            <Link href="/contact" className="text-[#1a1a1a] hover:text-[#D4AF37] py-2 font-medium">Contact Us</Link>
            <button className="bg-[#B8941E] text-white px-6 py-2 rounded w-full mt-2 font-medium hover:bg-black transition">
              Visit Showroom
            </button>
          </nav>
        </div>
      )}
    </>
  );
}