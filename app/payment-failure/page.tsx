'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { XCircle, AlertTriangle, RefreshCw, ArrowLeft, Phone, Mail, CreditCard, Shield } from 'lucide-react';
import Link from 'next/link';

export default function PaymentFailurePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [failureDetails, setFailureDetails] = useState({
    order_id: '',
    razorpay_order_id: '',
    error_reason: '',
    error_description: '',
  });

  useEffect(() => {
    const order_id = searchParams.get('order_id');
    const razorpay_order_id = searchParams.get('razorpay_order_id');
    const error_reason = searchParams.get('error_reason');
    const error_description = searchParams.get('error_description');

    setFailureDetails({
      order_id: order_id || '',
      razorpay_order_id: razorpay_order_id || '',
      error_reason: error_reason || 'Payment was cancelled or failed',
      error_description: error_description || 'The payment could not be completed. Please try again.',
    });
  }, [searchParams]);

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-8 sm:py-12 lg:py-16">
        <div className="w-[90%] max-w-4xl mx-auto">
          {/* Failure Icon & Message */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-red-100 rounded-full mb-4 sm:mb-6">
              <XCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Payment Failed
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              We couldn't process your payment. Don't worry, no amount has been deducted from your account.
            </p>
          </div>

          {/* Error Details Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              What Happened?
            </h2>

            <div className="space-y-4 sm:space-y-5">
              {/* Error Reason */}
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-gray-600 mb-1">Reason</p>
                <p className="text-base sm:text-lg font-bold text-red-900">
                  {failureDetails.error_reason}
                </p>
              </div>

              {/* Error Description */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Details</p>
                <p className="text-sm sm:text-base text-gray-700">
                  {failureDetails.error_description}
                </p>
              </div>

              {/* Order Reference */}
              {failureDetails.order_id && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Order Reference</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 font-mono break-all">
                    {failureDetails.order_id}
                  </p>
                </div>
              )}

              {/* Razorpay Order ID */}
              {failureDetails.razorpay_order_id && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Razorpay Order ID</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 font-mono break-all">
                    {failureDetails.razorpay_order_id}
                  </p>
                </div>
              )}
            </div>

            {/* No Charge Notice */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-900 mb-1">
                    No Amount Deducted
                  </p>
                  <p className="text-sm text-green-700">
                    Your payment was not processed. If any amount was debited, it will be automatically refunded within 5-7 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Common Reasons Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              Common Reasons for Payment Failure
            </h2>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Insufficient Balance
                  </h3>
                  <p className="text-sm text-gray-600">
                    Your account may not have sufficient funds to complete the transaction.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Incorrect Card Details
                  </h3>
                  <p className="text-sm text-gray-600">
                    Card number, CVV, or expiry date may have been entered incorrectly.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Bank Declined Transaction
                  </h3>
                  <p className="text-sm text-gray-600">
                    Your bank may have declined the transaction for security reasons.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Network Issues
                  </h3>
                  <p className="text-sm text-gray-600">
                    Poor internet connection may have interrupted the payment process.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Payment Cancelled
                  </h3>
                  <p className="text-sm text-gray-600">
                    You may have closed the payment window or clicked cancel.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What to Do Next */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              What Should You Do?
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                <CreditCard className="w-5 h-5 text-[#B8941E] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Check Your Payment Details
                  </p>
                  <p className="text-sm text-gray-600">
                    Verify your card details, account balance, and ensure your card is enabled for online transactions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                <Phone className="w-5 h-5 text-[#B8941E] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Contact Your Bank
                  </p>
                  <p className="text-sm text-gray-600">
                    If the issue persists, contact your bank to ensure there are no restrictions on your card.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                <RefreshCw className="w-5 h-5 text-[#B8941E] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Try Again
                  </p>
                  <p className="text-sm text-gray-600">
                    Once you've resolved the issue, you can retry the payment from your cart.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Need Help?
            </h2>
            <p className="text-sm sm:text-base text-gray-700 mb-5 sm:mb-6">
              If you continue to face issues or have questions, our support team is ready to help.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-[#B8941E] flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-600">Call Us</p>
                  <a href="tel:+919876543210" className="text-sm sm:text-base font-semibold text-gray-900 hover:text-[#B8941E]">
                    +91 98765 43210
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
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
              href="/checkout"
              className="flex items-center justify-center gap-2 bg-[#B8941E] text-white py-3.5 sm:py-4 rounded-lg font-bold hover:bg-[#9a7a19] transition"
            >
              <RefreshCw className="w-5 h-5" />
              Retry Payment
            </Link>
            
            <Link
              href="/cart"
              className="flex items-center justify-center gap-2 bg-white text-[#B8941E] py-3.5 sm:py-4 rounded-lg font-bold border-2 border-[#B8941E] hover:bg-amber-50 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Cart
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              💡 <span className="font-semibold">Tip:</span> Make sure you have a stable internet connection before retrying.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
