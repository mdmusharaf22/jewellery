'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import TrustBadges from '@/components/product-detail/TrustBadges';
import Testimonials from '@/components/Testimonials';
import Toast from '@/components/Toast';
import { api } from '@/lib/api';

interface Product {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  base_weight: number;
  is_customizable: number;
  is_featured: number;
  category_id: string | null;
  subcategory_id: string | null;
  metal_type: string;
  gender: string;
  age_group: string;
  cached_price: number;
  created_at: string;
  images: Array<{
    url: string;
    is_primary: boolean;
  }>;
}

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  parent_id: string;
  metal_type: string;
}

export default function SubcategoryPage() {
  const params = useParams();
  const subcategorySlug = params.subcategory as string;
  
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500000 });
  const [selectedCarat, setSelectedCarat] = useState<string>('all');
  const [isCustomizable, setIsCustomizable] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  // Fetch subcategory details and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch subcategory details
        const categoriesResponse = await api.get('/categories', { requiresAuth: false });
        
        if (categoriesResponse && categoriesResponse.success && categoriesResponse.data) {
          // Find subcategory in the children arrays of parent categories
          let foundSubcategory: any = null;
          
          for (const parentCategory of categoriesResponse.data) {
            if (parentCategory.children && parentCategory.children.length > 0) {
              const subcategory = parentCategory.children.find(
                (child: any) => child.slug === subcategorySlug
              );
              
              if (subcategory) {
                foundSubcategory = subcategory;
                break;
              }
            }
          }
          
          if (foundSubcategory) {
            setSubcategory(foundSubcategory);
            
            // Fetch products filtered by subcategory_id
            const productsResponse = await api.get(`/products?subcategory_id=${foundSubcategory.id}`, { requiresAuth: false });
            
            if (productsResponse && productsResponse.success && productsResponse.data) {
              setProducts(productsResponse.data);
              setFilteredProducts(productsResponse.data);
            } else {
              setProducts([]);
              setFilteredProducts([]);
            }
          } else {
            // Check if it's a parent category
            const foundCategory = categoriesResponse.data.find(
              (cat: any) => cat.slug === subcategorySlug
            );
            
            if (foundCategory) {
              // It's actually a parent category, redirect to /products/[category]
              window.location.href = `/products/${subcategorySlug}`;
              return;
            }
          }
        }
      } catch (error) {
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subcategorySlug]);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Price filter
    filtered = filtered.filter(
      (product) => product.cached_price >= priceRange.min && product.cached_price <= priceRange.max
    );

    // Carat filter (metal type)
    if (selectedCarat !== 'all') {
      if (selectedCarat === '18k' || selectedCarat === '22k' || selectedCarat === '24k') {
        filtered = filtered.filter((product) => product.metal_type === 'gold');
      }
    }

    // Customizable filter
    if (isCustomizable) {
      filtered = filtered.filter((product) => product.is_customizable === 1);
    }

    // Featured filter
    if (isFeatured) {
      filtered = filtered.filter((product) => product.is_featured === 1);
    }

    setFilteredProducts(filtered);
  }, [products, priceRange, selectedCarat, isCustomizable, isFeatured]);

  // Pagination
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  if (loading) {
    const PageSkeleton = require('@/components/skeletons/PageSkeleton').default;
    return (
      <>
        <Header />
        <PageSkeleton />
        <Footer />
      </>
    );
  }

  if (!subcategory) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Subcategory Not Found</h1>
            <p className="text-gray-600 mb-8">The subcategory you're looking for doesn't exist.</p>
            <a href="/products/all" className="bg-[#B8941E] text-white px-6 py-3 rounded hover:bg-black transition">
              Browse All Products
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const subcategoryName = subcategory.name;

  return (
    <>
      <Header />
      
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      {/* Hero Banner */}
      <section 
        className="relative h-[200px] bg-gradient-to-r from-[#2a2420] to-[#3E2723] flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#2a2420]/70 to-[#3E2723]/70" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">{subcategoryName}</h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-white">
        <div className="w-[90%] mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-1/4">
              {/* Breadcrumb */}
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  <a href="/" className="hover:text-[#B8941E] transition cursor-pointer">Home</a>
                  <span className="mx-2">•</span>
                  <a href="/products/all" className="hover:text-[#B8941E] transition cursor-pointer">Products</a>
                  <span className="mx-2">•</span>
                  <span className="text-gray-900">{subcategoryName}</span>
                </p>
              </div>

              <ProductFilters 
                selectedCategory="all"
                onCategoryChange={() => {}}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                selectedCarat={selectedCarat}
                onCaratChange={setSelectedCarat}
                isCustomizable={isCustomizable}
                onCustomizableChange={setIsCustomizable}
                isFeatured={isFeatured}
                onFeaturedChange={setIsFeatured}
              />
            </aside>

            {/* Products Area */}
            <main className="lg:w-3/4">
              {/* Results Count and Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                {/* Results Count */}
                <p className="text-gray-600 text-xs sm:text-sm">
                  Showing <span className="font-semibold">{startIndex + 1}-{Math.min(endIndex, filteredProducts.length)}</span> of <span className="font-semibold">{filteredProducts.length}</span> Results
                </p>

                {/* Sort and View Controls */}
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 sm:flex-none px-2 xs:px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B8941E] cursor-pointer"
                  >
                    <option value="featured">Sort By: Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                  </select>

                  {/* View Toggle */}
                  <div className="flex gap-1 sm:gap-2 border border-gray-300 rounded-lg p-0.5 sm:p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 sm:p-2 rounded transition cursor-pointer ${
                        viewMode === 'grid'
                          ? 'bg-[#B8941E] text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      title="Grid View"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 sm:p-2 rounded transition cursor-pointer ${
                        viewMode === 'list'
                          ? 'bg-[#B8941E] text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      title="List View"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid/List */}
              {currentProducts.length > 0 && (
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 mb-8 sm:mb-12'
                  : 'flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-12'
                }>
                  {currentProducts.map((product) => {
                    const primaryImage = product.images.find(img => img.is_primary)?.url || 
                                       product.images[0]?.url || 
                                       '';
                    
                    return (
                      <ProductCard
                        key={product.id}
                        product={{
                          id: product.id,
                          name: product.name,
                          price: product.cached_price || 0,
                          karat: product.metal_type === 'gold' ? '22KT Gold' : 'Silver',
                          image: primaryImage,
                          slug: product.slug
                        }}
                        viewMode={viewMode}
                        onToast={handleToast}
                      />
                    );
                  })}
                </div>
              )}

              {/* No Results */}
              {currentProducts.length === 0 && (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
                </div>
              )}

              {/* Pagination */}
              {filteredProducts.length > 9 && (
                <div className="border-t border-gray-200 pt-8 pb-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-[#B8941E] hover:text-white hover:border-[#B8941E] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`w-10 h-10 flex items-center justify-center border rounded transition ${
                          currentPage === index + 1
                            ? 'bg-[#B8941E] text-white border-[#B8941E]'
                            : 'border-gray-300 hover:bg-[#B8941E] hover:text-white hover:border-[#B8941E]'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-[#B8941E] hover:text-white hover:border-[#B8941E] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Sections with same spacing as home page */}
      <div className="py-12 md:py-16">
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
