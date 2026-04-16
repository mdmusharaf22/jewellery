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

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="w-[90%] max-w-4xl mx-auto">
          {/* Illustration */}
          <div className="text-center mb-8">
            <img
              src="https://storyset.com/illustration/no-data/rafiki"
              alt="No Results Found"
              className="w-full max-w-md mx-auto mb-8"
            />
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              No Results Found
            </h1>
            
            {query && (
              <p className="text-gray-600 text-lg mb-2">
                We couldn't find any products matching <span className="font-semibold text-[#B8941E]">"{query}"</span>
              </p>
            )}
            
            <p className="text-gray-600 mb-8">
              Try adjusting your search or browse our popular categories below
            </p>
          </div>

          {/* Search Suggestions */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-[#B8941E]" />
              Search Tips
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Check your spelling</li>
              <li>• Try more general keywords</li>
              <li>• Try different keywords</li>
              <li>• Use fewer keywords</li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#B8941E]" />
              Popular Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {popularCategories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#B8941E] hover:bg-[#FFF8E7] transition text-center font-semibold text-gray-700 hover:text-[#B8941E]"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#B8941E] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#9a7a19] transition"
            >
              <Home className="w-5 h-5" />
              Go to Homepage
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#B8941E] text-[#B8941E] px-8 py-3 rounded-lg font-semibold hover:bg-[#FFF8E7] transition"
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
