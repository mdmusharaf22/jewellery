'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InvoiceModal from '@/components/InvoiceModal';
import TrackingModal from '@/components/TrackingModal';
import { CheckCircle, Package, Truck, Mail, Phone, ArrowRight, Copy, Check } from 'lucide-react';
import Link from 'next/link';

interface InvoiceData {
  order_id: string;
  payment_id: string;
  tracking_id: string | null;
  status: string;
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: Array<{
    id: string;
    name: string;
  }>;
  pricing: {
    gold_value: number;
    silver_value: number;
    making_charges: number;
    gemstone_value: number;
    wastage: number;
    gst: number;
    total: number;
  };
  store_details: {
    gst_number: string;
    billing_address: string;
    invoice_text: string;
  };
}

interface TrackingData {
  id: string;
  status: string;
  tracking_id: string | null;
  product_details: string;
  created_at: string;
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [copied, setCopied] = useState<string>('');
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [isLoadingInvoice, setIsLoadingInvoice] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isLoadingTracking, setIsLoadingTracking] = useState(false);
  const [trackingError, setTrackingError] = useState<string | null>(null);
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
      router.replace('/');
      return;
    }

    setOrderDetails({
      order_id: order_id || '',
      payment_id: payment_id || '',
      razorpay_order_id: razorpay_order_id || '',
    });
  }, [searchParams, router]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  const fetchInvoice = async () => {
    if (!orderDetails.order_id) return;
    
    setIsLoadingInvoice(true);
    setIsInvoiceModalOpen(true);
    
    try {
      const API = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${API}/orders/${orderDetails.order_id}/invoice`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success && data.data) {
        setInvoiceData(data.data);
      } else {
        console.error('Failed to fetch invoice:', data.message);
        alert('Failed to load invoice. Please try again.');
        setIsInvoiceModalOpen(false);
      }
    } catch (error) {
      console.error('Error fetching invoice:', error);
      alert('Failed to load invoice. Please try again.');
      setIsInvoiceModalOpen(false);
    } finally {
      setIsLoadingInvoice(false);
    }
  };

  const handleViewOrders = () => {
    fetchInvoice();
  };

  const fetchTracking = async () => {
    if (!orderDetails.order_id) return;
    
    setIsLoadingTracking(true);
    setIsTrackingModalOpen(true);
    setTrackingError(null);
    
    try {
      const API = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${API}/orders/track/${orderDetails.order_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success && data.data) {
        setTrackingData(data.data);
      } else {
        setTrackingError(data.message || 'Failed to load tracking information.');
      }
    } catch (error) {
      console.error('Error fetching tracking:', error);
      setTrackingError('Failed to load tracking information. Please try again.');
    } finally {
      setIsLoadingTracking(false);
    }
  };

  const handleTrackOrder = () => {
    fetchTracking();
  };

  if (!orderDetails.order_id) {
    return null;
  }

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 sm:py-12 lg:py-16">
        <div className="w-[90%] max-w-3xl mx-auto">
          {/* Success Icon & Message */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full mb-4 sm:mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Payment Successful! 🎉
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Thank you for your order. Your payment has been processed successfully.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-[#B8941E]" />
              Order Details
            </h2>

            <div className="space-y-4">
              {/* Order ID */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="mb-2 sm:mb-0 flex-1">
                  <p className="text-sm text-gray-600 mb-1">Order ID</p>
                  <p className="text-base sm:text-lg font-bold text-gray-900 font-mono break-all">
                    {orderDetails.order_id}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(orderDetails.order_id, 'order_id')}
                  className="flex items-center gap-1.5 text-sm text-[#B8941E] hover:text-[#9a7a19] font-medium self-start sm:self-auto transition"
                >
                  {copied === 'order_id' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Confirmation Notice */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    Order Confirmation Sent
                  </p>
                  <p className="text-sm text-blue-700">
                    We've sent a confirmation email with your order details.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <button
              onClick={handleTrackOrder}
              className="flex items-center justify-center gap-2 bg-[#B8941E] text-white py-3.5 sm:py-4 rounded-lg font-bold hover:bg-[#9a7a19] transition"
            >
              <Truck className="w-5 h-5" />
              Track Order
            </button>
            
            <button
              onClick={handleViewOrders}
              className="flex items-center justify-center gap-2 bg-white text-[#B8941E] py-3.5 sm:py-4 rounded-lg font-bold border-2 border-[#B8941E] hover:bg-amber-50 transition"
            >
              <Package className="w-5 h-5" />
              View Invoice
            </button>
          </div>

          {/* Contact Support */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Need Help?
            </h2>
            <p className="text-sm text-gray-700 mb-5">
              Our customer support team is here to assist you.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-[#B8941E] flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-600">Call Us</p>
                  <a href="tel:+919876543210" className="text-sm font-semibold text-gray-900 hover:text-[#B8941E]">
                    +91 98765 43210
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-[#B8941E] flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-600">Email Us</p>
                  <a href="mailto:support@sreeganeshjewellers.com" className="text-sm font-semibold text-gray-900 hover:text-[#B8941E] break-all">
                    support@sreeganesh.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        invoiceData={invoiceData}
        isLoading={isLoadingInvoice}
      />

      {/* Tracking Modal */}
      <TrackingModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        trackingData={trackingData}
        isLoading={isLoadingTracking}
        error={trackingError}
      />

      <Footer />
    </>
  );
}