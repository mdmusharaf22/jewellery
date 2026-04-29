'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductImageGallery from '@/components/product-detail/ProductImageGallery';
import ProductInfo from '@/components/product-detail/ProductInfo';
import ProductDetails from '@/components/product-detail/ProductDetails';
import PriceBreakup from '@/components/product-detail/PriceBreakup';
import DeliveryReturns from '@/components/product-detail/DeliveryReturns';
import SimilarProducts from '@/components/product-detail/SimilarProducts';
import TrustBadges from '@/components/product-detail/TrustBadges';
import Testimonials from '@/components/Testimonials';
import { getProductBySlug, getProductById, type Product } from '@/lib/productData';
import { generateDummyProduct } from '@/lib/dummyProductGenerator';
import { api } from '@/lib/api';

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

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

    return {
      id: apiProduct.id,
      name: apiProduct.name,
      slug: apiProduct.slug,
      price: apiProduct.cached_price || apiProduct.dynamic_price || 0,
      karat: apiProduct.metal_type === 'gold' ? '22KT Gold' : 'Silver',
      category: category || 'products',
      images,
      description: apiProduct.description || apiProduct.short_description || '',
      purityOptions: apiProduct.metal_type === 'gold' ? ['22KT (916)', '18KT'] : ['999 Silver'],
      lengthOptions: apiProduct.length && apiProduct.length.length > 0 
        ? apiProduct.length.map(l => `${l} inches`) 
        : ['Standard'],
      productInfo: {
        weight: `${apiProduct.base_weight}g`,
        purity: apiProduct.metal_type === 'gold' ? '22KT' : '925 Silver',
        certification: 'BIS Hallmark',
        warranty: '1 Year',
        ...(apiProduct.information.reduce((acc, info) => {
          acc[info.key] = info.value;
          return acc;
        }, {} as Record<string, string>))
      },
      metalDimensions: apiProduct.dimensions.reduce((acc, dim) => {
        acc[dim.key] = dim.value;
        return acc;
      }, {} as Record<string, string>),
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

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        // First try to fetch from API using slug
        const response = await api.get(`/products/${id}`, { requiresAuth: false });
        
        if (response.success && response.data) {
          const transformedProduct = transformApiProduct(response.data);
          setProduct(transformedProduct);
          return;
        }
      } catch (apiError) {

        // Continue to fallback methods
      }

      // Fallback to local data
      let foundProduct = getProductBySlug(id);
      if (!foundProduct && !isNaN(Number(id))) {
        foundProduct = getProductById(id);
      }

      // If product not found in database, try to extract data from URL or generate dummy
      if (!foundProduct) {
        // Try to get product data from URL search params
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name');
        const priceStr = urlParams.get('price');
        const karat = urlParams.get('karat');
        
        const price = priceStr ? parseFloat(priceStr.replace(/,/g, '')) : undefined;
        
        foundProduct = generateDummyProduct(id, name || undefined, price, karat || undefined);

      }

      setProduct(foundProduct);
    };

    fetchProduct().finally(() => setLoading(false));
  }, [id, category]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8941E] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => router.back()}
              className="bg-[#B8941E] text-white px-6 py-2 rounded-lg hover:bg-[#A67C00] transition"
            >
              Go Back
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return null;
  }

  // Format category name for display
  const categoryName = product.category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const handleZoomChange = (isZoomed: boolean, position: { x: number; y: number }, imageUrl: string) => {
    setZoomData({ isZoomed, position, imageUrl });
  };

  return (
    <>
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 sm:py-4 overflow-hidden">
        <div className="w-[95%] sm:w-[90%] mx-auto px-2 xs:px-3 sm:px-4 max-w-[100vw]">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
            <a href="/" className="hover:text-[#B8941E] transition flex-shrink-0">Home</a>
            <span className="flex-shrink-0">•</span>
            <a href={`/${product.category}`} className="hover:text-[#B8941E] transition flex-shrink-0">{categoryName}</a>
            <span className="flex-shrink-0">•</span>
            <span className="text-gray-900 truncate">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="w-[90%] mx-auto px-2 xs:px-3 sm:px-4 py-4 xs:py-6 sm:py-8 max-w-[100vw] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Left: Image Gallery - Sticky */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            <ProductImageGallery 
              images={product.images} 
              productName={product.name}
              productId={product.id}
              productPrice={product.price}
              productKarat={product.karat}
              onZoomChange={handleZoomChange}
            />
          </div>

          {/* Right: Product Info or Zoom Preview */}
          <div className="relative">
            {/* Product Info - Always rendered */}
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

        {/* Horizontal Line */}
        <div className="border-t border-gray-200 mb-6 sm:mb-8"></div>

        {/* Product Details */}
        <div className="mb-6 sm:mb-8">
          <ProductDetails 
            productInfo={product.productInfo}
            metalDimensions={product.metalDimensions}
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
