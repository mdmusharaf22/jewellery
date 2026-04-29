'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { fetchWishlist, toggleWishlistAsync } from '@/store/slices/wishlistSlice';
import { addToCart, addToCartAsync, fetchCart, removeFromCartAsync, updateCartItemAsync } from '@/store/slices/cartSlice';
import { useRouter } from 'next/navigation';
import { User, Package, Heart, MapPin, LogOut, Edit, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Toast from '@/components/Toast';

export default function MyAccountPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const wishlistItems = useAppSelector((state) => state.wishlist?.items || []);
  const cartItems = useAppSelector((state) => state.cart?.items || []);
  const cartTotal = useAppSelector((state) => state.cart?.total || 0);

  const [activeTab, setActiveTab] = useState('profile');
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [hasAuth, setHasAuth] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [userData, setUserData] = useState<any>(null);
  
  // Profile edit state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // Get user data from Redux or sessionStorage
  const getUserData = () => {
    if (user) return user;
    
    try {
      const authData = localStorage.getItem('auth');
      if (authData) {
        const parsed = JSON.parse(authData);
        return parsed.user;
      }
    } catch (e) {

    }
    return null;
  };

  // Fetch user profile from API
  const fetchUserProfile = async () => {
    setIsLoadingProfile(true);
    try {
      const token = localStorage.getItem('customer_token');
      const API = process.env.NEXT_PUBLIC_API_BASE_URL;
      
      const response = await fetch(`${API}/customers/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success && data.data?.profile) {
        const profile = data.data.profile;
        setProfileData({
          name: profile.name || '',
          phone: profile.phone || '',
          address: profile.address || ''
        });
        
        // Update local storage with fresh data
        const authData = localStorage.getItem('auth');
        if (authData) {
          const parsed = JSON.parse(authData);
          parsed.user = { ...parsed.user, ...profile };
          localStorage.setItem('auth', JSON.stringify(parsed));
          // Update userData state to trigger re-render
          setUserData(parsed.user);
        }
      }
    } catch (error) {

    } finally {
      setIsLoadingProfile(false);
    }
  };

  // Check auth immediately on mount - before any render
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('customer_token');
        const authData = localStorage.getItem('auth');

        if (authData) {
          try {
            const parsed = JSON.parse(authData);

          } catch (e) {

          }
        }
        
        if (!token || !authData) {

          // Use replace to prevent back button issues
          window.location.replace('/login');
          return;
        }

        setHasAuth(true);
        setIsAuthChecked(true);
      } catch (error) {

        window.location.replace('/login');
      }
    };

    // Check immediately without delay
    checkAuth();
  }, []); // Empty dependency array - only run once on mount

  // Fetch wishlist when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
      dispatch(fetchCart());
      fetchUserProfile(); // Fetch user profile data
    }
  }, [isAuthenticated, dispatch]);

  // Initialize profile data from local storage on mount
  useEffect(() => {
    const data = getUserData();
    setUserData(data);
    if (data) {
      setProfileData({
        name: data.name || '',
        phone: data.phone || '',
        address: data.address || ''
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    try {
      const token = localStorage.getItem('customer_token');
      const API = process.env.NEXT_PUBLIC_API_BASE_URL;
      
      const response = await fetch(`${API}/customers/auth/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: profileData.name,
          phone: profileData.phone,
          address: profileData.address
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setToast({ message: 'Profile updated successfully!', type: 'success' });
        setIsEditingProfile(false);
        
        // Update local storage
        const authData = localStorage.getItem('auth');
        if (authData) {
          const parsed = JSON.parse(authData);
          parsed.user = { ...parsed.user, ...profileData };
          localStorage.setItem('auth', JSON.stringify(parsed));
          // Update userData state to trigger re-render
          setUserData(parsed.user);
        }
      } else {
        setToast({ message: data.message || 'Failed to update profile', type: 'error' });
      }
    } catch (error) {

      setToast({ message: 'Failed to update profile', type: 'error' });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleToggleWishlist = async (productId: string, productName: string) => {
    try {
      await dispatch(toggleWishlistAsync(productId)).unwrap();
      setToast({ message: 'Removed from wishlist', type: 'info' });
    } catch (error) {

      setToast({ message: 'Failed to update wishlist', type: 'error' });
    }
  };

  const handleAddToCart = async (item: any) => {
    const productId = String(item.product_id || item.id);
    
    try {
      await dispatch(addToCartAsync({ 
        productId: productId, 
        quantity: 1
      })).unwrap();
      setToast({ message: 'Added to cart!', type: 'success' });
    } catch (error) {

      setToast({ message: 'Failed to add to cart', type: 'error' });
    }
  };

  const handleRemoveFromCart = async (item: any) => {
    if (item.cart_item_id) {
      try {
        await dispatch(removeFromCartAsync(item.cart_item_id)).unwrap();
        setToast({ message: 'Removed from cart', type: 'info' });
      } catch (error) {

        setToast({ message: 'Failed to remove from cart', type: 'error' });
      }
    }
  };

  const handleUpdateQuantity = async (item: any, newQuantity: number) => {
    if (newQuantity >= 1 && item.cart_item_id) {
      try {
        await dispatch(updateCartItemAsync({ 
          cartItemId: item.cart_item_id, 
          quantity: newQuantity 
        })).unwrap();
      } catch (error) {

        setToast({ message: 'Failed to update quantity', type: 'error' });
      }
    }
  };

  // Don't render anything until auth is checked
  if (!isAuthChecked) {
    const PageSkeleton = require('@/components/skeletons/PageSkeleton').default;
    return (
      <>
        <Header />
        <PageSkeleton />
        <Footer />
      </>
    );
  }

  // If auth check failed, don't render (will redirect)
  if (!hasAuth) {
    return null;
  }

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
    localStorage.removeItem('customer_token');
    localStorage.removeItem('auth');
    window.location.href = '/login';
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'wishlist', name: 'Wishlist', icon: Heart },
    { id: 'cart', name: 'Cart', icon: ShoppingCart },
  ];

  return (
    <>
      <Header />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

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
                    {!isEditingProfile ? (
                      <button 
                        onClick={() => setIsEditingProfile(true)}
                        className="flex items-center gap-1 text-xs xs:text-sm text-[#B8941E] hover:underline"
                      >
                        <Edit className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                        Edit
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setIsEditingProfile(false);
                            fetchUserProfile(); // Reload data on cancel
                          }}
                          className="text-xs xs:text-sm text-gray-600 hover:underline"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleSaveProfile}
                          disabled={isSavingProfile}
                          className="text-xs xs:text-sm text-[#B8941E] hover:underline font-semibold disabled:opacity-50"
                        >
                          {isSavingProfile ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                    )}
                  </div>

                  {isLoadingProfile ? (
                    (() => {
                      const ProfileSkeleton = require('@/components/skeletons/ProfileSkeleton').default;
                      return <ProfileSkeleton />;
                    })()
                  ) : (
                    <div className="space-y-3 xs:space-y-3.5 sm:space-y-4">
                      <div>
                        <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={isEditingProfile ? profileData.name : profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          readOnly={!isEditingProfile}
                          className={`w-full px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 border rounded-lg text-xs xs:text-sm sm:text-base ${
                            isEditingProfile 
                              ? 'border-gray-300 bg-white text-gray-900 focus:border-[#B8941E] focus:outline-none' 
                              : 'border-gray-200 bg-gray-50 text-gray-900'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={userData?.email || ''}
                          disabled
                          className="w-full px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 text-xs xs:text-sm sm:text-base break-all cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={isEditingProfile ? profileData.phone : profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          readOnly={!isEditingProfile}
                          placeholder={isEditingProfile ? "Enter phone number" : ""}
                          className={`w-full px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 border rounded-lg text-xs xs:text-sm sm:text-base ${
                            isEditingProfile 
                              ? 'border-gray-300 bg-white text-gray-900 focus:border-[#B8941E] focus:outline-none' 
                              : 'border-gray-200 bg-gray-50 text-gray-900'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                          value={isEditingProfile ? profileData.address : profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          readOnly={!isEditingProfile}
                          placeholder={isEditingProfile ? "Enter your address" : ""}
                          rows={3}
                          className={`w-full px-2.5 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 border rounded-lg text-xs xs:text-sm sm:text-base resize-none ${
                            isEditingProfile 
                              ? 'border-gray-300 bg-white text-gray-900 focus:border-[#B8941E] focus:outline-none' 
                              : 'border-gray-200 bg-gray-50 text-gray-900'
                          }`}
                        />
                      </div>
                    </div>
                  )}
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
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-8 xs:py-10 sm:py-12 text-gray-500">
                      <Heart className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 mx-auto mb-2 xs:mb-2.5 sm:mb-3 text-gray-300" />
                      <p className="mb-3 xs:mb-3.5 sm:mb-4 text-xs xs:text-sm sm:text-base">Your wishlist is empty</p>
                      <a href="/products" className="text-[#B8941E] font-semibold hover:underline text-xs xs:text-sm">
                        Browse Products
                      </a>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition group">
                          {/* Image */}
                          <div className="relative aspect-square overflow-hidden bg-gray-100">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              unoptimized
                            />
                            
                            {/* Remove from Wishlist Button */}
                            <button 
                              className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition shadow-lg z-10"
                              onClick={() => handleToggleWishlist(String(item.product_id || item.id), item.name)}
                              title="Remove from Wishlist"
                            >
                              <Heart className="w-4 h-4 fill-white stroke-white" />
                            </button>

                            {/* Add to Cart Button */}
                            <button 
                              className="absolute bottom-2 left-2 right-2 bg-white text-gray-800 py-2 font-medium hover:bg-[#B8941E] hover:text-white transition flex items-center justify-center gap-2 rounded text-xs"
                              onClick={() => handleAddToCart(item)}
                            >
                              <ShoppingCart className="w-4 h-4" />
                              <span>Add to Cart</span>
                            </button>
                          </div>

                          {/* Product Info */}
                          <div className="p-2">
                            <p className="text-[10px] text-[#B8941E] font-medium mb-0.5">{item.karat}</p>
                            <h3 className="font-bold text-xs mb-1 text-[#1a1a1a] line-clamp-2 leading-tight">
                              {item.name}
                            </h3>
                            <p className="text-sm font-bold text-[#1a1a1a]">
                              ₹ {item.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Cart Tab */}
              {activeTab === 'cart' && (
                <div className="bg-white rounded-lg shadow-sm p-3 xs:p-4 sm:p-6 md:p-8">
                  <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-5 md:mb-6">My Cart</h2>
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8 xs:py-10 sm:py-12 text-gray-500">
                      <ShoppingCart className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 mx-auto mb-2 xs:mb-2.5 sm:mb-3 text-gray-300" />
                      <p className="mb-3 xs:mb-3.5 sm:mb-4 text-xs xs:text-sm sm:text-base">Your cart is empty</p>
                      <a href="/products" className="text-[#B8941E] font-semibold hover:underline text-xs xs:text-sm">
                        Browse Products
                      </a>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 xs:space-y-4 mb-4 xs:mb-6">
                        {cartItems.map((item) => (
                          <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-3 xs:p-4">
                            <div className="flex gap-3 xs:gap-4">
                              {/* Product Image */}
                              <div className="relative w-16 h-16 xs:w-20 xs:h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>

                              {/* Product Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between mb-1 xs:mb-2">
                                  <div className="flex-1 min-w-0 pr-2">
                                    <p className="text-[10px] xs:text-xs text-[#B8941E] font-medium mb-0.5">{item.karat}</p>
                                    <h3 className="font-bold text-sm xs:text-base text-gray-900 line-clamp-2">{item.name}</h3>
                                  </div>
                                  <button
                                    onClick={() => handleRemoveFromCart(item)}
                                    className="text-red-500 hover:text-red-700 transition flex-shrink-0 cursor-pointer"
                                    aria-label="Remove item"
                                  >
                                    <Trash2 className="w-4 h-4 xs:w-5 xs:h-5" />
                                  </button>
                                </div>

                                <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-3 mt-2">
                                  {/* Quantity Controls */}
                                  <div className="flex items-center gap-2 xs:gap-3">
                                    <button
                                      onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                                      className="w-7 h-7 xs:w-8 xs:h-8 border-2 border-gray-300 rounded flex items-center justify-center hover:border-[#B8941E] transition"
                                    >
                                      <Minus className="w-3 h-3 xs:w-4 xs:h-4" />
                                    </button>
                                    <span className="w-8 xs:w-12 text-center font-semibold text-sm xs:text-base">{item.quantity}</span>
                                    <button
                                      onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                                      className="w-7 h-7 xs:w-8 xs:h-8 border-2 border-gray-300 rounded flex items-center justify-center hover:border-[#B8941E] transition"
                                    >
                                      <Plus className="w-3 h-3 xs:w-4 xs:h-4" />
                                    </button>
                                  </div>

                                  {/* Price */}
                                  <div className="text-left xs:text-right">
                                    <p className="text-base xs:text-lg font-bold text-gray-900">
                                      ₹ {(item.price * item.quantity).toLocaleString('en-IN')}
                                    </p>
                                    {item.quantity > 1 && (
                                      <p className="text-xs text-gray-500">
                                        ₹ {item.price.toLocaleString('en-IN')} each
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Cart Summary */}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-base xs:text-lg font-bold text-gray-900">Total</span>
                          <span className="text-lg xs:text-xl font-bold text-gray-900">
                            ₹ {cartTotal.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <button
                          onClick={() => router.push('/checkout')}
                          className="w-full bg-[#B8941E] text-white py-2.5 xs:py-3 rounded-lg text-sm xs:text-base font-semibold hover:bg-[#9a7a19] transition"
                        >
                          Proceed to Checkout
                        </button>
                      </div>
                    </>
                  )}
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
