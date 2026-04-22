'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logout, getAdminUser } from '@/lib/auth';
import DashboardContent from '@/components/admin/modules/DashboardContent';
import CategoriesContent from '@/components/admin/modules/CategoriesContent';
import ProductsContent from '@/components/admin/modules/ProductsContent';
import OrdersContent from '@/components/admin/modules/OrdersContent';
import CustomersContent from '@/components/admin/modules/CustomersContent';
import SettingsContent from '@/components/admin/modules/SettingsContent';
import UploadsContent from '@/components/admin/modules/UploadsContent';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check authentication
    const authenticated = isAuthenticated();
    setIsAuthChecked(true);
    
    if (!authenticated) {
      router.push('/admin/login');
      return;
    }

    // Get admin user info
    const user = getAdminUser();
    setAdminUser(user);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  // Show nothing while checking auth or not mounted
  if (!mounted || !isAuthChecked) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo/Brand */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            {sidebarOpen ? (
              <h1 className="text-xl font-bold text-amber-500">SGJ Admin</h1>
            ) : (
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-sm">SG</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'dashboard'
                ? 'bg-amber-500 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {sidebarOpen && <span className="font-medium">Dashboard</span>}
          </button>

          <button
            onClick={() => setActiveSection('categories')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'categories'
                ? 'bg-amber-500 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {sidebarOpen && <span className="font-medium">Categories</span>}
          </button>

          <button
            onClick={() => setActiveSection('products')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'products'
                ? 'bg-amber-500 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            {sidebarOpen && <span className="font-medium">Products</span>}
          </button>

          <button
            onClick={() => setActiveSection('orders')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'orders'
                ? 'bg-amber-500 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {sidebarOpen && <span className="font-medium">Orders</span>}
          </button>

          <button
            onClick={() => setActiveSection('customers')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'customers'
                ? 'bg-amber-500 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {sidebarOpen && <span className="font-medium">Customers</span>}
          </button>

          <button
            onClick={() => setActiveSection('uploads')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'uploads'
                ? 'bg-amber-500 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            {sidebarOpen && <span className="font-medium">Uploads</span>}
          </button>

          <button
            onClick={() => setActiveSection('settings')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'settings'
                ? 'bg-amber-500 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {sidebarOpen && <span className="font-medium">Settings</span>}
          </button>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-800">
          <Link 
            href="/"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition ${!sidebarOpen && 'justify-center'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {sidebarOpen && <span className="font-medium">Back to Site</span>}
          </Link>
          
          <button
            onClick={handleLogout}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 transition mt-2 ${!sidebarOpen && 'justify-center'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>

          {sidebarOpen && adminUser && (
            <div className="flex items-center space-x-3 px-4 py-3 mt-2">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {adminUser.email?.[0]?.toUpperCase() || 'A'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">{adminUser.role || 'Admin'}</p>
                <p className="text-xs text-gray-400">{adminUser.email || 'admin@sgj.com'}</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeSection === 'dashboard' && 'Dashboard Overview'}
                  {activeSection === 'categories' && 'Categories Management'}
                  {activeSection === 'products' && 'Products Management'}
                  {activeSection === 'orders' && 'Orders Management'}
                  {activeSection === 'customers' && 'Customers Management'}
                  {activeSection === 'settings' && 'Settings'}
                  {activeSection === 'uploads' && 'Image Uploads'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {activeSection === 'dashboard' && 'Welcome back! Here\'s what\'s happening today.'}
                  {activeSection === 'categories' && 'Manage your product categories'}
                  {activeSection === 'products' && 'Manage your product inventory'}
                  {activeSection === 'orders' && 'View and manage customer orders'}
                  {activeSection === 'customers' && 'Manage customer information'}
                  {activeSection === 'settings' && 'Configure your store settings'}
                  {activeSection === 'uploads' && 'Upload and remove images from R2 storage'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {activeSection === 'dashboard' && <DashboardContent />}
          {activeSection === 'categories' && <CategoriesContent />}
          {activeSection === 'products' && <ProductsContent />}
          {activeSection === 'orders' && <OrdersContent />}
          {activeSection === 'customers' && <CustomersContent />}
          {activeSection === 'settings' && <SettingsContent />}
          {activeSection === 'uploads' && <UploadsContent />}
        </div>
      </main>
    </div>
  );
}
