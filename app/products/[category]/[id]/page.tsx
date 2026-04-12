'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductImageGallery from '@/components/product-detail/ProductImageGallery';
import ProductInfo from '@/components/product-detail/ProductInfo';
import ProductFeatures from '@/components/product-detail/ProductFeatures';
import ProductDetails from '@/components/product-detail/ProductDetails';
import PriceBreakup from '@/components/product-detail/PriceBreakup';
import DeliveryReturns from '@/components/product-detail/DeliveryReturns';
import SimilarProducts from '@/components/product-detail/SimilarProducts';
import TrustBadges from '@/components/product-detail/TrustBadges';
import Testimonials from '@/components/Testimonials';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Mock product data - replace with API call based on slug
  const product = {
    id: 1,
    slug: 'lakshmi-bridal-choker',
    name: 'Lakshmi Bridal Choker',
    category: '22KT GOLD COLLECTION',
    price: 218000,
    karat: '22KT Gold',
    description: 'An intricately designed temple jewellery choker featuring the goddess Lakshmi motif, complemented by delicate ruby and emerald accents. Handcrafted to perfection, this piece brings a timeless elegance to any bridal ensemble or festive occasion.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800',
    ],
    purityOptions: ['22KT (916)', '18KT'],
    lengthOptions: ['14 inches', '16 inches'],
    productInfo: {
      code: 'NK-BRD-8942',
      type: 'Necklace',
      occasion: 'Bridal, Festive',
      collection: 'Temple Heritage',
    },
    metalDimensions: {
      metalColor: 'Yellow',
      purity: '22KT (916)',
      grossWeight: '45.500 g',
      netWeight: '42.850 g',
      length: '14 Inches (Adjustable)',
    },
    priceBreakup: {
      goldValue: 178950,
      makingCharges: 25700,
      gemstoneValue: 8650,
      wastage: 2300,
      gst: 2400,
      total: 218000,
    },
  };

  return (
    <>
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-[#B8941E] transition">Home</a>
            <span>{'>'}</span>
            <a href="/products/all" className="hover:text-[#B8941E] transition">Gold</a>
            <span>{'>'}</span>
            <a href="/products/necklace" className="hover:text-[#B8941E] transition">Necklaces</a>
            <span>{'>'}</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left: Image Gallery */}
          <ProductImageGallery images={product.images} productName={product.name} />

          {/* Right: Product Info */}
          <ProductInfo product={product} />
        </div>

        {/* Features */}
        <ProductFeatures />

        {/* Product Details */}
        <ProductDetails 
          productInfo={product.productInfo}
          metalDimensions={product.metalDimensions}
        />

        {/* Price Breakup */}
        <PriceBreakup priceBreakup={product.priceBreakup} />

        {/* Delivery & Returns */}
        <DeliveryReturns />

        {/* Similar Products */}
        <SimilarProducts currentProductSlug={product.slug} category="necklace" />
      </div>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Testimonials - with proper spacing like home page */}
      <div className="py-16 md:py-20">
        <Testimonials />
      </div>

      <Footer />
    </>
  );
}
