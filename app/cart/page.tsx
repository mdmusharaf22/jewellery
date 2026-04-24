'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items = [], total = 0 } = useAppSelector((state) => state.cart || { items: [], total: 0 });
  const [couponCode, setCouponCode] = useState('');

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    router.push('/checkout');
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

          {items.length === 0 ? (
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
                            onClick={() => handleRemove(item.id)}
                            className="text-red-500 hover:text-red-700 transition flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4 xs:w-5 xs:h-5" />
                          </button>
                        </div>

                        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-3 mt-2 xs:mt-3 sm:mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 xs:gap-3">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-7 h-7 xs:w-8 xs:h-8 border-2 border-gray-300 rounded flex items-center justify-center hover:border-[#B8941E] transition"
                            >
                              <Minus className="w-3 h-3 xs:w-4 xs:h-4" />
                            </button>
                            <span className="w-8 xs:w-12 text-center font-semibold text-sm xs:text-base">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
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
                    className="w-full bg-[#B8941E] text-white py-2.5 xs:py-3 rounded-lg text-sm xs:text-base font-semibold hover:bg-[#9a7a19] transition mb-2 xs:mb-3"
                  >
                    Proceed to Checkout
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
