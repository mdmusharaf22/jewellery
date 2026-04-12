'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import Toast from './Toast';

export default function NewArrivals() {
  const [activeTab, setActiveTab] = useState('All');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const tabs = ['All', 'Gold', 'Silver', 'Bridal'];

  const handleToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  const products = [
    { id: 1, name: 'Lakshmi Bridal Choker', price: '2,18,000', karat: '22KT Gold', category: 'Bridal', slug: 'lakshmi-bridal-choker', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop&q=80' },
    { id: 2, name: 'Temple Jhumka Pair', price: '86,500', karat: '22KT Gold', category: 'Gold', slug: 'temple-jhumka-pair', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop&q=80' },
    { id: 3, name: 'Silver Pooja Gift Set', price: '14,800', karat: '999 Silver', category: 'Silver', slug: 'silver-pooja-gift-set', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=600&fit=crop&q=80' },
    { id: 4, name: 'Festival Gold Coin', price: '39,950', karat: '24KT Gold', category: 'Gold', slug: 'festival-gold-coin', image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&h=600&fit=crop&q=80' },
    { id: 5, name: 'Bridal Necklace Set', price: '2,18,000', karat: '22KT Gold', category: 'Bridal', slug: 'bridal-necklace-set', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&q=80' },
    { id: 6, name: 'Gold Jhumka', price: '86,500', karat: '22KT Gold', category: 'Gold', slug: 'gold-jhumka', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&h=600&fit=crop&q=80' },
    { id: 7, name: 'Silver Bowl Set', price: '14,800', karat: '999 Silver', category: 'Silver', slug: 'silver-bowl-set', image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&h=600&fit=crop&q=80' },
    { id: 8, name: 'Gold Bangle', price: '39,950', karat: '24KT Gold', category: 'Gold', slug: 'gold-bangle', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=600&h=600&fit=crop&q=80' },
  ];

  const filteredProducts = activeTab === 'All' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section className="bg-white">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

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
                className={`px-5 py-2 rounded-full font-medium text-sm transition cursor-pointer ${
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
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                karat: product.karat,
                image: product.image,
                slug: product.slug,
                category: product.category,
              }}
              viewMode="grid"
              onToast={handleToast}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

