'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearCart, fetchCart } from '@/store/slices/cartSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CreditCard, Truck, Shield, MapPin, User, Mail, Phone, Home } from 'lucide-react';

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items = [], total = 0 } = useAppSelector((state) => state.cart || { items: [], total: 0 });
  const { user = null, isAuthenticated = false } = useAppSelector((state) => state.auth || { user: null, isAuthenticated: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch cart on mount if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [isAuthenticated, dispatch]);

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically process the order via API
      console.log('Order submitted:', { formData, items, total });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear cart
      dispatch(clearCart());
      
      // Redirect to success page
      router.push('/order-success');
    } catch (error) {
      console.error('Order submission failed:', error);
      setIsSubmitting(false);
    }
  };

  const subtotal = total;
  const shipping = subtotal > 50000 ? 0 : 500;
  const tax = Math.round(subtotal * 0.03);
  const finalTotal = subtotal + shipping + tax;

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="w-[90%] mx-auto max-w-md text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Please Login</h1>
            <p className="text-gray-600 mb-6">You need to be logged in to checkout</p>
            <a
              href="/login"
              className="inline-block bg-[#B8941E] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#9a7a19] transition"
            >
              Login to Continue
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-10">
        <div className="w-[90%] max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <a href="/" className="hover:text-[#B8941E] transition">Home</a>
              <span>•</span>
              <a href="/cart" className="hover:text-[#B8941E] transition">Cart</a>
              <span>•</span>
              <span className="text-gray-900 font-medium">Checkout</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Secure Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Order Summary - Left Side (Desktop) / Top (Mobile) */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 lg:sticky lg:top-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#B8941E]" />
                    Order Summary
                  </h2>

                  {/* Cart Items */}
                  <div className="space-y-4 mb-5 sm:mb-6 max-h-64 overflow-y-auto pr-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                          <div className="absolute -top-2 -right-2 bg-[#B8941E] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">{item.name}</h3>
                          <p className="text-xs text-gray-500 mb-1">{item.karat}</p>
                          <p className="text-sm font-bold text-[#B8941E]">
                            ₹ {(item.price * item.quantity).toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t border-gray-200 pt-4 space-y-3 mb-5 sm:mb-6">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                      <span className="font-medium">₹ {subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Shipping</span>
                      <span className="font-medium">{shipping === 0 ? <span className="text-green-600">FREE</span> : `₹ ${shipping.toLocaleString('en-IN')}`}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Tax (3%)</span>
                      <span className="font-medium">₹ {tax.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-semibold text-gray-900">Total Amount</span>
                        <span className="text-xl sm:text-2xl font-bold text-[#B8941E]">₹ {finalTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="bg-amber-50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <Shield className="w-4 h-4 text-[#B8941E] flex-shrink-0" />
                      <span>100% Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <Truck className="w-4 h-4 text-[#B8941E] flex-shrink-0" />
                      <span>Insured & Tracked Shipping</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <CreditCard className="w-4 h-4 text-[#B8941E] flex-shrink-0" />
                      <span>Easy Returns & Exchanges</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Form - Right Side (Desktop) / Bottom (Mobile) */}
              <div className="lg:col-span-2 order-1 lg:order-2 space-y-5 sm:space-y-6">
                {/* Shipping Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#B8941E]" />
                    Shipping Information
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-gray-400" />
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter first name"
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#B8941E] focus:outline-none transition"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-gray-400" />
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter last name"
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#B8941E] focus:outline-none transition"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                        <Mail className="w-4 h-4 text-gray-400" />
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#B8941E] focus:outline-none transition"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-gray-400" />
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="10-digit mobile number"
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#B8941E] focus:outline-none transition"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                        <Home className="w-4 h-4 text-gray-400" />
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        placeholder="House No., Building Name, Street, Area"
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#B8941E] focus:outline-none transition resize-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter city"
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#B8941E] focus:outline-none transition"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter state"
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#B8941E] focus:outline-none transition"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        Pincode <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        pattern="[0-9]{6}"
                        placeholder="6-digit pincode"
                        maxLength={6}
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#B8941E] focus:outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#B8941E]" />
                    Payment Method
                  </h2>
                  
                  <div className="space-y-3">
                    <label className={`flex items-start sm:items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                      formData.paymentMethod === 'cod' ? 'border-[#B8941E] bg-amber-50' : 'border-gray-200 hover:border-[#B8941E]'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#B8941E] mt-0.5 sm:mt-0 flex-shrink-0"
                      />
                      <div className="ml-3 flex-1">
                        <span className="font-semibold text-gray-900 block">Cash on Delivery</span>
                        <span className="text-xs text-gray-500">Pay when you receive your order</span>
                      </div>
                    </label>
                    
                    <label className={`flex items-start sm:items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                      formData.paymentMethod === 'online' ? 'border-[#B8941E] bg-amber-50' : 'border-gray-200 hover:border-[#B8941E]'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={formData.paymentMethod === 'online'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#B8941E] mt-0.5 sm:mt-0 flex-shrink-0"
                      />
                      <div className="ml-3 flex-1">
                        <span className="font-semibold text-gray-900 block">Online Payment</span>
                        <span className="text-xs text-gray-500">UPI, Cards, Net Banking, Wallets</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Place Order Button - Mobile */}
                <div className="lg:hidden">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#B8941E] text-white py-3.5 rounded-lg font-bold hover:bg-[#9a7a19] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5" />
                        <span>Place Order - ₹ {finalTotal.toLocaleString('en-IN')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
