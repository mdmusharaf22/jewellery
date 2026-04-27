'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, Package, Truck, Mail, Phone } from 'lucide-react';

export default function OrderSuccessPage() {
  // Removed confetti animation since canvas-confetti is not installed

  // Mock order data - in real app, get from URL params or state
  const orderDetails = {
    orderId: 'ORD-2024-' + Math.floor(Math.random() * 10000),
    date: new Date().toLocaleDateString(),
    total: 145000,
    items: 2,
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  };

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="w-[90%] mx-auto max-w-4xl">
          {/* Success Message */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Order Placed Successfully!
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your purchase. Your order has been confirmed and will be processed shortly.
            </p>
            
            <div className="inline-block bg-[#FFF8E7] border-2 border-[#B8941E] rounded-lg px-6 py-3">
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-2xl font-bold text-[#B8941E]">{orderDetails.orderId}</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Date</p>
                  <p className="font-semibold text-gray-900">{orderDetails.date}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                  <p className="font-semibold text-gray-900">{orderDetails.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Items ({orderDetails.items})</span>
                <span className="font-semibold text-gray-900">₹ {orderDetails.total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold border-t pt-4">
                <span>Total</span>
                <span className="text-[#B8941E]">₹ {orderDetails.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#B8941E] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Order Confirmation</h3>
                  <p className="text-gray-600 text-sm">
                    You'll receive an email confirmation with your order details shortly.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#B8941E] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Order Processing</h3>
                  <p className="text-gray-600 text-sm">
                    Our team will carefully prepare and package your jewelry with care.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#B8941E] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Shipping Updates</h3>
                  <p className="text-gray-600 text-sm">
                    Track your order with real-time updates via email and SMS.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#B8941E] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Delivery</h3>
                  <p className="text-gray-600 text-sm">
                    Your jewelry will be delivered securely with full insurance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-gradient-to-br from-[#B8941E] to-[#9a7a19] rounded-2xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
            <p className="mb-6 opacity-90">
              Our customer support team is here to assist you with any questions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@sriganeshjewellers.com"
                className="flex items-center justify-center gap-2 bg-white text-[#B8941E] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                <Mail className="w-5 h-5" />
                <span>Email Us</span>
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#B8941E] transition"
              >
                <Phone className="w-5 h-5" />
                <span>Call Us</span>
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="/dashboard"
              className="flex-1 bg-[#B8941E] text-white py-4 rounded-lg font-semibold text-center hover:bg-[#9a7a19] transition"
            >
              View Order Status
            </a>
            <a
              href="/"
              className="flex-1 border-2 border-[#B8941E] text-[#B8941E] py-4 rounded-lg font-semibold text-center hover:bg-[#FFF8E7] transition"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
