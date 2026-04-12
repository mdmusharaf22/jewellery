'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Heart, Eye, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import Toast from '@/components/Toast';

interface ProductGridProps {
  viewMode: 'grid' | 'list';
  selectedCategory: string;
  searchQuery: string;
  sortBy: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function ProductGrid({
  viewMode,
  selectedCategory,
  searchQuery,
  sortBy,
  currentPage,
  onPageChange,
}: ProductGridProps) {
  const gridTopRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Scroll to top when page changes
  useEffect(() => {
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  // Sample products data - expanded with more products for each category
  const allProducts = [
    // TALI products
    { id: 1, name: 'Traditional Tali Design', price: 125000, karat: '22KT Gold', category: 'tali', slug: 'traditional-tali-design', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600' },
    { id: 2, name: 'Modern Tali Pendant', price: 98000, karat: '22KT Gold', category: 'tali', slug: 'modern-tali-pendant', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600' },
    { id: 3, name: 'Antique Tali', price: 145000, karat: '22KT Gold', category: 'tali', slug: 'antique-tali', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600' },
    
    // TALI CHAIN products
    { id: 4, name: 'Gold Tali Chain', price: 125000, karat: '22KT Gold', category: 'tali-chain', slug: 'gold-tali-chain', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600' },
    { id: 5, name: 'Designer Tali Chain', price: 135000, karat: '22KT Gold', category: 'tali-chain', slug: 'designer-tali-chain', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600' },
    
    // Necklace products
    { id: 6, name: 'Lakshmi Bridal Choker', price: 218000, karat: '22KT Gold', category: 'necklace', slug: 'lakshmi-bridal-choker', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600' },
    { id: 7, name: 'Diamond Pendant Set', price: 145000, karat: '18KT Gold', category: 'necklace', slug: 'diamond-pendant-set', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600' },
    { id: 8, name: 'Temple Necklace', price: 185000, karat: '22KT Gold', category: 'necklace', slug: 'temple-necklace', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600' },
    
    // Bangles products
    { id: 9, name: 'Antique Bangle Set', price: 95000, karat: '22KT Gold', category: 'bangles', slug: 'antique-bangle-set', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600' },
    { id: 10, name: 'Designer Bangles', price: 115000, karat: '22KT Gold', category: 'bangles', slug: 'designer-bangles', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600' },
    
    // Stud products
    { id: 11, name: 'Gold Earrings', price: 55000, karat: '22KT Gold', category: 'stud', slug: 'gold-earrings', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600' },
    { id: 12, name: 'Diamond Studs', price: 75000, karat: '18KT Gold', category: 'stud', slug: 'diamond-studs', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600' },
    
    // Gold Jhumkas products
    { id: 13, name: 'Temple Jhumka Pair', price: 86500, karat: '22KT Gold', category: 'gold-jhumkas', slug: 'temple-jhumka-pair', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600' },
    { id: 14, name: 'Antique Jhumkas', price: 92000, karat: '22KT Gold', category: 'gold-jhumkas', slug: 'antique-jhumkas', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600' },
    
    // Gold Ring products
    { id: 15, name: 'Gold Ring Set', price: 45000, karat: '18KT Gold', category: 'gold-ring', slug: 'gold-ring-set', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600' },
    { id: 16, name: 'Designer Gold Ring', price: 52000, karat: '22KT Gold', category: 'gold-ring', slug: 'designer-gold-ring', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600' },
    
    // Silver products
    { id: 17, name: 'Silver Pooja Gift Set', price: 14800, karat: '999 Silver', category: 'all', slug: 'silver-pooja-gift-set', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600' },
    { id: 18, name: 'Silver Anklet', price: 8500, karat: '925 Silver', category: 'anklet', slug: 'silver-anklet', image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600' },
    { id: 19, name: 'Silver Bracelet', price: 12000, karat: '925 Silver', category: 'bracelet', slug: 'silver-bracelet', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=600' },
    { id: 20, name: 'Silver Ring', price: 6500, karat: '925 Silver', category: 'ring', slug: 'silver-ring', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600' },
  ];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' || selectedCategory === 'gold' || selectedCategory === 'silver'
    ? allProducts
    : allProducts.filter(product => product.category === selectedCategory);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const ProductCard = ({ product }: { product: typeof allProducts[0] }) => {
    const [isHovered, setIsHovered] = useState(false);
    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        karat: product.karat,
        image: product.image,
      });
      setToast({ message: 'Added to cart!', type: 'success' });
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (inWishlist) {
        removeFromWishlist(product.id);
        setToast({ message: 'Removed from wishlist', type: 'info' });
      } else {
        addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          karat: product.karat,
          image: product.image,
        });
        setToast({ message: 'Added to wishlist!', type: 'success' });
      }
    };

    if (viewMode === 'list') {
      return (
        <a
          href={`/products/${product.category}/${product.slug}`}
          className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 group flex flex-col sm:flex-row gap-6 p-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image */}
          <div className="relative w-full sm:w-80 h-80 flex-shrink-0 overflow-hidden bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
            
            {/* Hover Actions - Positioned at bottom left */}
            <div className={`absolute bottom-4 left-4 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              <button 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#B8941E] hover:text-white transition shadow-lg"
                onClick={(e) => e.stopPropagation()}
                title="Quick View"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg ${
                  inWishlist 
                    ? 'bg-[#B8941E] text-white' 
                    : 'bg-white text-gray-700 hover:bg-[#B8941E] hover:text-white'
                }`}
                onClick={handleToggleWishlist}
                title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className="w-4 h-4" fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
              <button 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#B8941E] hover:text-white transition shadow-lg"
                onClick={handleAddToCart}
                title="Add to Cart"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center py-4">
            <h3 className="text-2xl font-normal text-[#D4A574] mb-4 group-hover:text-[#B8941E] transition">
              {product.name}
            </h3>
            <p className="text-3xl font-normal text-gray-800 mb-6">
              ${product.price.toLocaleString('en-IN')}
            </p>
            
            {/* Size Options */}
            <div className="flex gap-2 mb-6">
              <button className="w-12 h-12 border-2 border-gray-300 hover:border-[#B8941E] rounded flex items-center justify-center text-sm font-medium transition">
                S
              </button>
              <button className="w-12 h-12 border-2 border-gray-300 hover:border-[#B8941E] rounded flex items-center justify-center text-sm font-medium transition">
                L
              </button>
              <button className="w-12 h-12 border-2 border-gray-300 hover:border-[#B8941E] rounded flex items-center justify-center text-sm font-medium transition">
                M
              </button>
            </div>
          </div>
        </a>
      );
    }

    // Grid View
    return (
      <a
        href={`/products/${product.category}/${product.slug}`}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-xs transition-all duration-300 group cursor-pointer block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            unoptimized
          />
          
          {/* Hover Overlay with Actions */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button 
              className="w-11 h-11 bg-white rounded-full flex items-center justify-center hover:bg-[#B8941E] hover:text-white transition transform hover:scale-110"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              title="Quick View"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button 
              className={`w-11 h-11 rounded-full flex items-center justify-center transition transform hover:scale-110 ${
                inWishlist 
                  ? 'bg-[#B8941E] text-white' 
                  : 'bg-white text-gray-700 hover:bg-[#B8941E] hover:text-white'
              }`}
              onClick={handleToggleWishlist}
              title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className="w-5 h-5" fill={inWishlist ? 'currentColor' : 'none'} />
            </button>
            <button 
              className="w-11 h-11 bg-white rounded-full flex items-center justify-center hover:bg-[#B8941E] hover:text-white transition transform hover:scale-110"
              onClick={handleAddToCart}
              title="Add to Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

          {/* Badge */}
          <div className="absolute top-3 left-3 bg-[#B8941E] text-white text-xs font-bold px-3 py-1 rounded-full">
            NEW
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-xs text-[#B8941E] font-medium mb-1">{product.karat}</p>
          <h3 className="font-bold text-base mb-2 text-[#1a1a1a] group-hover:text-[#B8941E] transition line-clamp-2">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-[#1a1a1a]">
            ₹ {product.price.toLocaleString('en-IN')}
          </p>
        </div>
      </a>
    );
  };

  return (
    <div>
      {/* Scroll anchor */}
      <div ref={gridTopRef} className="absolute -top-24" />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{startIndex + 1}-{Math.min(endIndex, filteredProducts.length)}</span> of <span className="font-semibold">{filteredProducts.length}</span> Results
        </p>
      </div>

      {/* Products Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'
        : 'flex flex-col gap-6 mb-12'
      }>
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination - Footer Style */}
      <div className="border-t border-gray-200 pt-8 pb-4">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-[#B8941E] hover:text-white hover:border-[#B8941E] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => onPageChange(index + 1)}
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
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-[#B8941E] hover:text-white hover:border-[#B8941E] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
