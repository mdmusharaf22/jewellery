'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity, fetchCart, updateCartItemAsync, removeFromCartAsync } from '@/store/slices/cartSlice';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items = [], total = 0, loading = false } = useAppSelector((state) => state.cart || { items: [], total: 0, loading: false });
  const isAuthenticated = useAppSelector((state) => state.auth?.isAuthenticated || false);
  const [couponCode, setCouponCode] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Log cart state on mount
  useEffect(() => {
    console.log('[Cart Page] ========== CART PAGE MOUNTED ==========');
    console.log('[Cart Page] Cart state:', {
      itemCount: items.length,
      total,
      isAuthenticated,
      items: items.map(item => ({ 
        id: item.id, 
        cart_item_id: item.cart_item_id,
        name: item.name, 
        quantity: item.quantity 
      }))
    });
    console.log('[Cart Page] ==========================================');
  }, [items, total, isAuthenticated]);

  // Fetch cart from API on mount if authenticated
  useEffect(() => {
    console.log('[Cart Page] ========== FETCH CHECK ==========');
    console.log('[Cart Page] isAuthenticated:', isAuthenticated);
    
    if (isAuthenticated) {
      // Always fetch cart from API when authenticated to ensure we have cart_item_id
      console.log('[Cart Page] ✅ Fetching cart from API...');
      dispatch(fetchCart())
        .unwrap()
        .then(() => {
          console.log('[Cart Page] ✅ Cart fetched successfully');
        })
        .catch((error) => {
          console.error('[Cart Page] ❌ Failed to fetch cart:', error);
        });
    } else {
      console.log('[Cart Page] ⚠️  User is guest, using local cart');
    }
    console.log('[Cart Page] ====================================');
  }, [isAuthenticated, dispatch]); // Remove initialized from dependencies and don't use it

  const handleQuantityChange = async (item: any, newQuantity: number) => {
    if (newQuantity >= 1) {
      if (isAuthenticated && item.cart_item_id) {
        // Use API for authenticated users
        try {
          await dispatch(updateCartItemAsync({ 
            cartItemId: item.cart_item_id, 
            quantity: newQuantity 
          })).unwrap();
        } catch (error) {
          console.error('Failed to update quantity:', error);
        }
      } else {
        // Use local storage for guest users
        dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
      }
    }
  };

  const handleRemove = async (item: any) => {
    console.log('[Cart Page] Remove item clicked:', {
      itemId: item.id,
      cartItemId: item.cart_item_id,
      isAuthenticated,
      name: item.name
    });
    
    if (isAuthenticated && item.cart_item_id) {
      // Use API for authenticated users
      console.log('[Cart Page] Removing via API with cart_item_id:', item.cart_item_id);
      try {
        await dispatch(removeFromCartAsync(item.cart_item_id)).unwrap();
        console.log('[Cart Page] Item removed successfully via API');
      } catch (error) {
        console.error('[Cart Page] Failed to remove item:', error);
      }
    } else {
      // Use local storage for guest users
      console.log('[Cart Page] Removing from guest cart with id:', item.id);
      dispatch(removeFromCart(item.id));
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    try {
      // Call the /customers/auth/me API if user is authenticated
      if (isAuthenticated) {
        const token = localStorage.getItem('customer_token');
        const API = process.env.NEXT_PUBLIC_API_BASE_URL;
        
        const response = await fetch(`${API}/customers/auth/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        
        if (data.success && data.data?.profile) {
          // Update local storage with fresh profile data
          const authData = localStorage.getItem('auth');
          if (authData) {
            const parsed = JSON.parse(authData);
            parsed.user = { ...parsed.user, ...data.data.profile };
            localStorage.setItem('auth', JSON.stringify(parsed));
          }
          
          console.log('[Cart] Profile fetched successfully before checkout');
        }
      }
      
      // Navigate to checkout
      router.push('/checkout');
    } catch (error) {
      console.error('[Cart] Failed to fetch profile:', error);
      // Still navigate to checkout even if API fails
      router.push('/checkout');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const subtotal = total;
  const shipping = subtotal > 50000 ? 0 : 500;
  const tax = Math.round(subtotal * 0.03);
  const finalTotal = subtotal + shipping + tax;

  return (
    <>
      <Header />
      
      <div className={`bg-gray-50 py-6 xs:py-8 sm:py-10 md:py-12 ${items.length === 0 ? 'pb-12 xs:pb-16 sm:pb-20' : 'pb-8 xs:pb-10 sm:pb-12 md:pb-16'}`}>
        <div className="w-[90%] mx-auto">
          {/* Breadcrumb */}
          <div className="mb-4 xs:mb-5 sm:mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <a href="/" className="hover:text-[#B8941E] transition">Home</a>
              <span>•</span>
              <span className="text-gray-900">Shopping Cart</span>
            </div>
          </div>

          <h1 className="text-2xl xs:text-2xl sm:text-3xl font-bold text-gray-900 mb-4 xs:mb-6 sm:mb-8">Shopping Cart</h1>

          {loading ? (
            (() => {
              const CartSkeleton = require('@/components/skeletons/CartSkeleton').default;
              return <CartSkeleton />;
            })()
          ) : items.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-6 xs:p-8 sm:p-10 md:p-12 text-center">
              <ShoppingBag className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 xs:mb-4" />
              <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-sm xs:text-base text-gray-600 mb-4 xs:mb-6">Add some beautiful jewelry to your cart!</p>
              <a
                href="/products"
                className="inline-block bg-[#B8941E] text-white px-6 xs:px-8 py-2.5 xs:py-3 rounded-lg text-sm xs:text-base font-semibold hover:bg-[#9a7a19] transition"
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm p-3 xs:p-4 sm:p-6">
                    <div className="flex gap-3 xs:gap-4 sm:gap-6">
                      {/* Product Image */}
                      <div className="relative w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-1 xs:mb-2">
                          <div className="flex-1 min-w-0 pr-2">
                            <p className="text-[10px] xs:text-xs text-[#B8941E] font-medium mb-0.5 xs:mb-1">{item.karat}</p>
                            <h3 className="font-bold text-sm xs:text-base sm:text-lg text-gray-900 line-clamp-2">{item.name}</h3>
                          </div>
                          <button
                            onClick={() => handleRemove(item)}
                            className="text-red-500 hover:text-red-700 transition flex-shrink-0 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4 xs:w-5 xs:h-5" />
                          </button>
                        </div>

                        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-3 mt-2 xs:mt-3 sm:mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 xs:gap-3">
                            <button
                              onClick={() => handleQuantityChange(item, item.quantity - 1)}
                              className="w-7 h-7 xs:w-8 xs:h-8 border-2 border-gray-300 rounded flex items-center justify-center hover:border-[#B8941E] transition"
                            >
                              <Minus className="w-3 h-3 xs:w-4 xs:h-4" />
                            </button>
                            <span className="w-8 xs:w-12 text-center font-semibold text-sm xs:text-base">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item, item.quantity + 1)}
                              className="w-7 h-7 xs:w-8 xs:h-8 border-2 border-gray-300 rounded flex items-center justify-center hover:border-[#B8941E] transition"
                            >
                              <Plus className="w-3 h-3 xs:w-4 xs:h-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-left xs:text-right">
                            <p className="text-base xs:text-lg sm:text-xl font-bold text-gray-900">
                              ₹ {(item.price * item.quantity).toLocaleString('en-IN')}                            </p>
                            {item.quantity > 1 && (
                              <p className="text-xs xs:text-sm text-gray-500">
                                ₹ {item.price.toLocaleString('en-IN')} each
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-4 xs:p-5 sm:p-6 sticky top-4">
                  <h2 className="text-lg xs:text-xl font-bold text-gray-900 mb-4 xs:mb-5 sm:mb-6">Order Summary</h2>

                  <div className="space-y-3 xs:space-y-3.5 sm:space-y-4 mb-4 xs:mb-5 sm:mb-6">
                    <div className="flex justify-between text-sm xs:text-base text-gray-600">
                      <span>Subtotal ({items.length} items)</span>
                      <span>₹ {subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm xs:text-base text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `₹ ${shipping.toLocaleString('en-IN')}`}</span>
                    </div>
                    <div className="flex justify-between text-sm xs:text-base text-gray-600">
                      <span>Tax (3%)</span>
                      <span>₹ {tax.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="border-t pt-3 xs:pt-3.5 sm:pt-4">
                      <div className="flex justify-between text-base xs:text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span>₹ {finalTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Coupon Code */}
                  <div className="mb-4 xs:mb-5 sm:mb-6">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon code"
                        className="flex-1 px-3 xs:px-4 py-2 text-sm xs:text-base border-2 border-gray-200 rounded focus:border-[#B8941E] focus:outline-none"
                      />
                      <button className="px-3 xs:px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm xs:text-base font-medium hover:bg-gray-300 transition">
                        Apply
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-[#B8941E] text-white py-2.5 xs:py-3 rounded-lg text-sm xs:text-base font-semibold hover:bg-[#9a7a19] transition mb-2 xs:mb-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Loading...</span>
                      </>
                    ) : (
                      'Proceed to Checkout'
                    )}
                  </button>

                  <a
                    href="/products"
                    className="block text-center text-[#B8941E] text-sm xs:text-base font-medium hover:underline"
                  >
                    Continue Shopping
                  </a>

                  {shipping > 0 && (
                    <div className="mt-4 xs:mt-5 sm:mt-6 p-3 xs:p-4 bg-blue-50 rounded-lg">
                      <p className="text-xs xs:text-sm text-blue-800">
                        Add ₹ {(50000 - subtotal).toLocaleString('en-IN')} more to get FREE shipping!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
