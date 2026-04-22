'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { User, Package, Heart, MapPin, LogOut, Edit } from 'lucide-react';

export default function MyAccountPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [activeTab, setActiveTab] = useState('profile');

  // Redirect if not logged in - use useEffect to avoid setState during render
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  // Show nothing while redirecting
  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('customer_token');
    router.push('/login');
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'wishlist', name: 'Wishlist', icon: Heart },
    { id: 'addresses', name: 'Addresses', icon: MapPin },
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="w-[90%] mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-500">
            <a href="/" className="hover:text-[#B8941E]">Home</a>
            <span className="mx-2">•</span>
            <span className="text-gray-900">My Account</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Avatar */}
                <div className="text-center mb-6 pb-6 border-b">
                  <div className="w-16 h-16 bg-[#B8941E] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-2xl font-bold">
                      {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                    </span>
                  </div>
                  {user.name && <h3 className="font-bold text-gray-900 text-sm">{user.name}</h3>}
                  <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                </div>

                {/* Nav */}
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm ${
                        activeTab === tab.id
                          ? 'bg-[#FFF8E7] text-[#B8941E] font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.name}
                    </button>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition text-sm"
                  >
                    <LogOut className="w-4 h-4" />
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
                    <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                    <button className="flex items-center gap-1 text-sm text-[#B8941E] hover:underline">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={user.name || ''}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900"
                      />
                    </div>
                    {user.phone && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={user.phone}
                          readOnly
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">My Orders</h2>
                  <div className="text-center py-12 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No orders yet</p>
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">My Wishlist</h2>
                  <div className="text-center py-12 text-gray-500">
                    <Heart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="mb-4">Your wishlist is empty</p>
                    <a href="/products" className="text-[#B8941E] font-semibold hover:underline text-sm">
                      Browse Products
                    </a>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                    <button className="bg-[#B8941E] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#9a7a19] transition">
                      Add Address
                    </button>
                  </div>
                  <div className="text-center py-12 text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No saved addresses</p>
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
