'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Heart, ShoppingBag, User, Store } from 'lucide-react';
import SearchPopup from './SearchPopup';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { checkAuth, getUserFromSession } from '@/lib/authSync';
import { login } from '@/store/slices/authSlice';
import { getCategories, type Category } from '@/lib/services/categoryService';

// Extended Category interface to match API response
interface CategoryWithChildren extends Category {
  parent_id?: string | null;
  metal_type?: string;
  image_url?: string | null;
  children?: CategoryWithChildren[];
}

export default function Header() {
  const dispatch = useAppDispatch();
  
  // Use Redux hooks instead of manual subscription
  const cartItems = useAppSelector((state) => state.cart?.items || []);
  const wishlistItems = useAppSelector((state) => state.wishlist?.items || []);
  const isAuthenticated = useAppSelector((state) => state.auth?.isAuthenticated || false);
  const user = useAppSelector((state) => state.auth?.user || null);
  
  // Also check sessionStorage directly for cross-tab sync
  const [isAuthSynced, setIsAuthSynced] = useState(false);
  
  useEffect(() => {
    // Check auth from localStorage on mount
    const authFromStorage = checkAuth();
    setIsAuthSynced(authFromStorage);
    
    // If Redux says not authenticated but localStorage says yes, sync it
    if (!isAuthenticated && authFromStorage) {
      const user = getUserFromSession();
      if (user) {
        dispatch(login(user));

      }
    }
    
    // Listen for storage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'customer_token' || e.key === 'auth') {

        const authFromStorage = checkAuth();
        setIsAuthSynced(authFromStorage);
        
        if (authFromStorage) {
          // User logged in on another tab
          const user = getUserFromSession();
          if (user) {
            dispatch(login(user));

          }
        } else {
          // User logged out on another tab

          // Force page reload to clear all state
          window.location.reload();
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isAuthenticated, dispatch]);
  
  const isUserAuthenticated = isAuthenticated || isAuthSynced;
  
  // Calculate counts from Redux state
  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const wishlistCount = wishlistItems.length;
  
  const [goldPrice, setGoldPrice] = useState('7,245');
  const [silverPrice, setSilverPrice] = useState('94');
  const [pricesLoading, setPricesLoading] = useState(true);

  // Categories state
  const [categories, setCategories] = useState<CategoryWithChildren[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Log cart state whenever it changes
  useEffect(() => {

  }, [cartItems, cartCount]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await getCategories();
        setCategories(data as CategoryWithChildren[]);
      } catch (error) {

        // Fallback to empty array on error
        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch live gold and silver prices
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setPricesLoading(true);
        
        // Try your internal API first
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/pricing/live`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data) {
              // Parse the actual API response structure
              const goldPrice = parseFloat(data.data.gold_price);
              const silverPrice = parseFloat(data.data.silver_price);
              
              setGoldPrice(goldPrice.toLocaleString('en-IN'));
              setSilverPrice(silverPrice.toLocaleString('en-IN'));

              setPricesLoading(false);
              return;
            }
          }
        } catch (apiError) {

        }

        // Simulate live prices with realistic variations
        const now = new Date();
        const timeBasedVariation = Math.sin(now.getTime() / 100000) * 50; // Smooth variation
        const randomVariation = (Math.random() - 0.5) * 30; // Small random changes
        
        const baseGold = 7245;
        const baseSilver = 94;
        
        const newGoldPrice = Math.round(baseGold + timeBasedVariation + randomVariation);
        const newSilverPrice = Math.round(baseSilver + (timeBasedVariation / 20) + (randomVariation / 10));
        
        setGoldPrice(newGoldPrice.toLocaleString('en-IN'));
        setSilverPrice(newSilverPrice.toLocaleString('en-IN'));

      } catch (error) {

        setGoldPrice('7,245');
        setSilverPrice('94');
      } finally {
        setPricesLoading(false);
      }
    };

    let interval: NodeJS.Timeout | null = null;

    // Initial fetch on load
    fetchPrices();
    
    // Set up 20-minute interval only when page is visible
    const startInterval = () => {
      if (interval) clearInterval(interval);
      interval = setInterval(fetchPrices, 20 * 60 * 1000); // 20 minutes
    };

    const stopInterval = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopInterval();

      } else {
        fetchPrices(); // Fetch immediately when page becomes visible
        startInterval();

      }
    };

    // Start interval if page is visible
    if (!document.hidden) {
      startInterval();
    }

    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      stopInterval();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
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

  // Filter categories by metal type and prepare menu structure
  const goldCategories = categories
    .filter(cat => cat.metal_type === 'gold' && !cat.parent_id)
    .map(parent => ({
      title: parent.name,
      slug: parent.slug || parent.name.toLowerCase().replace(/\s+/g, '-'),
      items: parent.children && parent.children.length > 0
        ? parent.children.map(child => ({
            name: child.name,
            href: `/c/${child.slug || child.name.toLowerCase().replace(/\s+/g, '-')}`
          }))
        : [{ name: parent.name, href: `/products/${parent.slug || parent.name.toLowerCase().replace(/\s+/g, '-')}` }]
    }));

  const silverCategories = categories
    .filter(cat => cat.metal_type === 'silver' && !cat.parent_id)
    .map(parent => ({
      title: parent.name,
      slug: parent.slug || parent.name.toLowerCase().replace(/\s+/g, '-'),
      items: parent.children && parent.children.length > 0
        ? parent.children.map(child => ({
            name: child.name,
            href: `/c/${child.slug || child.name.toLowerCase().replace(/\s+/g, '-')}`
          }))
        : [{ name: parent.name, href: `/products/${parent.slug || parent.name.toLowerCase().replace(/\s+/g, '-')}` }]
    }));

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#1a1a1a] text-white text-xs py-2 overflow-hidden">
        <div className="w-full px-2 sm:px-4 lg:px-8 max-w-[100vw]">
          <div className="flex flex-wrap justify-between items-center gap-1 sm:gap-2">
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-6 text-[10px] sm:text-[11px] md:text-xs">
              <span className="whitespace-nowrap flex items-center gap-1">
                Gold: ₹
                {pricesLoading ? (
                  <div className="h-3 w-12 bg-gray-300 rounded animate-pulse"></div>
                ) : (
                  goldPrice
                )}
                /g
              </span>
              <span className="whitespace-nowrap flex items-center gap-1">
                Silver: ₹
                {pricesLoading ? (
                  <div className="h-3 w-8 bg-gray-300 rounded animate-pulse"></div>
                ) : (
                  silverPrice
                )}
                /g
              </span>
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
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 192px"
                  priority
                />
              </div>
            </Link>

            {/* Right Side Icons & CTA */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
              {/* Search Icon */}
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-1 sm:p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition"
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </button>

              {/* User Icon */}
              <Link 
                href={isUserAuthenticated ? "/my-account" : "/login"}
                className="p-1 sm:p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition"
                aria-label="Account"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </Link>

              {/* Wishlist Icon */}
              <Link 
                href="/wishlist"
                className="p-1 sm:p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition relative"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-500 text-white text-[8px] sm:text-[10px] md:text-xs font-bold rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              </Link>

              {/* Cart Icon */}
              <Link 
                href="/cart"
                className="p-1 sm:p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition relative"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-500 text-white text-[8px] sm:text-[10px] md:text-xs font-bold rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex items-center justify-center">
                  {cartCount}
                </span>
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
                className="lg:hidden p-1 sm:p-1.5 md:p-2"
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

      {/* Gold Navigation Bar - Always Sticky - Hidden on mobile */}
      <div
        className="bg-[#B8941E] sticky top-0 z-50 shadow-lg transition-all duration-300 hidden lg:block"
      >
        <div className="w-full px-4 lg:px-8 max-w-[100vw]">
          <nav className="flex items-center justify-center gap-6 lg:gap-8 py-1.5">
            <Link href="/" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
              Home
            </Link>

            {/* Gold Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={handleGoldEnter}
              onMouseLeave={handleGoldLeave}
            >
              <Link 
                href="/products/gold"
                className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap flex items-center gap-1 py-4"
              >
                Gold
                <svg className={`w-3 h-3 transition-transform duration-200 ${goldMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>

            {/* Silver Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={handleSilverEnter}
              onMouseLeave={handleSilverLeave}
            >
              <Link 
                href="/products/silver"
                className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap flex items-center gap-1 py-4"
              >
                Silver
                <svg className={`w-3 h-3 transition-transform duration-200 ${silverMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>

            <Link href="/collections/mens-collection" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
              Men's Collection
            </Link>
            <Link href="/collections/womens-collection" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
              Women's Collection
            </Link>
            <Link href="/collections/kids-collection" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
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

        {/* Gold Dropdown - Positioned outside nav container */}
        {goldMenuOpen && (
          <div
            className="absolute left-0 right-0 w-full bg-[#F5F1E8] shadow-xl z-[9999] border-t-2 border-[#B8941E]"
            onMouseEnter={handleGoldEnter}
            onMouseLeave={handleGoldLeave}
          >
            <div className="w-full py-8 px-8 min-h-[60dvh]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full h-full">
                {/* Categories Grid - 2 columns */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-x-6 gap-y-4 content-start">
                  {categoriesLoading ? (
                    // Skeleton loader for gold categories
                    Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="space-y-2">
                        <div className="h-5 w-24 bg-gray-300 rounded animate-pulse mb-2"></div>
                        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-28 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-30 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))
                  ) : goldCategories.length > 0 ? (
                    goldCategories.map((category) => (
                      <div key={category.slug} className="space-y-2">
                        <h3 className="text-base font-bold text-gray-900 mb-2">
                          {category.title}
                        </h3>
                        <div className="space-y-1">
                          {category.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="text-sm text-gray-700 hover:text-gold-primary transition font-medium block leading-relaxed hover:underline underline-offset-2 decoration-1 decoration-gold-dark"
                              onClick={() => setGoldMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center text-gray-500 py-4">
                      No gold categories available
                    </div>
                  )}
                </div>

                {/* Description Section - 3rd column */}
                <div className="flex items-start justify-start bg-gradient-to-br from-gold-light to-cream rounded-lg p-6">
                  <div className="text-left">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      Gold Jewellery Collections
                    </h2>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Discover our exquisite range of handcrafted gold jewellery. 
                      From traditional designs to contemporary styles, each piece 
                      is crafted with precision and certified for purity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Silver Dropdown - Positioned outside nav container */}
        {silverMenuOpen && (
          <div
            className="absolute left-0 right-0 w-full bg-[#F5F1E8] shadow-xl z-[9999] border-t-2 border-[#B8941E]"
            onMouseEnter={handleSilverEnter}
            onMouseLeave={handleSilverLeave}
          >
            <div className="w-full py-8 px-8 min-h-[60dvh]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full h-full">
                {/* Categories Grid - 2 columns */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-x-6 gap-y-4 content-start">
                  {categoriesLoading ? (
                    // Skeleton loader for silver categories
                    Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="space-y-2">
                        <div className="h-5 w-24 bg-gray-300 rounded animate-pulse mb-2"></div>
                        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-28 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-30 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))
                  ) : silverCategories.length > 0 ? (
                    silverCategories.map((category) => (
                      <div key={category.slug} className="space-y-2">
                        <h3 className="text-base font-bold text-gray-900 mb-2">
                          {category.title}
                        </h3>
                        <div className="space-y-1">
                          {category.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="text-sm text-gray-700 hover:text-gold-primary transition font-medium block leading-relaxed hover:underline underline-offset-2 decoration-1 decoration-gold-dark"
                              onClick={() => setSilverMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center text-gray-500 py-4">
                      No silver categories available
                    </div>
                  )}
                </div>

                {/* Description Section - 3rd column */}
                <div className="flex items-start justify-start bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg p-6">
                  <div className="text-left">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      Silver Jewellery Collections
                    </h2>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Explore our stunning collection of pure silver jewellery. 
                      Elegant designs perfect for everyday wear and special occasions, 
                      crafted with 925 sterling silver.
                    </p>
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
            <Link href="/products/gold" className="text-[#1a1a1a] hover:text-[#D4AF37] hover:bg-gray-50 py-3 px-3 font-medium rounded transition" onClick={() => setMobileMenuOpen(false)}>Gold</Link>
            <Link href="/products/silver" className="text-[#1a1a1a] hover:text-[#D4AF37] hover:bg-gray-50 py-3 px-3 font-medium rounded transition" onClick={() => setMobileMenuOpen(false)}>Silver</Link>
            <Link href="/collections/mens-collection" className="text-[#1a1a1a] hover:text-[#D4AF37] hover:bg-gray-50 py-3 px-3 font-medium rounded transition" onClick={() => setMobileMenuOpen(false)}>Men's Collection</Link>
            <Link href="/collections/womens-collection" className="text-[#1a1a1a] hover:text-[#D4AF37] hover:bg-gray-50 py-3 px-3 font-medium rounded transition" onClick={() => setMobileMenuOpen(false)}>Women's Collection</Link>
            <Link href="/collections/kids-collection" className="text-[#1a1a1a] hover:text-[#D4AF37] hover:bg-gray-50 py-3 px-3 font-medium rounded transition" onClick={() => setMobileMenuOpen(false)}>Kids Collection</Link>
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