'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Heart, ShoppingBag, User, Store } from 'lucide-react';
import SearchPopup from './SearchPopup';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Subscribe to Redux store updates
    if (typeof window !== 'undefined') {
      try {
        const { store } = require('@/store/store');
        
        const updateCounts = () => {
          const state = store.getState();
          const items = state.cart?.items || [];
          const wishlist = state.wishlist?.items || [];
          const auth = state.auth || { isAuthenticated: false, user: null };
          
          setCartCount(items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0));
          setWishlistCount(wishlist.length);
          setIsAuthenticated(auth.isAuthenticated);
          setUser(auth.user);
        };
        
        updateCounts();
        const unsubscribe = store.subscribe(updateCounts);
        
        return () => unsubscribe();
      } catch (e) {
        console.error('Redux store not available');
      }
    }
  }, []);
  
  const [searchOpen, setSearchOpen] = useState(false);
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
    { name: 'TALI', href: '/tali' },
    { name: 'Gold Kaapu', href: '/gold-kaapu' },
    { name: 'TALI CHAIN', href: '/tali-chain' },
    { name: 'Bracelet', href: '/bracelet' },
    { name: 'Necklace', href: '/necklace' },
    { name: 'Gold Jhumkas', href: '/gold-jhumkas' },
    { name: 'Kalipot', href: '/kalipot' },
    { name: 'Gold Dollar', href: '/gold-dollar' },
    { name: 'Dollar chain', href: '/dollar-chain' },
    { name: 'Gold Ring', href: '/gold-ring' },
    { name: 'Stud', href: '/stud' },
    { name: 'All', href: '/all' },
    { name: 'Bangles', href: '/bangles' },
    { name: 'Haram', href: '/haram' },
  ];

  const silverCategories = [
    { name: 'Anklet', href: '/anklet' },
    { name: 'Ring', href: '/ring' },
    { name: 'Bangles', href: '/bangles' },
    { name: 'Bracelet', href: '/bracelet' },
    { name: 'Kappu', href: '/kappu' },
    { name: 'Tattu', href: '/tattu' },
    { name: 'Key Chain', href: '/key-chain' },
    { name: 'All', href: '/all' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#1a1a1a] text-white text-xs py-2 overflow-hidden">
        <div className="w-full px-2 sm:px-4 lg:px-8 max-w-[100vw]">
          <div className="flex flex-wrap justify-between items-center gap-1 sm:gap-2">
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-6 text-[10px] sm:text-[11px] md:text-xs">
              <span className="whitespace-nowrap">Gold: ₹7,245/g</span>
              <span className="whitespace-nowrap">Silver: ₹94/g</span>
            </div>
            <div className="text-[9px] sm:text-[11px] md:text-xs hidden md:block">
              <span className="whitespace-nowrap">Free shipping above ₹50,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white overflow-hidden">
        <div className="w-full px-2 sm:px-4 lg:px-8 max-w-[100vw]">
          <div className="flex justify-between items-center py-2">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <div className="relative h-10 sm:h-12 md:h-16 w-24 sm:w-32 md:w-48">
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
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
              {/* Search Icon */}
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition"
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </button>

              {/* User Icon */}
              <Link 
                href={isAuthenticated ? "/dashboard" : "/login"}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition"
                aria-label="Account"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </Link>

              {/* Wishlist Icon */}
              <Link 
                href="/wishlist"
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition relative"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-500 text-white text-[9px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <Link 
                href="/cart"
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition relative"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-500 text-white text-[9px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Store Location Icon - Hidden on small screens */}
              <button 
                className="hidden md:flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition"
                aria-label="Store Location"
                title="Visit our showroom"
              >
                <Store className="w-5 h-5 text-gray-700" />
              </button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-1.5 sm:p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Gold Navigation Bar - Sticky on scroll - Hidden on mobile */}
      <div
        className={`bg-[#B8941E] transition-all duration-300 hidden lg:block overflow-hidden ${isScrolled ? 'sticky top-0 z-50 shadow-lg' : ''}`}
      >
        <div className="w-full px-4 lg:px-8 max-w-[100vw]">
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
            <Link href="/about" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
              About
            </Link>
            <Link href="/savings-scheme" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
              Savings Schema
            </Link>
            <Link href="/contact" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Gold Dropdown - Hidden on mobile/tablet */}
        {goldMenuOpen && (
          <div
            className="hidden lg:block absolute left-0 right-0 w-full bg-[#F5F1E8] shadow-lg z-[100]"
            onMouseEnter={handleGoldEnter}
            onMouseLeave={handleGoldLeave}
          >
            <div className="w-full py-6">
              <div className="grid grid-cols-[60%_35%] gap-8 px-12">
                {/* Categories */}
                <div className="grid grid-cols-2 gap-x-12">
                  {goldCategories.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg text-gray-800 hover:text-[#B8941E] transition font-medium block leading-tight py-0.5"
                      onClick={() => setGoldMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Two Banner Images */}
                <div className="flex flex-col gap-4">
                  <div className="relative h-[200px] rounded-lg overflow-hidden group">
                    <Image
                      src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=400&fit=crop&q=80"
                      alt="Gold Necklaces"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="35vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <p className="text-2xl font-bold">Necklaces</p>
                        <p className="text-sm">Premium Collection</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-[200px] rounded-lg overflow-hidden group">
                    <Image
                      src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=400&fit=crop&q=80"
                      alt="Gold Bangles"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="35vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <p className="text-2xl font-bold">Bangles</p>
                        <p className="text-sm">Traditional Designs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Silver Dropdown - Hidden on mobile/tablet */}
        {silverMenuOpen && (
          <div
            className="hidden lg:block absolute left-0 right-0 w-full bg-[#F5F1E8] shadow-lg z-[100]"
            onMouseEnter={handleSilverEnter}
            onMouseLeave={handleSilverLeave}
          >
            <div className="w-full py-8">
              <div className="grid grid-cols-[60%_35%] gap-8 px-12">
                {/* Categories */}
                <div className="grid grid-cols-2 gap-x-12">
                  {silverCategories.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg text-gray-800 hover:text-[#B8941E] transition font-medium block leading-tight py-0.5"
                      onClick={() => setSilverMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Single Banner Image */}
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
        <div className="lg:hidden bg-white border-t shadow-lg">
          <nav className="w-full px-4 py-4 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
            <Link href="/" className="text-[#1a1a1a] hover:text-[#D4AF37] hover:bg-gray-50 py-3 px-3 font-medium rounded transition" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/gold" className="text-[#1a1a1a] hover:text-[#D4AF37] hover:bg-gray-50 py-3 px-3 font-medium rounded transition" onClick={() => setMobileMenuOpen(false)}>Gold</Link>
            <Link href="/silver" className="text-[#1a1a1a] hover:text-[#D4AF37] hover:bg-gray-50 py-3 px-3 font-medium rounded transition" onClick={() => setMobileMenuOpen(false)}>Silver</Link>
            <Link href="/mens-collection" className="text-[#1a1a1a] hover:text-[#D4AF37] hover:bg-gray-50 py-3 px-3 font-medium rounded transition" onClick={() => setMobileMenuOpen(false)}>Men's Collection</Link>
            <Link href="/womens-collection" className="text-[#1a1a1a] hover:text-[#D4AF37] hover:bg-gray-50 py-3 px-3 font-medium rounded transition" onClick={() => setMobileMenuOpen(false)}>Women's Collection</Link>
            <Link href="/kids-collection" className="text-[#1a1a1a] hover:text-[#D4AF37] hover:bg-gray-50 py-3 px-3 font-medium rounded transition" onClick={() => setMobileMenuOpen(false)}>Kids Collection</Link>
            <Link href="/about" className="text-[#1a1a1a] hover:text-[#D4AF37] hover:bg-gray-50 py-3 px-3 font-medium rounded transition" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/savings-scheme" className="text-[#1a1a1a] hover:text-[#D4AF37] hover:bg-gray-50 py-3 px-3 font-medium rounded transition" onClick={() => setMobileMenuOpen(false)}>Savings Schema</Link>
            <Link href="/contact" className="text-[#1a1a1a] hover:text-[#D4AF37] hover:bg-gray-50 py-3 px-3 font-medium rounded transition" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
          </nav>
        </div>
      )}

      {/* Search Popup */}
      <SearchPopup isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}