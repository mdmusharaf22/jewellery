'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

      {/* Main Header - Sticky */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="w-full px-4 lg:px-8">
          <div className="flex justify-between items-center py-3 md:py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#D4AF37] to-[#B8941E] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl">SG</span>
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
              <button className="hidden md:block bg-[#8B6914] text-white px-5 py-2 rounded hover:bg-[#6d5210] transition font-medium text-sm">
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

        {/* Gold Navigation Bar - Part of sticky header */}
        <div className="bg-[#B8941E]">
          <div className="w-full px-4 lg:px-8">
            <nav className="flex items-center justify-center gap-8 lg:gap-12 py-3 overflow-x-auto">
              <Link href="/" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
                Home
              </Link>
              <Link href="/gold" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
                Gold
              </Link>
              <Link href="/silver" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
                Silver
              </Link>
              <Link href="/savings" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
                Savings Schema
              </Link>
              <Link href="/loans" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
                Loans
              </Link>
              <Link href="/contact" className="text-white hover:text-[#FFF8E7] transition font-medium text-sm whitespace-nowrap">
                Contact Us
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <nav className="w-full px-4 py-4 flex flex-col gap-3">
              <Link href="/" className="text-[#1a1a1a] hover:text-[#D4AF37] py-2 font-medium">Home</Link>
              <Link href="/gold" className="text-[#1a1a1a] hover:text-[#D4AF37] py-2 font-medium">Gold</Link>
              <Link href="/silver" className="text-[#1a1a1a] hover:text-[#D4AF37] py-2 font-medium">Silver</Link>
              <Link href="/savings" className="text-[#1a1a1a] hover:text-[#D4AF37] py-2 font-medium">Savings Schema</Link>
              <Link href="/loans" className="text-[#1a1a1a] hover:text-[#D4AF37] py-2 font-medium">Loans</Link>
              <Link href="/contact" className="text-[#1a1a1a] hover:text-[#D4AF37] py-2 font-medium">Contact Us</Link>
              <button className="bg-[#8B6914] text-white px-6 py-2 rounded w-full mt-2 font-medium">
                Visit Showroom
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
