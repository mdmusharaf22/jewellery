'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout, updateUser } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { User, Package, Heart, MapPin, Settings, LogOut, Edit2, Save } from 'lucide-react';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user = null, isAuthenticated = false } = useAppSelector((state) => state.auth || { user: null, isAuthenticated: false });
  const wishlistItems = useAppSelector((state) => state.wishlist?.items || []);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  // Mock orders data
  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 145000,
      items: 2,
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-20',
      status: 'Processing',
      total: 95000,
      items: 1,
    },
  ];

  // Redirect if not authenticated - use useEffect to avoid setState during render
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Show nothing while redirecting
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  const handleSaveProfile = () => {
    dispatch(updateUser(formData));
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
  ];

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="w-[90%] mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <a href="/" className="hover:text-[#B8941E] transition">Home</a>
              <span>•</span>
              <span className="text-gray-900">My Account</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* User Info */}
                <div className="text-center mb-6 pb-6 border-b">
                  <div className="w-20 h-20 bg-[#B8941E] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h2 className="font-bold text-lg text-gray-900">{user?.name}</h2>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        activeTab === tab.id
                          ? 'bg-[#FFF8E7] text-[#B8941E]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 text-[#B8941E] hover:text-[#9a7a19] transition"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center gap-2 bg-[#B8941E] text-white px-4 py-2 rounded-lg hover:bg-[#9a7a19] transition"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#B8941E] focus:outline-none disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#B8941E] focus:outline-none disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#B8941E] focus:outline-none disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#B8941E] focus:outline-none disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
                  
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-[#B8941E] transition">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{order.id}</h3>
                            <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-600">{order.items} items</p>
                            <p className="text-lg font-bold text-gray-900">₹ {order.total.toLocaleString('en-IN')}</p>
                          </div>
                          <button className="text-[#B8941E] font-medium hover:underline">
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
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
                  
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">Your wishlist is empty</p>
                      <a href="/products" className="inline-block mt-4 text-[#B8941E] font-medium hover:underline">
                        Browse Products
                      </a>
                    </div>
                  ) : (
                    <p className="text-gray-600">
                      You have {wishlistItems.length} items in your wishlist.{' '}
                      <a href="/wishlist" className="text-[#B8941E] font-medium hover:underline">
                        View All
                      </a>
                    </p>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                    <button className="bg-[#B8941E] text-white px-4 py-2 rounded-lg hover:bg-[#9a7a19] transition">
                      Add New Address
                    </button>
                  </div>
                  
                  <div className="text-center py-12">
                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No saved addresses yet</p>
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
