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
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [hasAuth, setHasAuth] = useState(false);

  // Check auth immediately on mount - before any render
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = sessionStorage.getItem('customer_token');
        const authData = sessionStorage.getItem('auth');
        
        console.log('=== My Account Auth Check ===');
        console.log('Token:', token ? `EXISTS (${token.substring(0, 20)}...)` : 'MISSING');
        console.log('Auth data:', authData ? `EXISTS` : 'MISSING');
        
        if (authData) {
          try {
            const parsed = JSON.parse(authData);
            console.log('Parsed auth data:', parsed);
          } catch (e) {
            console.error('Failed to parse auth data:', e);
          }
        }
        
        if (!token || !authData) {
          console.log('Redirecting to login - no auth data');
          // Use replace to prevent back button issues
          window.location.replace('/login');
          return;
        }
        
        console.log('Auth verified - showing page');
        setHasAuth(true);
        setIsAuthChecked(true);
      } catch (error) {
        console.error('Error in auth check:', error);
        window.location.replace('/login');
      }
    };

    // Small delay to ensure sessionStorage is ready
    const timer = setTimeout(checkAuth, 50);
    return () => clearTimeout(timer);
  }, []);

  // Don't render anything until auth is checked
  if (!isAuthChecked) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8941E] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // If auth check failed, don't render (will redirect)
  if (!hasAuth) {
    return null;
  }

  // Get user data from Redux or sessionStorage
  const getUserData = () => {
    if (user) return user;
    
    try {
      const authData = sessionStorage.getItem('auth');
      if (authData) {
        const parsed = JSON.parse(authData);
        return parsed.user;
      }
    } catch (e) {
      console.error('Error parsing auth data:', e);
    }
    return null;
  };

  const userData = getUserData();

  if (!userData) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Unable to load user data</p>
            <button
              onClick={() => window.location.href = '/login'}
              className="bg-[#B8941E] text-white px-6 py-2 rounded-lg hover:bg-[#9a7a19] transition"
            >
              Back to Login
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem('customer_token');
    sessionStorage.removeItem('auth');
    window.location.href = '/login';
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

      <div className="bg-gray-50 py-4 xs:py-5 sm:py-6 md:py-8 pb-8 xs:pb-10 sm:pb-12 md:pb-16">
        <div className="w-[90%] mx-auto">
          {/* Breadcrumb */}
          <div className="mb-3 xs:mb-4 sm:mb-5 md:mb-6 text-xs xs:text-sm text-gray-500">
            <a href="/" className="hover:text-[#B8941E]">Home</a>
            <span className="mx-1 xs:mx-2">•</span>
            <span className="text-gray-900">My Account</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
            {/* Sidebar - Horizontal tabs on mobile, vertical on desktop */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-3 xs:p-4 sm:p-5 md:p-6">
                {/* Avatar */}
                <div className="text-center mb-3 xs:mb-4 sm:mb-5 md:mb-6 pb-3 xs:pb-4 sm:pb-5 md:pb-6 border-b">
                  <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-[#B8941E] rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-2.5 sm:mb-3">
                    <span className="text-white text-lg xs:text-xl sm:text-2xl font-bold">
                      {userData.name?.[0]?.toUpperCase() || userData.email[0].toUpperCase()}
                    </span>
                  </div>
                  {userData.name && <h3 className="font-bold text-gray-900 text-xs xs:text-sm">{userData.name}</h3>}
                  <p className="text-[10px] xs:text-xs text-gray-500 mt-1 break-all px-2">{userData.email}</p>
                </div>

                {/* Nav - Horizontal scroll on mobile */}
                <nav className="space-y-0.5 xs:space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-2 xs:gap-2.5 sm:gap-3 px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 rounded-lg transition text-xs xs:text-sm ${
                        activeTab === tab.id
                          ? 'bg-[#FFF8E7] text-[#B8941E] font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                      {tab.name}
                    </button>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 xs:gap-2.5 sm:gap-3 px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 rounded-lg text-red-600 hover:bg-red-50 transition text-xs xs:text-sm"
                  >
                    <LogOut className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                    Logout
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-lg shadow-sm p-3 xs:p-4 sm:p-6 md:p-8">
                  <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-5 md:mb-6">
                    <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900">Profile Information</h2>
                    <button className="flex items-center gap-1 text-xs xs:text-sm text-[#B8941E] hover:underline">
                      <Edit className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                      Edit
                    </button>
                  </div>

                  <div className="space-y-3 xs:space-y-3.5 sm:space-y-4">
                    <div>
                      <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={userData.name || ''}
                        readOnly
                        className="w-full px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-xs xs:text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={userData.email}
                        readOnly
                        className="w-full px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-xs xs:text-sm sm:text-base break-all"
                      />
                    </div>
                    {userData.phone && (
                      <div>
                        <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={userData.phone}
                          readOnly
                          className="w-full px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-xs xs:text-sm sm:text-base"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="bg-white rounded-lg shadow-sm p-3 xs:p-4 sm:p-6 md:p-8">
                  <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-5 md:mb-6">My Orders</h2>
                  <div className="text-center py-8 xs:py-10 sm:py-12 text-gray-500">
                    <Package className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 mx-auto mb-2 xs:mb-2.5 sm:mb-3 text-gray-300" />
                    <p className="text-xs xs:text-sm sm:text-base">No orders yet</p>
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="bg-white rounded-lg shadow-sm p-3 xs:p-4 sm:p-6 md:p-8">
                  <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-5 md:mb-6">My Wishlist</h2>
                  <div className="text-center py-8 xs:py-10 sm:py-12 text-gray-500">
                    <Heart className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 mx-auto mb-2 xs:mb-2.5 sm:mb-3 text-gray-300" />
                    <p className="mb-3 xs:mb-3.5 sm:mb-4 text-xs xs:text-sm sm:text-base">Your wishlist is empty</p>
                    <a href="/products" className="text-[#B8941E] font-semibold hover:underline text-xs xs:text-sm">
                      Browse Products
                    </a>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="bg-white rounded-lg shadow-sm p-3 xs:p-4 sm:p-6 md:p-8">
                  <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between mb-3 xs:mb-4 sm:mb-5 md:mb-6 gap-2 xs:gap-0">
                    <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900">Saved Addresses</h2>
                    <button className="bg-[#B8941E] text-white px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg text-xs xs:text-sm font-semibold hover:bg-[#9a7a19] transition">
                      Add Address
                    </button>
                  </div>
                  <div className="text-center py-8 xs:py-10 sm:py-12 text-gray-500">
                    <MapPin className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 mx-auto mb-2 xs:mb-2.5 sm:mb-3 text-gray-300" />
                    <p className="text-xs xs:text-sm sm:text-base">No saved addresses</p>
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
