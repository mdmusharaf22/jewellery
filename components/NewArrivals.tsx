'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function NewArrivals() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Gold', 'Silver', 'Bridal'];

  const products = [
    { id: 1, name: 'Lakshmi Bridal Choker', price: '2,18,000', karat: '22KT Gold', category: 'Bridal', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop&q=80' },
    { id: 2, name: 'Temple Jhumka Pair', price: '86,500', karat: '22KT Gold', category: 'Gold', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop&q=80' },
    { id: 3, name: 'Silver Pooja Gift Set', price: '14,800', karat: '999 Silver', category: 'Silver', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=600&fit=crop&q=80' },
    { id: 4, name: 'Festival Gold Coin', price: '39,950', karat: '24KT Gold', category: 'Gold', image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&h=600&fit=crop&q=80' },
    { id: 5, name: 'Bridal Necklace Set', price: '2,18,000', karat: '22KT Gold', category: 'Bridal', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&q=80' },
    { id: 6, name: 'Gold Jhumka', price: '86,500', karat: '22KT Gold', category: 'Gold', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&h=600&fit=crop&q=80' },
    { id: 7, name: 'Silver Bowl Set', price: '14,800', karat: '999 Silver', category: 'Silver', image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&h=600&fit=crop&q=80' },
    { id: 8, name: 'Gold Bangle', price: '39,950', karat: '24KT Gold', category: 'Gold', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=600&h=600&fit=crop&q=80' },
  ];

  const filteredProducts = activeTab === 'All' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section className="py-16 md:py-20 bg-white">
      {/* Full width header */}
      <div className="px-4 lg:px-8">
        {/* Header with Tabs on Right */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#1a1a1a]">
              New Arrivals
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Fresh additions in gold and silver, selected for festive shopping and gifting
            </p>
          </div>

          {/* Tabs on Right */}
          <div className="flex gap-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full font-medium text-sm transition ${
                  activeTab === tab
                    ? 'bg-[#B8941E] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full width grid */}
      <div className="px-4 lg:px-8">
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="cursor-pointer group"
            >
              {/* Product Image with Heart Icon */}
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                
                {/* Heart/Wishlist Button */}
                <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-[#B8941E] hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Product Details */}
              <div>
                <p className="text-xs text-gray-500 mb-1">{product.karat}</p>
                <h3 className="font-semibold text-base mb-2 text-[#1a1a1a] group-hover:text-[#B8941E] transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-[#1a1a1a]">₹ {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
