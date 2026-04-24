'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromWishlist } from '@/store/slices/wishlistSlice';
import { addToCart } from '@/store/slices/cartSlice';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Toast from '@/components/Toast';
import Link from 'next/link';

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const { items = [] } = useAppSelector((state) => state.wishlist || { items: [] });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleRemove = (id: number) => {
    dispatch(removeFromWishlist(id));
    setToast({ message: 'Removed from wishlist', type: 'info' });
  };

  const handleAddToCart = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      karat: item.karat,
      image: item.image,
    }));
    setToast({ message: 'Added to cart!', type: 'success' });
  };

  return (
    <>
      <Header />
      
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className={`bg-gray-50 py-6 xs:py-8 sm:py-10 md:py-12 ${items.length === 0 ? 'pb-12 xs:pb-16 sm:pb-20' : 'min-h-screen'}`}>
        <div className="w-[90%] mx-auto">
          {/* Breadcrumb */}
          <div className="mb-4 xs:mb-5 sm:mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <a href="/" className="hover:text-[#B8941E] transition">Home</a>
              <span>•</span>
              <span className="text-gray-900">Wishlist</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4 xs:mb-6 sm:mb-8">
            <h1 className="text-2xl xs:text-2xl sm:text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-sm xs:text-base text-gray-600">{items.length} items</p>
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-6 xs:p-8 sm:p-10 md:p-12 text-center">
              <Heart className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 xs:mb-4" />
              <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-sm xs:text-base text-gray-600 mb-4 xs:mb-6">Save your favorite items here!</p>
              <a
                href="/products"
                className="inline-block bg-[#B8941E] text-white px-6 xs:px-8 py-2.5 xs:py-3 rounded-lg text-sm xs:text-base font-semibold hover:bg-[#9a7a19] transition"
              >
                Explore Products
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((item) => {
                // Create product URL
                const productUrl = `/product/${item.id}?name=${encodeURIComponent(item.name)}&price=${item.price}&karat=${encodeURIComponent(item.karat)}`;
                
                return (
                  <Link
                    key={item.id}
                    href={productUrl}
                    className="bg-white rounded-lg overflow-hidden group block"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                      
                      {/* Remove Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemove(item.id);
                        }}
                        className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition z-10"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>

                      {/* Add to Cart Button - Shows on Hover */}
                      <div className="absolute bottom-0 left-0 right-0 pb-3 flex justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0">
                        <button
                          onClick={(e) => handleAddToCart(e, item)}
                          className="w-[90%] bg-white text-gray-800 py-3 font-medium hover:bg-[#B8941E] hover:text-white transition flex items-center justify-center gap-2 rounded shadow-lg"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          <span>Add to Cart</span>
                        </button>
                      </div>

                      {/* Badge */}
                      <div className="absolute top-3 left-3 bg-[#B8941E] text-white text-xs font-bold px-3 py-1 rounded-full">
                        SAVED
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <p className="text-xs text-[#B8941E] font-medium mb-1">{item.karat}</p>
                      <h3 className="font-bold text-base mb-2 text-gray-900 line-clamp-2 group-hover:text-[#B8941E] transition">
                        {item.name}
                      </h3>
                      <p className="text-lg font-bold text-gray-900">
                        ₹ {item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
