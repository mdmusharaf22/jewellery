'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { User, Package, Heart, MapPin, Settings, LogOut, Edit } from 'lucide-react';

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'orders', name: 'My Orders', icon: Package },
    { id: 'wishlist', name: 'Wishlist', icon: Heart },
    { id: 'addresses', name: 'Addresses', icon: MapPin },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const orders = [
    { id: 'ORD123456', date: 'Dec 20, 2024', total: 125000, status: 'Delivered', items: 2 },
    { id: 'ORD123455', date: 'Nov 15, 2024', total: 85000, status: 'In Transit', items: 1 },
    { id: 'ORD123454', date: 'Oct 10, 2024', total: 45000, status: 'Delivered', items: 3 },
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="w-[90%] mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Account</h1>
            <p className="text-gray-600">Manage your profile, orders, and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* User Info */}
                <div className="text-center mb-6 pb-6 border-b">
                  <div className="w-20 h-20 bg-[#B8941E] rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900">John Doe</h3>
                  <p className="text-sm text-gray-600">john.doe@email.com</p>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        activeTab === tab.id
                          ? 'bg-[#FFF8E7] text-[#B8941E] font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.name}
                    </button>
                  ))}
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition">
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                    <button className="flex items-center gap-2 text-[#B8941E] hover:underline">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value="John"
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value="Doe"
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value="john.doe@email.com"
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value="+91 98765 43210"
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
                  
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:border-[#B8941E] transition">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-gray-900">Order #{order.id}</h3>
                            <p className="text-sm text-gray-600">{order.date} • {order.items} items</p>
                          </div>
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${
                              order.status === 'Delivered'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-bold text-gray-900">₹ {order.total.toLocaleString('en-IN')}</p>
                          <button className="text-[#B8941E] font-semibold hover:underline">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
                  <div className="text-center py-12">
                    <img
                      src="https://storyset.com/illustration/wishlist/rafiki"
                      alt="Wishlist"
                      className="w-64 mx-auto mb-6"
                    />
                    <p className="text-gray-600 mb-4">Your wishlist is empty</p>
                    <a href="/products" className="text-[#B8941E] font-semibold hover:underline">
                      Browse Products
                    </a>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                    <button className="bg-[#B8941E] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#9a7a19] transition">
                      Add New Address
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block bg-[#B8941E] text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                          DEFAULT
                        </span>
                        <h3 className="font-bold text-gray-900">Home</h3>
                      </div>
                      <button className="text-[#B8941E] hover:underline text-sm">Edit</button>
                    </div>
                    <p className="text-gray-600">
                      24 Temple Street<br />
                      Chennai, Tamil Nadu 600001<br />
                      India<br />
                      Phone: +91 98765 43210
                    </p>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="pb-6 border-b">
                      <h3 className="font-semibold text-gray-900 mb-2">Change Password</h3>
                      <p className="text-gray-600 text-sm mb-4">Update your password to keep your account secure</p>
                      <button className="text-[#B8941E] font-semibold hover:underline">
                        Change Password
                      </button>
                    </div>
                    
                    <div className="pb-6 border-b">
                      <h3 className="font-semibold text-gray-900 mb-2">Email Notifications</h3>
                      <p className="text-gray-600 text-sm mb-4">Manage your email notification preferences</p>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-[#B8941E]" />
                        <span className="text-gray-700">Receive order updates via email</span>
                      </label>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Delete Account</h3>
                      <p className="text-gray-600 text-sm mb-4">Permanently delete your account and all data</p>
                      <button className="text-red-600 font-semibold hover:underline">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
