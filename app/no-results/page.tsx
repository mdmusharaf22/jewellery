'use client';

import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search, Home, TrendingUp } from 'lucide-react';

export default function NoResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const popularCategories = [
    { name: 'Gold Necklaces', href: '/gold-necklace' },
    { name: 'Diamond Rings', href: '/gold-ring' },
    { name: 'Silver Bangles', href: '/bangles' },
    { name: 'Gold Earrings', href: '/gold-jhumkas' },
    { name: 'Bridal Jewelry', href: '/haram' },
    { name: 'Temple Jewelry', href: '/tali' },
  ];

  return (
    <>
      <Header />

      <div className="bg-gray-50 py-4 xs:py-6 sm:py-8 md:py-12 pb-8 xs:pb-10 sm:pb-12 md:pb-16">
        <div className="w-[90%] max-w-4xl mx-auto">
          {/* Illustration */}
          <div className="text-center mb-4 xs:mb-5 sm:mb-6 md:mb-8">
            <img
              src="https://storyset.com/illustration/no-data/rafiki"
              alt="No Results Found"
              className="w-full max-w-[180px] xs:max-w-[220px] sm:max-w-xs md:max-w-md mx-auto mb-3 xs:mb-4 sm:mb-6 md:mb-8"
            />
            
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 px-2">
              No Results Found
            </h1>
            
            {query && (
              <p className="text-gray-600 text-xs xs:text-sm sm:text-base md:text-lg mb-1 xs:mb-2 px-2">
                We couldn't find any products matching <span className="font-semibold text-[#B8941E]">"{query}"</span>
              </p>
            )}
            
            <p className="text-gray-600 text-xs xs:text-sm sm:text-base mb-4 xs:mb-5 sm:mb-6 md:mb-8 px-2">
              Try adjusting your search or browse our popular categories below
            </p>
          </div>

          {/* Search Suggestions */}
          <div className="bg-white rounded-lg shadow-sm p-3 xs:p-4 sm:p-6 md:p-8 mb-3 xs:mb-4 sm:mb-6 md:mb-8">
            <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 flex items-center gap-2">
              <Search className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-[#B8941E]" />
              Search Tips
            </h2>
            <ul className="space-y-1 xs:space-y-1.5 sm:space-y-2 text-gray-600 text-xs xs:text-sm sm:text-base">
              <li>• Check your spelling</li>
              <li>• Try more general keywords</li>
              <li>• Try different keywords</li>
              <li>• Use fewer keywords</li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="bg-white rounded-lg shadow-sm p-3 xs:p-4 sm:p-6 md:p-8">
            <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-5 md:mb-6 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-[#B8941E]" />
              Popular Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 xs:gap-3 sm:gap-4">
              {popularCategories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="p-2 xs:p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:border-[#B8941E] hover:bg-[#FFF8E7] transition text-center font-semibold text-gray-700 hover:text-[#B8941E] text-xs xs:text-sm sm:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4 justify-center mt-4 xs:mt-5 sm:mt-6 md:mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#B8941E] text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#9a7a19] transition text-xs xs:text-sm sm:text-base"
            >
              <Home className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
              Go to Homepage
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#B8941E] text-[#B8941E] px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#FFF8E7] transition text-xs xs:text-sm sm:text-base"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
