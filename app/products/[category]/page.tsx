'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import TrustBadges from '@/components/product-detail/TrustBadges';
import Testimonials from '@/components/Testimonials';
import ProductImageGallery from '@/components/product-detail/ProductImageGallery';
import ProductInfo from '@/components/product-detail/ProductInfo';
import ProductDetails from '@/components/product-detail/ProductDetails';
import PriceBreakup from '@/components/product-detail/PriceBreakup';
import DeliveryReturns from '@/components/product-detail/DeliveryReturns';
import SimilarProducts from '@/components/product-detail/SimilarProducts';
import { api } from '@/lib/api';

// Define Product type locally since we're not using productData
interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  karat: string;
  description: string;
  images: string[];
  purityOptions: string[];
  lengthOptions: string[];
  features?: Array<{ key: string; value: string }>;
  information?: Array<{ key: string; value: string }>;
  productInfo: {
    [key: string]: string | undefined;
  };
  metalDimensions: {
    [key: string]: string | undefined;
  };
  priceBreakup: {
    goldValue: number;
    silverValue?: number;
    makingCharges: number;
    gemstoneValue: number;
    wastage: number;
    gst: number;
    total: number;
  };
}

const VALID_CATEGORIES = new Set([
  'all',
  'gold', 'silver', // Added metal type categories
  'test', // Test category
  'tali', 'gold-kaapu', 'tali-chain', 'bracelet', 'necklace',
  'gold-jhumkas', 'kalipot', 'gold-dollar', 'dollar-chain',
  'gold-ring', 'stud', 'bangles', 'haram',
  'anklet', 'ring', 'kappu', 'tattu', 'key-chain',
  'mens-collection', 'womens-collection', 'kids-collection',
]);

interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  base_weight: number;
  cached_price: number | null;
  dynamic_price: number;
  is_featured: number;
  is_customizable: number;
  metal_type: string;
  making_charges: number;
  wastage: number;
  gst_percentage: number;
  gemstone_value: number;
  images: {
    url: string;
    is_primary: boolean;
  }[];
  videos: string[];
  length: number[];
  features: {
    key: string;
    value: string;
  }[];
  information: {
    key: string;
    value: string;
  }[];
  dimensions: {
    key: string;
    value: string;
  }[];
  price_breakup: {
    gold_value: number;
    silver_value: number;
    making_charges: number;
    gemstone_value: number;
    wastage: number;
    gst: number;
    total: number;
  };
}

export default function CategoryOrProductPage() {
  const params = useParams();
  const category = params.category as string;
  
  // State for category page
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>(category);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500000 });
  const [selectedCarat, setSelectedCarat] = useState('all');
  // Initialize metal types based on category (gold/silver) or empty array
  const [selectedMetalTypes, setSelectedMetalTypes] = useState<string[]>(
    category === 'gold' ? ['gold'] : category === 'silver' ? ['silver'] : []
  );
  const [isCustomizable, setIsCustomizable] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  // State for product page
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProductPage, setIsProductPage] = useState(false);
  const [zoomData, setZoomData] = useState<{ isZoomed: boolean; position: { x: number; y: number }; imageUrl: string }>({
    isZoomed: false,
    position: { x: 0, y: 0 },
    imageUrl: '',
  });

  // Transform API product to local Product format
  const transformApiProduct = (apiProduct: ApiProduct): Product => {
    // Find primary image or use first image
    let primaryImage = '';
    
    if (apiProduct.images && apiProduct.images.length > 0) {
      const primary = apiProduct.images.find(img => img.is_primary === true);
      if (primary && primary.url) {
        primaryImage = primary.url;
      } else if (apiProduct.images[0] && apiProduct.images[0].url) {
        primaryImage = apiProduct.images[0].url;
      }
    }

    // Transform images array
    const images = apiProduct.images && apiProduct.images.length > 0 
      ? apiProduct.images.map(img => img.url)
      : [primaryImage];

    // Create purity options based on metal type
    const purityOptions = apiProduct.metal_type === 'gold' 
      ? ['22KT', '18KT', '14KT'] 
      : ['925 Silver', '999 Silver'];

    // Create length options from API length array or defaults
    const lengthOptions = apiProduct.length && apiProduct.length.length > 0
      ? apiProduct.length.map(len => `${len}"`)
      : ['16"', '18"', '20"', '22"'];

    return {
      id: parseInt(apiProduct.id) || Math.floor(Math.random() * 10000), // Convert string ID to number
      name: apiProduct.name,
      slug: apiProduct.slug,
      price: apiProduct.cached_price || apiProduct.dynamic_price || 0,
      karat: apiProduct.metal_type === 'gold' ? '22KT Gold' : 'Silver',
      category: 'products',
      images,
      description: apiProduct.description || apiProduct.short_description || 'Beautiful handcrafted jewelry piece.',
      purityOptions,
      lengthOptions,
      features: apiProduct.features || [],
      information: apiProduct.information || [],
      productInfo: {
        // Only dynamic values from information array
        ...(apiProduct.information.reduce((acc, info) => {
          acc[info.key] = info.value;
          return acc;
        }, {} as Record<string, string | undefined>))
      },
      metalDimensions: {
        // Only dynamic values from dimensions array
        ...(apiProduct.dimensions.reduce((acc, dim) => {
          acc[dim.key] = dim.value;
          return acc;
        }, {} as Record<string, string | undefined>))
      },
      priceBreakup: {
        goldValue: apiProduct.price_breakup?.gold_value || 0,
        silverValue: apiProduct.price_breakup?.silver_value || 0,
        makingCharges: apiProduct.price_breakup?.making_charges || apiProduct.making_charges || 0,
        gemstoneValue: apiProduct.price_breakup?.gemstone_value || apiProduct.gemstone_value || 0,
        wastage: apiProduct.price_breakup?.wastage || apiProduct.wastage || 0,
        gst: apiProduct.price_breakup?.gst || 0,
        total: apiProduct.price_breakup?.total || apiProduct.cached_price || apiProduct.dynamic_price || 0
      }
    };
  };

  // Determine if this is a category or product page
  useEffect(() => {
    const checkPageType = async () => {
      setLoading(true);

      // First check if it's a valid category
      if (VALID_CATEGORIES.has(category)) {
        setIsProductPage(false);
        setLoading(false);
        return;
      }

      // If not a category, try to fetch as a product from API only
      try {
        const response = await api.get(`/products/${category}`, { requiresAuth: false });
        
        // Check if API returned success and has data
        if (response && response.success && response.data) {
          const transformedProduct = transformApiProduct(response.data);
          setProduct(transformedProduct);
          setIsProductPage(true);
          setLoading(false);
          return;
        }
        
        // If API returned 404 or no data, show loading (will show 404 page)
        if (response && response.status === 404) {
          setLoading(false);
          return;
        }
      } catch (apiError: any) {

        setLoading(false);
        return;
      }

      // If we reach here, product not found
      setLoading(false);
    };

    checkPageType();
  }, [category]);

  const handleZoomChange = (isZoomed: boolean, position: { x: number; y: number }, imageUrl: string) => {
    setZoomData({ isZoomed, position, imageUrl });
  };

  // Loading state
  if (loading) {
    const ProductDetailSkeleton = require('@/components/skeletons/ProductDetailSkeleton').default;
    return (
      <>
        <Header />
        <ProductDetailSkeleton />
        <Footer />
      </>
    );
  }

  // Product Detail Page
  if (isProductPage && product) {
    return (
      <>
        <Header />
        
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3 sm:py-4 overflow-hidden">
          <div className="w-[95%] sm:w-[90%] mx-auto px-2 xs:px-3 sm:px-4 max-w-[100vw]">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
              <a href="/" className="hover:text-[#B8941E] transition flex-shrink-0">Home</a>
              <span className="flex-shrink-0">•</span>
              <a href="/products" className="hover:text-[#B8941E] transition flex-shrink-0">Products</a>
              <span className="flex-shrink-0">•</span>
              <span className="text-gray-900 truncate">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Section - Only Image Gallery and Product Info */}
        <div className="w-[90%] mx-auto px-2 xs:px-3 sm:px-4 py-4 xs:py-6 sm:py-8 max-w-[100vw]">
          <div className="lg:flex lg:gap-4 xl:gap-6 2xl:gap-8 mb-6 sm:mb-8">
            {/* Left: Image Gallery - Sticky only for this section */}
            <div className="lg:w-1/2">
              <div className="lg:sticky lg:top-4">
                <ProductImageGallery 
                  images={product.images} 
                  productName={product.name}
                  productId={product.id}
                  productPrice={product.price}
                  productKarat={product.karat}
                  onZoomChange={handleZoomChange}
                />
              </div>
            </div>

            {/* Right: Product Info - Scrollable */}
            <div className="lg:w-1/2 mt-6 lg:mt-0">
              <div className="relative">
                <ProductInfo product={product} />
                
                {/* Zoom Preview Overlay */}
                {zoomData.isZoomed && (
                  <div className="absolute inset-0 aspect-square rounded-lg overflow-hidden bg-white border-2 border-gray-300 z-10 hidden xl:block">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `url(${zoomData.imageUrl})`,
                        backgroundSize: '200%',
                        backgroundPosition: `${zoomData.position.x}% ${zoomData.position.y}%`,
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details Section - Full Width, Normal Scroll */}
          <div className="overflow-hidden">
            {/* Horizontal Line */}
            <div className="border-t border-gray-200 mb-6 sm:mb-8"></div>

            {/* Product Details */}
            <div className="mb-6 sm:mb-8">
              <ProductDetails 
                productInfo={product.productInfo}
                metalDimensions={product.metalDimensions}
                features={product.features}
                information={product.information}
              />
            </div>

            {/* Horizontal Line */}
            <div className="border-t border-gray-200 mb-6 sm:mb-8"></div>

            {/* Price Breakup */}
            <div className="mb-6 sm:mb-8">
              <PriceBreakup priceBreakup={product.priceBreakup} />
            </div>

            {/* Delivery & Returns */}
            <div className="mb-6 sm:mb-8">
              <DeliveryReturns />
            </div>

            {/* Similar Products */}
            <div>
              <SimilarProducts currentProductSlug={product.slug} category={product.category} />
            </div>
          </div>
        </div>

        {/* Common Sections */}
        <div className="pt-4 pb-12 md:pb-16 bg-white">
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

  // Category Page (existing functionality)
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
        className="relative h-[200px] bg-gradient-to-r from-[#2a2420] to-[#3E2723] flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#2a2420]/70 to-[#3E2723]/70" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">{categoryName}</h1>
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
                selectedMetalTypes={category === 'all' ? selectedMetalTypes : undefined}
                onMetalTypesChange={category === 'all' ? setSelectedMetalTypes : undefined}
                isCustomizable={isCustomizable}
                onCustomizableChange={setIsCustomizable}
                isFeatured={isFeatured}
                onFeaturedChange={setIsFeatured}
              />
            </aside>

            {/* Products Area */}
            <main className="lg:w-3/4">
              {/* Product Grid/List */}
              <ProductGrid 
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                selectedCategory={category}
                searchQuery=""
                sortBy={sortBy}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                priceRange={priceRange}
                selectedCarat={selectedCarat}
                selectedMetalTypes={selectedMetalTypes}
                isCustomizable={isCustomizable}
                isFeatured={isFeatured}
              />
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
