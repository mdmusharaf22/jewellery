'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrustBadges from '@/components/product-detail/TrustBadges';
import Testimonials from '@/components/Testimonials';
import ProductImageGallery from '@/components/product-detail/ProductImageGallery';
import ProductInfo from '@/components/product-detail/ProductInfo';
import ProductDetails from '@/components/product-detail/ProductDetails';
import PriceBreakup from '@/components/product-detail/PriceBreakup';
import DeliveryReturns from '@/components/product-detail/DeliveryReturns';
import SimilarProducts from '@/components/product-detail/SimilarProducts';
import { api } from '@/lib/api';

// Define Product type
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
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Transform API product to local Product format
  const transformApiProduct = (apiProduct: ApiProduct): Product => {
    // Find primary image or use first image
    let primaryImage = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop&q=80';
    
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
      id: parseInt(apiProduct.id) || Math.floor(Math.random() * 10000),
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
        ...(apiProduct.information.reduce((acc, info) => {
          acc[info.key] = info.value;
          return acc;
        }, {} as Record<string, string | undefined>))
      },
      metalDimensions: {
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

  // Fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/products/${slug}`, { requiresAuth: false });
        
        if (response && response.success && response.data) {
          const transformedProduct = transformApiProduct(response.data);
          setProduct(transformedProduct);
        }
      } catch (error: any) {
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

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

  // Product not found
  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <a href="/" className="bg-[#B8941E] text-white px-6 py-3 rounded-lg hover:bg-[#9a7a18] transition">
              Go to Home
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Product Detail Page
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

      {/* Product Section */}
      <div className="w-[90%] mx-auto px-2 xs:px-3 sm:px-4 py-4 xs:py-6 sm:py-8 max-w-[100vw]">
        <div className="lg:flex lg:gap-4 xl:gap-6 2xl:gap-8 mb-6 sm:mb-8">
          {/* Left: Image Gallery */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-4">
              <ProductImageGallery 
                images={product.images} 
                productName={product.name}
                productId={product.id}
                productPrice={product.price}
                productKarat={product.karat}
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:w-1/2 mt-6 lg:mt-0">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="overflow-hidden">
          <div className="border-t border-gray-200 mb-6 sm:mb-8"></div>

          <div className="mb-6 sm:mb-8">
            <ProductDetails 
              productInfo={product.productInfo}
              metalDimensions={product.metalDimensions}
              features={product.features}
              information={product.information}
            />
          </div>

          <div className="border-t border-gray-200 mb-6 sm:mb-8"></div>

          <div className="mb-6 sm:mb-8">
            <PriceBreakup priceBreakup={product.priceBreakup} />
          </div>

          <div className="mb-6 sm:mb-8">
            <DeliveryReturns />
          </div>

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
