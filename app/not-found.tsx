import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoBackButton from '@/components/GoBackButton';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 xs:py-10 sm:py-12 px-4">
        <div className="w-full max-w-2xl mx-auto text-center">
          <h1 className="text-6xl xs:text-7xl sm:text-8xl font-bold text-[#B8941E] mb-3 xs:mb-4">404</h1>
          <h2 className="text-2xl xs:text-2xl sm:text-3xl font-bold text-gray-900 mb-3 xs:mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-6 xs:mb-8 text-base xs:text-lg px-4">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#B8941E] text-white px-6 xs:px-8 py-2.5 xs:py-3 rounded-lg text-sm xs:text-base font-semibold hover:bg-[#9a7a19] transition"
            >
              <Home className="w-4 h-4 xs:w-5 xs:h-5" />
              Go to Homepage
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#B8941E] text-[#B8941E] px-6 xs:px-8 py-2.5 xs:py-3 rounded-lg text-sm xs:text-base font-semibold hover:bg-[#FFF8E7] transition"
            >
              <Search className="w-4 h-4 xs:w-5 xs:h-5" />
              Browse Products
            </Link>
          </div>

          <GoBackButton />
        </div>
      </div>

      <Footer />
    </>
  );
}
