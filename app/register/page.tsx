'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppDispatch } from '@/store/hooks';
import { login } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customers/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Log response to debug structure
      console.log('Register API response:', JSON.stringify(data, null, 2));

      if (data.data?.token) {
        localStorage.setItem('customer_token', data.data.token);
      }

      // Try all common nesting patterns
      const customer =
        data.data?.customer ??
        data.data?.user ??
        data.customer ??
        data.user ??
        data.data ??
        {};

      dispatch(login({
        id: customer.id || '',
        name: customer.name || formData.name,
        email: customer.email || formData.email,
        phone: customer.phone || customer.phone_number || formData.phone,
      }));

      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 py-6 xs:py-8 sm:py-10 md:py-12 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 xs:p-6 sm:p-8 md:p-12">
            <div className="mb-5 xs:mb-6 sm:mb-8">
              <h1 className="text-2xl xs:text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5 xs:mb-2">Create Account</h1>
              <p className="text-gray-600 text-sm xs:text-base">Fill in your details to get started</p>
            </div>

            {error && (
              <div className="mb-4 xs:mb-5 sm:mb-6 p-3 xs:p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs xs:text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-4.5 sm:space-y-5">
              <div>
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-2.5 xs:left-3 top-1/2 -translate-y-1/2 w-4 h-4 xs:w-5 xs:h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                    className="w-full pl-9 xs:pl-10 pr-3 xs:pr-4 py-2.5 xs:py-3 text-sm xs:text-base border-2 border-gray-200 rounded-lg focus:border-[#B8941E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-2.5 xs:left-3 top-1/2 -translate-y-1/2 w-4 h-4 xs:w-5 xs:h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                    className="w-full pl-9 xs:pl-10 pr-3 xs:pr-4 py-2.5 xs:py-3 text-sm xs:text-base border-2 border-gray-200 rounded-lg focus:border-[#B8941E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-2.5 xs:left-3 top-1/2 -translate-y-1/2 w-4 h-4 xs:w-5 xs:h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+1234567890"
                    className="w-full pl-9 xs:pl-10 pr-3 xs:pr-4 py-2.5 xs:py-3 text-sm xs:text-base border-2 border-gray-200 rounded-lg focus:border-[#B8941E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-2.5 xs:left-3 top-1/2 -translate-y-1/2 w-4 h-4 xs:w-5 xs:h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Create a strong password"
                    className="w-full pl-9 xs:pl-10 pr-10 xs:pr-12 py-2.5 xs:py-3 text-sm xs:text-base border-2 border-gray-200 rounded-lg focus:border-[#B8941E] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 xs:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 xs:w-5 xs:h-5" /> : <Eye className="w-4 h-4 xs:w-5 xs:h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#B8941E] text-white py-2.5 xs:py-3 rounded-lg text-sm xs:text-base font-semibold hover:bg-[#9a7a19] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && (
                  <svg className="animate-spin h-4 w-4 xs:h-5 xs:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                {loading ? 'Creating account...' : 'Create Account'}
              </button>

              <div className="text-center">
                <p className="text-gray-600 text-xs xs:text-sm sm:text-base">
                  Already have an account?{' '}
                  <a href="/login" className="text-[#B8941E] font-semibold hover:underline">
                    Login here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
