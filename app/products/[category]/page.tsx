'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import ProductSearch from '@/components/products/ProductSearch';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>(category);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

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
      <section className="relative h-[300px] bg-gradient-to-r from-[#2a2420] to-[#3E2723] flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1920')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">PRODUCTS</h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4">
            {/* Breadcrumb */}
            <div className="mb-6">
              <p className="text-sm md:text-base text-gray-600">
                <a href="/" className="hover:text-[#B8941E] transition cursor-pointer">Home</a>
                <span className="mx-2">{'>'}</span>
                <a href="/products" className="hover:text-[#B8941E] transition cursor-pointer">Products</a>
                <span className="mx-2">{'>'}</span>
                <span className="text-gray-900 font-medium">{categoryName}</span>
              </p>
            </div>
            
            <ProductFilters 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </aside>

          {/* Products Area */}
          <main className="lg:w-3/4">
            {/* Search and View Controls */}
            <div className="mb-6">
              <ProductSearch 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>

            {/* Product Grid/List */}
            <ProductGrid 
              viewMode={viewMode}
              selectedCategory={category}
              searchQuery={searchQuery}
              sortBy={sortBy}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
