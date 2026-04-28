'use client';

import { X, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { useEffect } from 'react';

interface TrackingData {
  id: string;
  status: string;
  tracking_id: string | null;
  product_details: string;
  created_at: string;
}

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackingData: TrackingData | null;
  isLoading: boolean;
  error?: string | null;
}

export default function TrackingModal({ isOpen, onClose, trackingData, isLoading, error }: TrackingModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Parse product details if it's a string
  let productDetails = null;
  if (trackingData?.product_details) {
    try {
      productDetails = JSON.parse(trackingData.product_details);
    } catch (e) {
      console.error('Failed to parse product details:', e);
    }
  }

  if (!isOpen) return null;

  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case 'DELIVERED':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'IN_TRANSIT':
      case 'SHIPPED':
        return <Truck className="w-6 h-6 text-blue-600" />;
      case 'PENDING':
      case 'PROCESSING':
        return <Clock className="w-6 h-6 text-yellow-600" />;
      default:
        return <Package className="w-6 h-6 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'IN_TRANSIT':
      case 'SHIPPED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PENDING':
      case 'PROCESSING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#B8941E] to-[#9a7a19] text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Truck className="w-6 h-6" />
            Track Order
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6 sm:p-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8941E] mb-4"></div>
              <p className="text-gray-600">Loading tracking information...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Error</h3>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : trackingData ? (
            <div className="space-y-6">
              {/* Order Status Card */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(trackingData.status)}
                    <div>
                      <p className="text-sm text-gray-600">Order Status</p>
                      <span className={`inline-block px-4 py-1.5 text-sm font-bold rounded-full border ${getStatusColor(trackingData.status)}`}>
                        {trackingData.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Order ID</p>
                    <p className="text-sm font-semibold text-gray-900 break-all font-mono">
                      {trackingData.id}
                    </p>
                  </div>
                  {trackingData.tracking_id && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Tracking ID</p>
                      <p className="text-sm font-semibold text-gray-900 font-mono">
                        {trackingData.tracking_id}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Order Date</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {trackingData.created_at}
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              {productDetails && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#B8941E]" />
                    Product Details
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-base font-semibold text-gray-900 mb-2">{productDetails.name}</p>
                    <p className="text-xs text-gray-600">Product ID: <span className="font-mono">{productDetails.id}</span></p>
                  </div>
                </div>
              )}

              {/* Status Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  {trackingData.status === 'PENDING' ? (
                    <>
                      <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Order Being Processed</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Your order is currently being prepared by our team. We'll notify you once it's ready for shipment.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span>Order verification in progress</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            <span>Quality check pending</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            <span>Packaging pending</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            <span>Shipment pending</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : trackingData.status === 'SHIPPED' || trackingData.status === 'IN_TRANSIT' ? (
                    <>
                      <Truck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Order Shipped</h3>
                        <p className="text-sm text-gray-600">
                          Your order is on its way! You'll receive it soon.
                        </p>
                      </div>
                    </>
                  ) : trackingData.status === 'DELIVERED' ? (
                    <>
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Order Delivered</h3>
                        <p className="text-sm text-gray-600">
                          Your order has been successfully delivered. Thank you for shopping with us!
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Package className="w-6 h-6 text-gray-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Order Status: {trackingData.status}</h3>
                        <p className="text-sm text-gray-600">
                          We're processing your order. Updates will be available soon.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  If you have any questions about your order, feel free to contact our support team.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:+919876543210"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    <Phone className="w-4 h-4" />
                    Call Support
                  </a>
                  <a
                    href="mailto:support@sreeganesh.com"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    <Mail className="w-4 h-4" />
                    Email Support
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No tracking data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
