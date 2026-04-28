'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, Package, Truck, Mail, Phone, Home, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState({
    order_id: '',
    payment_id: '',
    razorpay_order_id: '',
  });

  useEffect(() => {
    const order_id = searchParams.get('order_id');
    const payment_id = searchParams.get('payment_id');
    const razorpay_order_id = searchParams.get('razorpay_order_id');

    if (!order_id) {
      // If no order_id, redirect to home
      router.replace('/');
      return;
    }

    setOrderDetails({
      order_id: order_id || '',
      payment_id: payment_id || '',
      razorpay_order_id: razorpay_order_id || '',
    });
  }, [searchParams, router]);

  if (!orderDetails.order_id) {
    return null; // Don't render while redirecting
  }

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 sm:py-12 lg:py-16">
        <div className="w-[90%] max-w-4xl mx-auto">
          {/* Success Icon & Message */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full mb-4 sm:mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Payment Successful! 🎉
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Thank you for your order. Your payment has been processed successfully and your order is confirmed.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-[#B8941E]" />
              Order Details
            </h2>

            <div className="space-y-4 sm:space-y-5">
              {/* Order ID */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="mb-2 sm:mb-0">
                  <p className="text-sm text-gray-600 mb-1">Order ID</p>
                  <p className="text-base sm:text-lg font-bold text-gray-900 font-mono break-all">
                    {orderDetails.order_id}
                  </p>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(orderDetails.order_id)}
                  className="text-sm text-[#B8941E] hover:text-[#9a7a19] font-medium self-start sm:self-auto"
                >
                  Copy
                </button>
              </div>

              {/* Payment ID */}
              {orderDetails.payment_id && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-sm text-gray-600 mb-1">Payment ID</p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 font-mono break-all">
                      {orderDetails.payment_id}
                    </p>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(orderDetails.payment_id)}
                    className="text-sm text-[#B8941E] hover:text-[#9a7a19] font-medium self-start sm:self-auto"
                  >
                    Copy
                  </button>
                </div>
              )}

              {/* Razorpay Order ID */}
              {orderDetails.razorpay_order_id && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-sm text-gray-600 mb-1">Razorpay Order ID</p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 font-mono break-all">
                      {orderDetails.razorpay_order_id}
                    </p>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(orderDetails.razorpay_order_id)}
                    className="text-sm text-[#B8941E] hover:text-[#9a7a19] font-medium self-start sm:self-auto"
                  >
                    Copy
                  </button>
                </div>
              )}
            </div>

            {/* Confirmation Email Notice */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    Order Confirmation Email Sent
                  </p>
                  <p className="text-sm text-blue-700">
                    We've sent a confirmation email with your order details. Please check your inbox.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Truck className="w-6 h-6 text-[#B8941E]" />
              What Happens Next?
            </h2>

            <div className="space-y-5 sm:space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#B8941E] text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                    Order Processing
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Our team will verify and process your order within 24 hours.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#B8941E] text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                    Quality Check & Packaging
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Your jewellery will be carefully inspected and securely packaged.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#B8941E] text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                    Insured Shipping
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Your order will be shipped with full insurance and tracking details.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#B8941E] text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                    Delivery at Your Doorstep
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Expect delivery within 5-7 business days. You'll receive tracking updates via SMS and email.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Need Help?
            </h2>
            <p className="text-sm sm:text-base text-gray-700 mb-5 sm:mb-6">
              Our customer support team is here to assist you with any questions about your order.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <Phone className="w-5 h-5 text-[#B8941E] flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-600">Call Us</p>
                  <a href="tel:+919876543210" className="text-sm sm:text-base font-semibold text-gray-900 hover:text-[#B8941E]">
                    +91 98765 43210
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <Mail className="w-5 h-5 text-[#B8941E] flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-600">Email Us</p>
                  <a href="mailto:support@sreeganeshjewellers.com" className="text-sm sm:text-base font-semibold text-gray-900 hover:text-[#B8941E] break-all">
                    support@sreeganesh.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/track-order"
              className="flex items-center justify-center gap-2 bg-[#B8941E] text-white py-3.5 sm:py-4 rounded-lg font-bold hover:bg-[#9a7a19] transition"
            >
              <Truck className="w-5 h-5" />
              Track Your Order
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              href="/products"
              className="flex items-center justify-center gap-2 bg-white text-[#B8941E] py-3.5 sm:py-4 rounded-lg font-bold border-2 border-[#B8941E] hover:bg-amber-50 transition"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Save Order Details Notice */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              💡 <span className="font-semibold">Pro Tip:</span> Save your Order ID for easy tracking and future reference.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
