'use client';

import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import TrustBadges from '@/components/product-detail/TrustBadges';
import Testimonials from '@/components/Testimonials';

// All valid top-level category slugs
const VALID_CATEGORIES = new Set([
  'all',
  'tali', 'gold-kaapu', 'tali-chain', 'bracelet', 'necklace',
  'gold-jhumkas', 'kalipot', 'gold-dollar', 'dollar-chain',
  'gold-ring', 'stud', 'bangles', 'haram',
  'anklet', 'ring', 'kappu', 'tattu', 'key-chain',
  'mens-collection', 'womens-collection', 'kids-collection',
]);

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  if (!VALID_CATEGORIES.has(category)) {
    notFound();
  }
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>(category);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500000 });
  const [selectedCarat, setSelectedCarat] = useState('all');

  // Format category name for display
  const categoryName = category === 'all' 
    ? 'All Products'
    : category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

  return (
    <>
      <Header />
      
      {/* Hero Banner */}
      <section 
        className="relative h-[200px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=400&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">All Products</h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-1/4">
              {/* Breadcrumb */}
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  <a href="/" className="hover:text-[#B8941E] transition cursor-pointer">Home</a>
                  <span className="mx-2">•</span>
                  <span className="text-gray-900">Products</span>
                </p>
              </div>

              <ProductFilters 
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                selectedCarat={selectedCarat}
                onCaratChange={setSelectedCarat}
              />
            </aside>

            {/* Products Area */}
            <main className="lg:w-3/4">
              {/* Product Grid/List */}
              <ProductGrid 
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                selectedCategory={category}
                searchQuery={searchQuery}
                sortBy={sortBy}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                priceRange={priceRange}
                selectedCarat={selectedCarat}
              />
            </main>
          </div>
        </div>
      </div>

      {/* Sections with same spacing as home page */}
      <div className="py-12 md:py-16 bg-white">
        <div className="w-[98%] mx-auto mb-14 md:mb-18">
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
