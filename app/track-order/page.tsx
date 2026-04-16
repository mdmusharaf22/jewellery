'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Package, Truck, CheckCircle, MapPin } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [orderStatus, setOrderStatus] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate order tracking (replace with actual API call)
    if (orderId && email) {
      // Mock: If order ID starts with 'ORD', show tracking info
      if (orderId.toUpperCase().startsWith('ORD')) {
        setOrderStatus({
          orderId: orderId.toUpperCase(),
          status: 'In Transit',
          estimatedDelivery: 'Dec 28, 2024',
          currentLocation: 'Chennai Distribution Center',
          timeline: [
            { status: 'Order Placed', date: 'Dec 20, 2024', completed: true },
            { status: 'Order Confirmed', date: 'Dec 20, 2024', completed: true },
            { status: 'Shipped', date: 'Dec 22, 2024', completed: true },
            { status: 'In Transit', date: 'Dec 24, 2024', completed: true },
            { status: 'Out for Delivery', date: 'Dec 28, 2024', completed: false },
            { status: 'Delivered', date: 'Dec 28, 2024', completed: false },
          ],
        });
        setNotFound(false);
      } else {
        setOrderStatus(null);
        setNotFound(true);
      }
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="w-[90%] max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Order</h1>
            <p className="text-gray-600">Enter your order details to track your shipment</p>
          </div>

          {/* Tracking Form */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <form onSubmit={handleTrack} className="space-y-6">
              <div>
                <label htmlFor="orderId" className="block text-sm font-semibold text-gray-900 mb-2">
                  Order ID *
                </label>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g., ORD123456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8941E] focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8941E] focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#B8941E] text-white py-4 rounded-lg font-semibold hover:bg-[#9a7a19] transition flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Track Order
              </button>
            </form>
          </div>

          {/* Order Status */}
          {orderStatus && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center justify-between mb-6 pb-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Order #{orderStatus.orderId}</h2>
                  <p className="text-gray-600">Estimated Delivery: {orderStatus.estimatedDelivery}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                    {orderStatus.status}
                  </span>
                </div>
              </div>

              {/* Current Location */}
              <div className="bg-[#FFF8E7] rounded-lg p-4 mb-8 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[#B8941E]" />
                <div>
                  <p className="font-semibold text-gray-900">Current Location</p>
                  <p className="text-gray-600">{orderStatus.currentLocation}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-6">
                {orderStatus.timeline.map((item: any, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        {item.completed ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        )}
                      </div>
                      {index < orderStatus.timeline.length - 1 && (
                        <div
                          className={`w-0.5 h-12 ${item.completed ? 'bg-green-500' : 'bg-gray-300'}`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className={`font-semibold ${item.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                        {item.status}
                      </h3>
                      <p className={`text-sm ${item.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                        {item.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Not Found */}
          {notFound && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <img
                src="https://storyset.com/illustration/empty/rafiki"
                alt="Order Not Found"
                className="w-64 mx-auto mb-6"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find an order with the provided details. Please check your Order ID and email address.
              </p>
              <button
                onClick={() => setNotFound(false)}
                className="text-[#B8941E] font-semibold hover:underline"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
