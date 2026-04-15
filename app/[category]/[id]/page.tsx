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

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [zoomData, setZoomData] = useState<{ isZoomed: boolean; position: { x: number; y: number }; imageUrl: string }>({
    isZoomed: false,
    position: { x: 0, y: 0 },
    imageUrl: '',
  });

  // Fetch product data based on id (can be slug or numeric id)
  useEffect(() => {
    setLoading(true);
    
    // Try to get product by slug first, then by ID
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
      console.log('Generated dummy product for:', id, { name, price, karat });
    }

    setProduct(foundProduct);
    setLoading(false);
  }, [id]);

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
      <div className="bg-gray-50 py-4">
        <div className="w-[90%] mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-[#B8941E] transition">Home</a>
            <span>•</span>
            <a href={`/${product.category}`} className="hover:text-[#B8941E] transition">{categoryName}</a>
            <span>•</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="w-[90%] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
        <div className="border-t border-gray-200 mb-8"></div>

        {/* Product Details */}
        <div className="mb-8">
          <ProductDetails 
            productInfo={product.productInfo}
            metalDimensions={product.metalDimensions}
          />
        </div>

        {/* Horizontal Line */}
        <div className="border-t border-gray-200 mb-8"></div>

        {/* Price Breakup */}
        <div className="mb-8">
          <PriceBreakup priceBreakup={product.priceBreakup} />
        </div>

        {/* Delivery & Returns */}
        <div className="mb-8">
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
