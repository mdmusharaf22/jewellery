'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
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

const COLLECTION_CONFIG = {
  'mens-collection': {
    title: "Men's Collection",
    description: "Discover our exclusive range of men's jewellery",
    genderFilter: ['male', 'unisex'],
    ageFilter: 'adult'
  },
  'womens-collection': {
    title: "Women's Collection",
    description: "Explore our elegant women's jewellery collection",
    genderFilter: ['female', 'unisex'],
    ageFilter: 'adult'
  },
  'kids-collection': {
    title: "Kids Collection",
    description: "Beautiful jewellery designed for children",
    genderFilter: null, // Show all genders for kids
    ageFilter: 'kid'
  }
};

export default function CollectionPage() {
  const params = useParams();
  const type = params.type as string;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedKarat, setSelectedKarat] = useState<string>('all');

  const config = COLLECTION_CONFIG[type as keyof typeof COLLECTION_CONFIG];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products', { requiresAuth: false });
        
        if (response && response.success && response.data) {
          // Filter products based on collection type
          let filtered = response.data;
          
          if (config) {
            // Filter by age group
            if (config.ageFilter) {
              filtered = filtered.filter((p: Product) => p.age_group === config.ageFilter);
            }
            
            // Filter by gender
            if (config.genderFilter) {
              filtered = filtered.filter((p: Product) => 
                config.genderFilter!.includes(p.gender)
              );
            }
          }
          
          setProducts(filtered);
          setFilteredProducts(filtered);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (config) {
      fetchProducts();
    }
  }, [type]);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Price filter
    filtered = filtered.filter(
      (product) => product.cached_price >= priceRange[0] && product.cached_price <= priceRange[1]
    );

    // Karat filter (metal type)
    if (selectedKarat !== 'all') {
      filtered = filtered.filter((product) => product.metal_type === selectedKarat);
    }

    setFilteredProducts(filtered);
  }, [products, priceRange, selectedKarat]);

  if (!config) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Collection Not Found</h1>
            <p className="text-gray-600 mb-8">The collection you're looking for doesn't exist.</p>
            <a href="/" className="bg-[#B8941E] text-white px-6 py-3 rounded-lg hover:bg-[#9a7a18] transition">
              Go to Home
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#B8941E] to-[#D4AF37] text-white py-12 md:py-16">
        <div className="w-[90%] mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{config.title}</h1>
          <p className="text-lg md:text-xl opacity-90">{config.description}</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 sm:py-4">
        <div className="w-[90%] mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-[#B8941E] transition">Home</a>
            <span>•</span>
            <span className="text-gray-900">{config.title}</span>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="w-[90%] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <ProductFilters
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              selectedKarat={selectedKarat}
              onKaratChange={setSelectedKarat}
            />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} Results
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Products Grid */}
            {!loading && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => {
                  const primaryImage = product.images.find(img => img.is_primary)?.url || 
                                     product.images[0]?.url || 
                                     'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop&q=80';
                  
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
                    />
                  );
                })}
              </div>
            )}

            {/* No Results */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Products Found</h3>
                <p className="text-gray-600 mb-8">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
